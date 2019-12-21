import React from 'react';
import CheckoutSummary from '../../components/Burger/Orden/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import ContactData from './ContactData/ContactData';
//import * as action from '../../store/actions/index';
const Checkout = (props) =>{

   const handlerCancelCheckout = () => {
       props.history.goBack();
    }

    const handlerContinueCheckout = () => {
        props.history.replace("/checkout/contact-data");
    }

    let summary = null

    if(props.ing){
        const purchaseRedirect = props.purchasing ? <Redirect to = "/" /> : null; 
        summary = (
            <div>
                {purchaseRedirect}
            <CheckoutSummary ingredients = {props.ing} 
            handlerCancel={handlerCancelCheckout}
            handlerContinue={handlerContinueCheckout} />

            <Route path={props.match.path + "/contact-data"}
            component={ContactData}/>
            </div>
            );
            return summary; 
    }
               
}  

const mapStateToProps = state =>{
    return{
        ing: state.burgerBuilder.ingredients,
        purchasing: state.order.purchasing
    }
};

export default connect(mapStateToProps)(Checkout);