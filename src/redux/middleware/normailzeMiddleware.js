import {normalize, Schema, arrayOf} from 'normalizr';

const schemas = {
  painting: new Schema('painting'),
  profile: new Schema('profile'),
  heat: new Schema('heat'),
};

schemas.painting.define({
  profile: schemas.profile,
  heat: schemas.heat,
});

export default function normalizeMiddleware() {
  return (next) => (action) => {
    if (action.type && action.type.match(/SUCCESS$/)) {
      switch (action.normalizeSchema) {
        case 'painting':
          action.normalized = normalize(action.result.results, arrayOf(schemas.painting));
          break;
        case 'paintingDetail':
          // TODO
          break;
        default:
      }
    }
    next(action);
  };
}
