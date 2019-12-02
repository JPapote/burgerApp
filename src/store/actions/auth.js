import * as actionTypes from './actionsTypes';
import axios from '../../axios-ordens';

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, localId) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: localId
    };
};

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId', )

    return{
        type:actionTypes.AUTH_LOGAUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout());
        },expirationTime * 1000);
    };
};



export const auth = (email, password, isSignup) => {
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDiDEAGeOegeE-GIN-p1xlRSG5UuPFulpo';
        
        if(!isSignup){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDiDEAGeOegeE-GIN-p1xlRSG5UuPFulpo';
        }
        
    
        axios.post(url,authData)
        .then(response => {
        const expirationDate = Date(new Date().getTime + response.data.expiresIn * 1000);
        window.localStorage.setItem('token', response.data.idToken);
        window.localStorage.setItem('expirationTime', expirationDate)
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
    }).catch(err => {
        //console.log(err.response.data.error);
           dispatch(authFail(err.response.data.error))
        });
    };
};

export const setRedirectAuth = (path) =>{
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () =>{
    return dispatch=>{
        const token = window.localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else{
            const expirationDate = new Date(window.localStorage.getItem('expirationTime'));
           if(expirationDate <= new Date()){
               dispatch(logout());
           }else{
               const userId = window.localStorage.getItem('userId');
               dispatch(authSuccess(token, userId));
               dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime() / 1000));
           }
        }
    }
}