
import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';
export function* burgerBuilderSagas() {
    try{
    const response = yield axios.get('https://burger-my-app-7a9ed.firebaseio.com/ingredient.json')
            yield put (actions.setIngredient(response.data));
            
            // console.log(this.state.error);
    }catch(error){
        yield put (actions.fetch_ingredients_failed());
    }
        
}
