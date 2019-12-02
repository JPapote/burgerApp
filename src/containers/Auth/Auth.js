import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import {connect} from 'react-redux';
import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as authEvent from '../../store/actions/index';
import {Redirect} from 'react-router-dom';


class Auth extends Component {

    state = {
        controls: {
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
            }
        },

        isSignup: true

    }

    componentDidMount(){
        if(this.props.builderBurger && this.props.authRedirect !== "/"){
            this.props.onAuthSetRedirect();
        }
    }

    validationForm = (value, rule) => {
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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.validationForm(event.target.value, this.state.controls[controlName].validation),
                touche: true
            }
        };

        this.setState({controls: updatedControls});
    }

    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuthHandler(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchSignupAuth = () => {
        this.setState(prevState => {
            return{isSignup: !prevState.isSignup};
        });
    }




    render(){
        const formElementArray = [];

        for(let key in this.state.controls){
            formElementArray.push({
                id : key,
            config : this.state.controls[key],
            });
        }
        let form = formElementArray.map(formElement => (
            
            <Input key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            valid = {!formElement.config.valid}
            touche={formElement.config.touche}
            change={(event) => this.inputChangedHandler(event, formElement.id)}
            />
            )
        );

        if(this.props.loading){
            form = <Spinner />;
        }

        let errorMessage = null;

        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if(this.props.autheticated){
            authRedirect = <Redirect to ={this.props.authRedirect}/>
        }

        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button clicked={this.switchSignupAuth} 
                btnType = 'Success'>SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUN'}</Button>
            </div>
        );
    }
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