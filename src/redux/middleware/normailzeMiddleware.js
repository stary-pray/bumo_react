import {normalize, Schema, arrayOf} from 'normalizr';

const schemas = {
  painting: new Schema('painting'),
  paintingDetail: new Schema('paintingDetail'),
  profile: new Schema('profile'),
  heat: new Schema('heat'),
};

schemas.painting.define({
  profile: schemas.profile,
  heat: schemas.heat,
});

schemas.paintingDetail.define({
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
          action.normalized = normalize(action.result, schemas.paintingDetail);
          break;
        default:
      }
    }
    next(action);
  };
}
