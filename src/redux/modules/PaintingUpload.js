/**
 * Created by akistar on 16/3/1.
 */
import {handleActions, createAction} from "redux-actions";

export const UPLOAD = 'bumo/painting/UPLOAD';
export const UPLOAD_SUCCESS = 'bumo/painting/UPLOAD_SUCCESS';
export const UPLOAD_FAIL = 'bumo/painting/UPLOAD_FAIL';
export const TOGGLE_EXTRA = 'bumo/painting/TOGGLE_EXTRA';

export const SELECTED_IMAGE = 'bumo/upload_painting/selected_image';
export const REMOVE_SELECTED_IMAGE = 'bumo/upload_painting/remove_selected_image';

export default handleActions({
    [UPLOAD]: (state) => ({}),

    [UPLOAD_SUCCESS]: (state, action) => ({...action.result}),

    [UPLOAD_FAIL]: (state, action) => ({error: action.result}),

    [TOGGLE_EXTRA]: (state, action) => ({
      ...state,
      showExtra: action.payload
    }),
    [SELECTED_IMAGE]: (state, action) =>({
      ...state,
      selectedImage: action.payload
    }),
    [REMOVE_SELECTED_IMAGE]: (state, action) =>({
      ...state,
      selectedImage: null,
    })
  }, {
    showExtra: false,
    selectedImage: null,
  }
);

export const toggleExtra = createAction(TOGGLE_EXTRA);

toggleExtra('xxxxx');

const j = {
  type: TOGGLE_EXTRA,
  payload: 'xxxxx'
}

export function upload(data) {
  return {
    types: [UPLOAD, UPLOAD_SUCCESS, UPLOAD_FAIL],
    promise: (client) => client.post('/api/paintings', {
      data: data
    })
  };
}

export const selectedImage = createAction(SELECTED_IMAGE);
export const removeSelectedImage = createAction(REMOVE_SELECTED_IMAGE);

