import {normalize, Schema, arrayOf} from 'normalizr';

const schemas = {
  painting: new Schema('painting'),
  paintingDetail: new Schema('paintingDetail'),
  profile: new Schema('profile'),
  paintingHeat: new Schema('paintingHeat'),
  likes: new Schema('likes'),
  tags: new Schema('tags'),
  tagHeat: new Schema('tagHeat'),
  tagDetail: new Schema('tagDetail')
};

schemas.painting.define({
  profile: schemas.profile,
  heat: schemas.paintingHeat
});

schemas.paintingDetail.define({
  profile: schemas.profile,
  heat: schemas.paintingHeat,
  tags: arrayOf(schemas.tags),
  likes: arrayOf(schemas.likes)
});

schemas.tags.define({
  paintings: arrayOf(schemas.painting),
  heat: schemas.tagHeat
});

schemas.tagDetail.define({
  paintings: arrayOf(schemas.painting),
  heat: schemas.tagHeat
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
        case 'tags':
          action.normalized = normalize(action.result.results, arrayOf(schemas.tags));
          break;
        case 'profile':
          action.normalized = normalize(action.result.results, arrayOf(schemas.profile));
          break;
        case 'tagDetail':
          action.normalized = normalize(action.result, schemas.tagDetail);
          break;
        default:
      }
    }
    next(action);
  };
}
