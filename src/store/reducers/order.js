import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../utily';

const initialState = {
    orders : [],
    loading: false,
    purchasing: false
};

const purchaseInit = (state, action) => {
    return updateObject(state, {purchasing: false});
};
const purcheBurgerStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const purchaseBurgerSucces = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId});
        return updateObject(state, {
            loading: false,
            purchasing: true,
            orders: state.orders.concat(newOrder)
        });
        
};

const purchaseBurgerFail = (state, action) => {
    return updateObject(state, {loading: false});
};

const fetchOrderStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const fetchOrderSucces = ( state, action )=> {
    return updateObject(state, {orders:action.orders,
        loading: false
    });
};

const fetchOrderFail = (state, action )=>{
    return updateObject(state, {loading:false});
}
const reducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);

        case actionTypes.PURCHASE_BURGER_START: return purcheBurgerStart(state, action);  

        case actionTypes.PURCHASE_BURGER_SUCCESS : return purchaseBurgerSucces(state, action);
        
        case actionTypes.PURCHASE_BURGER_FAIL : return purchaseBurgerFail(state, action);
        
        case actionTypes.FETCH_ORDER_START: return fetchOrderStart(state, action);
        
        case actionTypes.FETCH_ORDER_SUCCESS: return fetchOrderSucces(state, action);
        
        case actionTypes.FETCH_ORDER_FAIL: return fetchOrderFail(state,action);
        
                
        default: return state;
    }
}

export default reducer