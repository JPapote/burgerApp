import React, {Component} from 'react';
import CheckoutSummary from '../../components/Burger/Orden/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import ContactData from './ContactData/ContactData';
//import * as action from '../../store/actions/index';
class Checkout extends Component {

  

    handlerCancelCheckout = () => {
        this.props.history.goBack();
    }

    handlerContinueCheckout = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    


render(){

    let summary = <Redirect to='/'/>;

    if(this.props.ing){
        const purchaseRedirect = this.props.purchasing ? <Redirect to = '/' /> : null; 
        summary = (
            <div>
                {purchaseRedirect}
            <CheckoutSummary ingredients = {this.props.ing} 
            handlerCancel={this.handlerCancelCheckout}
            handlerContinue={this.handlerContinueCheckout} />

            <Route path={this.props.match.path + '/contact-data'}
            component={ContactData}/>
            </div>
            );
    }
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