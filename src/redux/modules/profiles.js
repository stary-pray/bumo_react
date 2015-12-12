import {normalizePainting} from '../normalizer';
import {LOAD_SUCCESS as LOAD_PAINTING_SUCCESS} from './paintings';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case LOAD_PAINTING_SUCCESS:
      const normalized = normalizePainting(action.result);
      return {
        ...state,
        ...normalized.entities.profiles
      };
    default:
      return state;
  }
}
