
const LOG_EMAIL = 'bumo/LOG_EMAIL';
const LOG_PASSWORD = 'bumo/LOG_PASSWORD';
const LOG_CAPTCHA = 'bumo/LOG_CAPTCHA';

const initialState = {
};

export default function loginInfo(state = initialState, action) {
  switch (action.type) {
    case LOG_EMAIL:
      return {...state, email: action.email};
    case LOG_PASSWORD:
      return {...state, password: action.password};
    case LOG_CAPTCHA:
      return {...state, captcha: action.captcha};
    default:
      return state;

  }

}
export function logEmail(email) {
  return {
    type:LOG_EMAIL,
    email
  };
}
export function logPassword(password) {
  return {
    type:LOG_PASSWORD,
    password
  };
}
export function logCaptcha(captcha) {
  return {
    type:LOG_CAPTCHA,
    captcha
  };
}

