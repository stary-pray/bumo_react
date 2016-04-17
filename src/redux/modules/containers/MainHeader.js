import {handleActions, createAction} from 'redux-actions';

export const SEARCH_FOCUS = 'bumo/main_header/search_focus';
export const SEARCH_BLUR = 'bumo/main_header/search_blur';
export const SEARCH_INPUT = 'bumo/main_header/search_input';

const initialState = {
  focus: false,
  inputText: '',
};

export default handleActions({
    [SEARCH_FOCUS]: (state) => ({
      ...state,
      focus: true,
    }),
    [SEARCH_BLUR]: (state) => ({
      ...state,
      focus: false,
      inputText: '',
    }),
    [SEARCH_INPUT]: (state, action) => ({
      ...state,
      focus: true,
      inputText: action.payload,
    }),
  }
, initialState)

export const searchFocus = createAction(SEARCH_FOCUS);
export const searchBlur = createAction(SEARCH_BLUR);
export const searchInput = createAction(SEARCH_INPUT);
