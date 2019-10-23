import React, {Component} from 'react';
import Order from '../../components/Burger/Orden/Order';
import axios from '../../axios-ordens';
import{connect} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component{

    componentDidMount () {
        this.props.onFetchOrders();
    }
    render() {
        let orders = <Spinner />
        if(!this.props.loading){
            console.log("Orders");
            console.log(this.props.orders);
           orders =  this.props.orders.map(res => (
            <Order key={res.id}
        ingredient={res.ingredient}
        price={res.price}/>
       ))}
           
        return orders;    
    }
}

const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        loading: state.order.loading

    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrder())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));