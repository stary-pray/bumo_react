import {getMeta, normalizePainting} from '../normalizer';

const LOAD = 'bumo/paintings/list/load';
export const LOAD_SUCCESS = 'bumo/paintings/list/load_success';
const LOAD_FAIL = 'bumo/paintings/list/load_failed';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case LOAD:
      console.log('LOAD', action);
      return state;
    case LOAD_SUCCESS:
      const meta = getMeta(action.result);
      const normalized = normalizePainting(action.result);
      return {
        ...state,
        _meta: {
          ...state._meta,
          ...meta,
          result: normalized.result
        },
        ...normalized.entities.paintings
      };
    case LOAD_FAIL:
      console.log('LOAD_FAILED', action);
      return state;
    default:
      return state;
  }
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/paintings')
  };
}
