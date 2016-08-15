const LOG_NICKNAME = 'bumo/LOG_NICKNAME';
const LOG_INTRODUCTION = 'bumo/LOG_INTRODUCTION';

const initialState = {
  nickname: '',
  introduction: ''
};

export default function meUpdateInfo(state = initialState, action) {
  switch (action.type) {
    case LOG_NICKNAME:
      return {...state, nickname: action.nickname};
    case LOG_INTRODUCTION:
      return {...state, introduction: action.introduction};
    case INITIAL_FORM:
      return {...state,
        nickname: action.nickname,
        introduction: action.introduction};
    default:
      return state;

  }

}
export function logNickname(nickname) {
  return {
    type: LOG_NICKNAME,
    nickname
  };
}
export function logIntroduction(introduction) {
  return {
    type: LOG_INTRODUCTION,
    introduction
  };
}


export const INITIAL_FORM = 'bumo/INITIAL_FORM';


export function initialForm(nickname, introduction) {
  return {
    type: INITIAL_FORM,
    nickname,
    introduction
  }
}
