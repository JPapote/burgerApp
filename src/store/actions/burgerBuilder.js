import * as actionTypes from './actionsTypes';

export const addIngredient = (name) =>{
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
}; 

export const removeIngredient = (name) =>{
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredient = (ingredients) => {
    return{
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    };
};

export const fetch_ingredients_failed = () => {
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredient = () => {
    return {
        type: actionTypes.INIT_INGREDIENT_SAGA
    }
}
