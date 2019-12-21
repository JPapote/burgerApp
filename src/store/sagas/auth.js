
import {delay} from 'redux-saga/effects';
import {put, call} from 'redux-saga/effects';
import axios from '../../axios-ordens';
// import * as actionsType from '../actions/actionsTypes';
import * as actions from '../actions/index';
export function* logoutSaga (action) {
    yield call([localStorage, "removeItem"], "token");
    yield call([localStorage, "removeItem"], "expirationTime");
    yield call([localStorage, "removeItem"], "userId");

    yield put(actions.logoutSucces());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout())
}

export function* authSagaUser (action) {
   yield put(actions.authStart());
        const authData = {
            email: action.email,
            password: action.password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDiDEAGeOegeE-GIN-p1xlRSG5UuPFulpo';
        
        if(!action.isSignup){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDiDEAGeOegeE-GIN-p1xlRSG5UuPFulpo';
        }
        
 try{   
 const response = yield axios.post(url,authData);
 
const expirationDate = yield Date(new Date().getTime + response.data.expiresIn * 1000);
yield window.localStorage.setItem('token', response.data.idToken);
yield window.localStorage.setItem('expirationTime', expirationDate)
yield window.localStorage.setItem('userId', response.data.localId);
yield put (actions.authSuccess(response.data.idToken, response.data.localId));
yield put(actions.checkAuthTimeout(response.data.expiresIn));
        //console.log(err.response.data.error);
}catch(error){
    console.log(error)
    yield put(actions.authFail(error));
}
};

export function* authCheckStateSaga() {
        const token = yield localStorage.getItem('token');
        if(!token){
            yield put (actions.logout());
        } else{
            const expirationDate = yield new Date(window.localStorage.getItem('expirationTime'));
           if(expirationDate <= new Date()){
               yield put(actions.logout());
           }else{
               const userId = window.localStorage.getItem('userId');
               yield put (actions.authSuccess(token, userId));
               yield put (actions.checkAuthTimeout(expirationDate.getTime() - new Date().getTime() / 1000));
           }
    }
}

