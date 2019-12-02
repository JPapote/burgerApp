import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-ordens';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {

    state = {
        ordenForm: {
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
        },
        formIsValid: false,
    }

    handlerPedido = (event) => {
        event.preventDefault();
        this.setState({loading: true});
       const dataOrder = {}
        for(let formOrder in this.state.ordenForm){
            dataOrder[formOrder]=this.state.ordenForm[formOrder].value;
        }


        const order = {
            ingredient: this.props.ing,
            price: this.props.price,
            orderData : dataOrder,
            userId: this.props.userId
        };

        this.props.onOrdenBurger(order, this.props.token);
                  
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

    onHandlerChanged = (event, formElmentId) => {
        const updateOrdenForm = {
            ...this.state.ordenForm
        };
        const updateFormElement = {
            ...updateOrdenForm[formElmentId]
        };
        updateFormElement.value = event.target.value;
        updateFormElement.valid=this.validationForm(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touche=true;
        updateOrdenForm[formElmentId] = updateFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updateOrdenForm){
            formIsValid=updateOrdenForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ordenForm: updateOrdenForm, formIsValid:formIsValid});
    }
    render() {

        const formElementArray = [];

        for(let key in this.state.ordenForm){
            formElementArray.push({
                id : key,
            config : this.state.ordenForm[key],
            });
            
        }

        let formu = (
        <form onSubmit={this.handlerPedido}>
            {formElementArray.map(formElement => (
                <Input 
                       key={formElement.id}
                       elementType={formElement.config.elementType}
                       elementConfig={formElement.config.elementConfig}
                       value={formElement.config.value}
                       valid = {!formElement.config.valid}
                       touche={formElement.config.touche}
                       change={(event) => this.onHandlerChanged(event, formElement.id)}
                       />
        ))}   
            <Button btnType='Success' disabled={!this.state.formIsValid}>New Orden</Button>
        </form>
        
        );
        if (this.props.loading) {
            formu = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {formu}
                
            </div>
        );
    }
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