import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../utily';
const initialState = {
    ingredients: null,
        totalPrice: 4,
        error: false
};

const INGREDIENT_PRICES = {
    salad: 10.5,
    bacon: 6.23,
    cheese: 3.73,
    meat: 5.89
};

const addIngredient = (state, action) => {
    const newIngredient ={ [action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updateIngredient = updateObject(state.ingredients, newIngredient);
    const updateState = {
        ingredients:updateIngredient,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
return updateObject(state, updateState);
};

const removeIngredient = (state, action) => {
    const newIngredi ={ [action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updateIngredi = updateObject(state.ingredients, newIngredi);
    const dateState = {
        ingredients:updateIngredi,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    };
return updateObject(state, dateState);
};

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
            salad: action.ingredients.salad
        },
        totalPrice: 4,
        error: false
    });
};

const fetchIngredientFailed = (state, action) => {
    return updateObject(state, { error: true});
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
         
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);

        case actionTypes.SET_INGREDIENT: return setIngredient(state, action);
           
            case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientFailed(state, action);
                
        default: return state;
    }
};

export default reducer;