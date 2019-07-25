import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-ordens';

class ContactData extends Component{

    state = {
        name: '',
        email: '',
        adreess: {
            street: '',
           postalCode: '' 
        },
        loading: false
    }

    handlerPedido = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const orden = {
            ingredient: this.props.ingredients,
            price: this.state.price,
            customer: {
                name: 'Javier Baez',
                address: {
                    street: 'Alemanes del Volga 80',
                    zipCode: '41351',
                    country: 'Argentina'
                },
                email: 'javier.bb@live.com'
            },
            deliveryMethod: 'fasttest'
        };

        axios.post('/ordens.json', orden)
            .then(response => this.setState({ loading: false, purchasing: false }))
            .catch(error => this.setState({ loading: false, purchasing: false }));
    }
    render() {
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                <form>
                    <input className={classes.Input} type='text' name='name' placeholder='Your Name'/>
                    <input className={classes.Input} type='email' name='email' placeholder='Your Email'/>
                    <input className={classes.Input} type='text' name='street' placeholder='Your Street'/>
                    <input className={classes.Input} type='text' name='postalCode' placeholder='Your PostalCode'/>
                </form>
                <Button btnType='Success'>New Orden</Button>
            </div>
        );
    }
}

export default ContactData;