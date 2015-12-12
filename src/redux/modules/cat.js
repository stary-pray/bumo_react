const NEW_CAT = 'cat/new_cat';

const initialState = ['Leader'];

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case NEW_CAT:
      return [...state, action.name];
    default:
      return state;
  }
}

export function newCat(name) {
  return {
    type: NEW_CAT,
    name: name
  };
}
