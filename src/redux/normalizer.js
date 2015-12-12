import { normalize, Schema, arrayOf } from 'normalizr';

export function getMeta(res) { // from action.result
  const {count, previous, next} = res;
  return {
    count,
    previous,
    next
  };
}

export function normalizePainting(res) {
  const painting = new Schema('paintings');
  const profile = new Schema('profiles');
  painting.define({profile});
  return normalize(res.results, arrayOf(painting));
}
