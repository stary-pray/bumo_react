export const ADD_TAG = 'bumo/ADD_TAG';
export const DELETE_TAG='bumo/DELETE_TAG';


const initialState = [];

export default function addTags(state = initialState, action) {
  switch (action.type) {
    case ADD_TAG:
      return [{
        id: (state.length === 0) ? 0 : state[0].id + 1,
        name: action.name,
        type: action.tagType,
      }, ...state];

    case DELETE_TAG:
      return state.filter(tag =>
        tag.id !== action.id
      );

    case 'bumo/painting/UPLOAD_SUCCESS':
       return initialState;
    default:
      return state;
  }
}
export function addTag(name, tagType) {
  return {
    type: ADD_TAG,
    tagType,
    name
  };
}

export function deleteTag(id) {
  return {
    type: DELETE_TAG,
    id
  };
}




