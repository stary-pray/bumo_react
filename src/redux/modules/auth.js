import {handleActions} from 'redux-actions';

import * as meAction from './me';

export const INITIAL_APP = 'bumo/auth/INITIAL_APP';
export const INITIAL_AUTH = 'bumo/auth/INITIAL_AUTH';


export const REGISTER = 'bumo/auth/REGISTER';
export const REGISTER_SUCCESS = 'bumo/auth/REGISTER_SUCCESS';
export const REGISTER_FAIL = 'bumo/auth/REGISTER_FAIL';

export const LOGIN = 'bumo/auth/LOGIN';
export const LOGIN_SUCCESS = 'bumo/auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'bumo/auth/LOGIN_FAIL';

export const LOGOUT = 'bumo/auth/LOGOUT';
export const LOGOUT_SUCCESS = 'bumo/auth/LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'bumo/auth/LOGOUT_FAIL';

export const GET_CAPTCHA = 'bumo/auth/GET_CAPTCHA';
export const GET_CAPTCHA_SUCCESS = 'bumo/auth/GET_CAPTCHA_SUCCESS';
export const GET_CAPTCHA_FAIL = 'bumo/auth/GET_CAPTCHA_FAIL';

export const REFRESH_CAPTCHA = 'bumo/auth/REFRESH_CAPTCHA';
export const REFRESH_CAPTCHA_SUCCESS = 'bumo/auth/REFRESH_CAPTCHA_SUCCESS';
export const REFRESH_CAPTCHA_FAIL = 'bumo/auth/REFRESH_CAPTCHA_FAIL';

const initialState = {
  loaded: false
};

export default handleActions({
  [meAction.LOAD_SUCCESS]: (state) => ({
    ...state,
    loaded: true
  }),
  [meAction.LOAD_FAIL]: (state) => ({
    ...state,
    loaded: false
  }),
  [REGISTER]: (state) => ({
    ...state,
    registeringIn: true
  }),
  [REGISTER_SUCCESS]: (state, action) => ({
    loaded: true,
    registeringIn: false,
    token: action.result.token
  }),
  [REGISTER_FAIL]: (state, action) => ({
    ...state,
    registeringIn: false,
    token: null,
    registerError: action.error
  }),
  [LOGIN]: (state) => ({
    ...state,
    loggingIn: true
  }),
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    loggingIn: false,
    token: action.result.token
  }),
  [LOGIN_FAIL]: (state, action) => ({
    ...state,
    loggingIn: false,
    token: null,
    loginError: action.error
  }),
  [LOGOUT]: (state) => ({
    ...state,
  }),
  [LOGOUT_SUCCESS]: (state) => ({
    ...state,
    token: null,
    loaded: false
  }),
  [LOGOUT_FAIL]: (state, action) => ({
    ...state,
    logoutError: action.error
  }),
  // get captcha
  [GET_CAPTCHA_SUCCESS]: (state, action) => ({
    captcha: action.result.key
  }),

  [REFRESH_CAPTCHA_SUCCESS]: (state, action) => ({
    captcha: action.result.key
  }),
}, initialState);

export function initialApp(){
  return {
    type: INITIAL_APP
  };
}

export function initialAuth(){
  return{
    type: INITIAL_AUTH
  };
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function login(email, password, captchaHash, captchaAnswer) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/api/auth/login/', {
      data: {
        email,
        password,
        captchaHash,
        captchaAnswer
      }
    })
  };
}

export function register(email, username, password, captchaHash, captchaAnswer) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: (client) => client.post('/api/auth/registration/', {
      data: {
        email,
        username,
        password,
        captchaHash,
        captchaAnswer
      }
    })
  };
}


export function logout() {
  return {type: LOGOUT};
}

export function getCaptcha() {
  return {
    types: [GET_CAPTCHA, GET_CAPTCHA_SUCCESS, GET_CAPTCHA_FAIL],
    promise: (client) => client.get('/api/auth/captcha/get')
  };
}

export function refreshCaptcha() {
  return {
    types: [REFRESH_CAPTCHA, REFRESH_CAPTCHA_SUCCESS, REFRESH_CAPTCHA_FAIL],
    promise: (client) => client.get('/api/auth/captcha/refresh/')
  };
}
