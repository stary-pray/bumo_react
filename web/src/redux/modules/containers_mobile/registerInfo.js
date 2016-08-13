const REG_USERNAME = 'bumo/REG_USERNAME';
const REG_EMAIL = 'bumo/REG_EMAIL';
const REG_PASSWORD = 'bumo/REG_PASSWORD';
const REG_PASSWORD1 = 'bumo/REG_PASSWORD1';

const REG_CAPTCHA = 'bumo/REG_CAPTCHA';

const initialState = {
};

export default function registerInfo(state = initialState, action) {
  switch (action.type) {
    case REG_USERNAME:
      return {...state, username: action.username};
    case REG_EMAIL:
      return {...state, email: action.email};
    case REG_PASSWORD:
      return {...state, password: action.password};
    case REG_PASSWORD1:
      return {...state, password1: action.password1};
    case REG_CAPTCHA:
      return {...state, captcha: action.captcha};
    default:
      return state;

  }

}
export function regUsername(username) {
  return {
    type:REG_USERNAME,
    username
  };
}

export function regEmail(email) {
  return {
    type:REG_EMAIL,
    email
  };
}
export function regPassword(password) {
  return {
    type:REG_PASSWORD,
    password
  };
}
export function regPassword1(password1) {
  return {
    type:REG_PASSWORD1,
    password1
  };
}
export function regCaptcha(captcha) {
  return {
    type:REG_CAPTCHA,
    captcha
  };
}

