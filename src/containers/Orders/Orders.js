import React, {Component} from 'react';
import Order from '../../components/Burger/Orden/Order';
import axios from '../../axios-ordens';
import{connect} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component{

    componentDidMount () {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }
    render() {
        let orders = <Spinner />
        if(!this.props.loading){
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
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId

    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrder(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));