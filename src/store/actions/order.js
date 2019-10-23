import  * as actionType from './actionsTypes';
import axios from '../../axios-ordens';

export const purchaseBurgerSucces = (id, orderData) =>{
    return{
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData:orderData
    };

};

export const purchaseBurgerFail = (error) =>{
    return{
        type: actionType.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return{
        type: actionType.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData) =>{
    return  dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post('orders.json', orderData)
        .then(response => {
            console.log(response.data);
            dispatch(purchaseBurgerSucces(response.data.name, orderData));
        })
        .catch(error => {
           dispatch(purchaseBurgerFail(error));
        });
    };
};

export const purchaseInit = () => {
    return{
        type: actionType.PURCHASE_INIT
    };
};

export const fetchOrderSuccess = (orders) =>{
    return{
        type: actionType.FETCH_ORDER_SUCCESS,
        orders:orders
    };
};

export const fetchOrderFail = (error) =>{
    return{
        type: actionType.FETCH_ORDER_FAIL,
        error: error
    };
};

export const fetchOrderStart = () =>{
    return{
        type: actionType.FETCH_ORDER_START,
    };
};

export const fetchOrder = () => {
    return dispatch => {
        axios.get('orders.json')
        .then(res => {
            dispatch(fetchOrderStart());
            const fetchedOrders = [];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id:key
                });
            }
            dispatch(fetchOrderSuccess( fetchedOrders));
        })
        .catch(error => {
            dispatch(fetchOrderFail(error));
        });
    };
    
};