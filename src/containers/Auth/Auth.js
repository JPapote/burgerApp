import React, {useState, useEffect} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import {connect} from 'react-redux';
import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as authEvent from '../../store/actions/index';
import {Redirect} from 'react-router-dom';


const Auth = (props) =>{

    const[controls, setControls] = useState({
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: "Email Address"
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touche: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: "Your password"
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                    
                },
                valid: false,
                touche: false
            }});

      const [isSignup, setSignunp]= useState(true);

      const {builderBurger, authRedirect, onAuthSetRedirect} = props;
    useEffect(()=> {
        if(builderBurger && authRedirect !== "/"){
            onAuthSetRedirect();
        }
    },[onAuthSetRedirect, builderBurger, authRedirect])
        

    const validationForm = (value, rule) => {
        let isValid = true;

        if(!rule){
            return true;
        }

        if(rule.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rule.minLength){
            isValid = value.length >= rule.minLength && isValid;
        }

        if(rule.maxLength){
            isValid = value.length <= rule.maxLength && isValid;
        }

        if (rule.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rule.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        

        return isValid;
    }

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]:{
                ...controls[controlName],
                value: event.target.value,
                valid: validationForm(event.target.value, controls[controlName].validation),
                touche: true
            }
        };

        setControls( updatedControls);
    }

    const submitHandler = (event) =>{
        event.preventDefault();
        props.onAuthHandler(controls.email.value, controls.password.value, isSignup);
    }

    const switchSignupAuth = () => {
        setSignunp(!isSignup);
    }

        const formElementArray = [];

        for(let key in controls){
            formElementArray.push({
                id : key,
            config : controls[key],
            });
        }
        let form = formElementArray.map(formElement => (
            
            <Input key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            valid = {!formElement.config.valid}
            touche={formElement.config.touche}
            change={(event) => inputChangedHandler(event, formElement.id)}
            />
            )
        );

        if(props.loading){
            form = <Spinner />;
        }

        let errorMessage = null;

        if(props.error){
            errorMessage = (
                <p>{props.error.message}</p>
            );
        }

        let authRedirects = null;
        if(props.autheticated){
            authRedirects = <Redirect to ={props.authRedirect}/>
        }

        return(
            <div className={classes.Auth}>
                {authRedirects}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button clicked={switchSignupAuth} 
                btnType = 'Success'>SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUN'}</Button>
            </div>
        );
    }

 const mapStateToProps = state =>{
     return{
         loading: state.auth.loading,
         error: state.auth.error,
         autheticated: state.auth.token !== null,
         builderBurger: state.burgerBuilder.builder,
         authRedirect: state.auth.authRedirect
     };
 };
 const mapDispatchToProps = dispatch =>{
     return{
         onAuthHandler: (email, password, isSignup) => dispatch(authEvent.auth(email,password, isSignup)),
         onAuthSetRedirect: ()=>dispatch(authEvent.setRedirectAuth('/'))
     };
 };


export default connect(mapStateToProps, mapDispatchToProps)(Auth);