import _ from "lodash";

export const ADD_TAG = 'bumo/ADD_TAG';
export const DELETE_TAG = 'bumo/DELETE_TAG';


const initialState = [];

export default function addTags(state = initialState, action) {
  switch (action.type) {
    case ADD_TAG:
      var oldItem = _.find(state, {
        name: action.name,
        type: action.tagType
      });
      return oldItem ? state : [...state, {
        name: action.name,
        type: action.tagType
      }];

    case DELETE_TAG:
      var newState = state.slice();
      newState.splice(action.index, 1);
      return newState;

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

export function deleteTag(index) {
  return {
    type: DELETE_TAG,
    index
  };
}




