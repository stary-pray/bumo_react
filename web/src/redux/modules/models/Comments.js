export const LOAD_PAINTING_COMMENTS = 'bumo/painting/LOAD_PAINTING_COMMENTS';
export const LOAD_PAINTING_COMMENTS_SUCCESS = 'bumo/painting/LOAD_PAINTING_COMMENTS_SUCCESS';
export const LOAD_PAINTING_COMMENTS_FAIL = 'bumo/painting/LOAD_PAINTING_COMMENTS_FAIL';

export const ADD_PAINTING_COMMENTS = 'bumo/painting/ADD_PAINTING_COMMENTS';
export const ADD_PAINTING_COMMENTS_SUCCESS = 'bumo/painting/ADD_PAINTING_COMMENTS_SUCCESS';
export const ADD_PAINTING_COMMENTS_FAIL = 'bumo/painting/ADD_PAINTING_COMMENTS_FAIL';

export const DELETE_PAINTING_COMMENTS = 'bumo/painting/DELETE_PAINTING_COMMENTS';
export const DELETE_PAINTING_COMMENTS_SUCCESS = 'bumo/painting/DELETE_PAINTING_COMMENTS_SUCCESS';
export const DELETE_PAINTING_COMMENTS_FAIL = 'bumo/painting/DELETE_PAINTING_COMMENTS_FAIL';

export function loadComments(paintingId,index) {
  return {
    types: [LOAD_PAINTING_COMMENTS, LOAD_PAINTING_COMMENTS_SUCCESS,LOAD_PAINTING_COMMENTS_FAIL],
    promise: (client) => client.get('/api/painting-comment?page='+index+'&painting_id='+paintingId),
    normalizeSchema: 'comments'
  };
}

export function addComments(paintingId, text) {
  return {
    types: [ADD_PAINTING_COMMENTS, ADD_PAINTING_COMMENTS_SUCCESS,ADD_PAINTING_COMMENTS_FAIL],
    promise: (client) => client.post('/api/paintings/'+paintingId+'/create_comment',{data:{text}
    }),
    normalizeSchema: 'comment'
  };
}

export function deleteComments(paintingId, id) {
  console.log(id);
  return {
    types: [DELETE_PAINTING_COMMENTS, DELETE_PAINTING_COMMENTS_SUCCESS,DELETE_PAINTING_COMMENTS_FAIL],
    promise: (client) => client.del('/api/paintings/'+paintingId+'/delete_comment',{data:{id}}),
  };
}
