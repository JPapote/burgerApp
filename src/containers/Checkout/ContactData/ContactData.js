import React, { useState} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-ordens';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

const ContactData =(props)=>{

    const [ordenForm, setOrdenForm] = useState({
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your name"
                },
                value: '',
                validation: {
                    required: true,
                    
                },
                valid: false,
                touche: false
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Street"
                },
                value: '',
                validation: {
                    required: true,
                    
                },
                valid: false,
                touche: false
                
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "ZipCode"
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 5,
                    minLength: 5,
                    isNumeric: true
                },
                valid: false,
                touche: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Country"
                },
                value: '',
                validation: {
                    required: true,
        
                },
                valid: false,
                touche: false
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: "Your email"
                },
                value: '',
                validation: {
                    required: true,
                   isEmail: true
                },
                valid: false,
                touche: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation:{},
                valid: true
            }
        });

        const [formValid, setFormValid] = useState(false);

    const handlerPedido = (event) => {
        event.preventDefault();
       const dataOrder = {}
        for(let formOrder in ordenForm){
            dataOrder[formOrder]= ordenForm[formOrder].value;
        }


        const order = {
            ingredient: props.ing,
            price: props.price,
            orderData : dataOrder,
            userId: props.userId
        };

        props.onOrdenBurger(order, props.token);
                  
    }

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

    const onHandlerChanged = (event, formElmentId) => {
        const updateOrdenForm = {
            ...ordenForm
        };
        const updateFormElement = {
            ...updateOrdenForm[formElmentId]
        };
        updateFormElement.value = event.target.value;
        updateFormElement.valid=validationForm(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touche=true;
        updateOrdenForm[formElmentId] = updateFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updateOrdenForm){
            formIsValid=updateOrdenForm[inputIdentifier].valid && formIsValid;
        }
        setOrdenForm(updateOrdenForm);
        setFormValid(formIsValid);
    }
    
        const formElementArray = [];

        for(let key in ordenForm){
            formElementArray.push({
                id : key,
            config : ordenForm[key],
            });
            
        }
    

        let formu = (
        <form onSubmit={handlerPedido}>
            {formElementArray.map(formElement => (
                <Input 
                       key={formElement.id}
                       elementType={formElement.config.elementType}
                       elementConfig={formElement.config.elementConfig}
                       value={formElement.config.value}
                       valid = {!formElement.config.valid}
                       touche={formElement.config.touche}
                       change={(event) => onHandlerChanged(event, formElement.id)}
                       />
        ))}   
            <Button btnType='Success' disabled={!formValid}>New Orden</Button>
        </form>
        
        );
            

        if (props.loading) {
            formu = <Spinner />
        }
    
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {formu}
                
            </div>
        );
    
        }

const mapStateToProps = state => {
    return{
        ing: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        onOrdenBurger: (orderData, token) => dispatch (actions.purchaseBurger(orderData, token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(ContactData, axios));