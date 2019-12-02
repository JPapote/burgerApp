import * as actionsType from '../actions/actionsTypes';
import {updateObject} from '../utily';
const initialState =  {
    token : null,
    userdId : null,
    error : null,
    loading: false,
    authRedirect: "/"
};

const authStart = (state, action) =>{
    return updateObject(state, {error: null, loading: true});
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogaut = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null
    });
};

const setRedirectAuth = (state, action)=>{
    return updateObject(state, {authRedirect : action.path})
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionsType.AUTH_START : return authStart(state, action);
    
        case actionsType.AUTH_SUCCESS: return authSuccess(state, action);
    
        case actionsType.AUTH_FAIL: return authFail(state, action);
        
        case actionsType.AUTH_LOGAUT : return authLogaut(state, action);

        case actionsType.SET_AUTH_REDIRECT_PATH : return setRedirectAuth(state,action);
        default:
            return state;
    }
}

export default reducer;