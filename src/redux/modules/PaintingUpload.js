/**
 * Created by akistar on 16/3/1.
 */
import {handleActions} from 'redux-actions';

export const UPLOAD = 'bumo/painting/UPLOAD';
export const UPLOAD_SUCCESS = 'bumo/painting/UPLOAD_SUCCESS';
export const UPLOAD_FAIL = 'bumo/painting/UPLOAD_FAIL';


export default handleActions({
  [UPLOAD]: (state) => ({}),
  [UPLOAD_SUCCESS]: (state, action) => ({...action.result}
),
  [UPLOAD_FAIL]: (state, action) => ({
    error:action.result
  })
}, {});

export function upload(data){
  return {
    types: [UPLOAD, UPLOAD_SUCCESS, UPLOAD_FAIL],
    promise: (client) => client.post('/api/paintings', {
      data: data
    })
  };
}

