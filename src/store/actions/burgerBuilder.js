import * as actionTypes from './actionsTypes';

import axios from '../../axios-ordens';

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
    return dispatch => {
        axios.get('https://burger-my-app-7a9ed.firebaseio.com/ingredient.json')
            .then(response => {
                dispatch(setIngredient(response.data));
                console.log("del init");
                console.log(response.data);
            })
            .catch(error => {
                dispatch(fetch_ingredients_failed());
                // console.log(this.state.error);
            });
            
    };
};
