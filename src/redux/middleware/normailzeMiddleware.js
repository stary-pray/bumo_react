import {normalize, Schema, arrayOf} from "normalizr";

const schemas = {
  painting: new Schema('painting'),
  paintingDetail: new Schema('paintingDetail'),
  profile: new Schema('profile'),
  profileDetail: new Schema('profileDetail'),
  paintingHeat: new Schema('paintingHeat'),
  profileHeat: new Schema('profileHeat'),
  likes: new Schema('likes'),
  tags: new Schema('tags'),
  tagHeat: new Schema('tagHeat'),
  tagDetail: new Schema('tagDetail'),
  bumoStar: new Schema('bumoStar'),
  deposit: new Schema('deposit'),
  contributedUsers: new Schema('contributedUsers'),
  comments: new Schema('comments'),
  painterContribute: new Schema('painterContribute')

};

schemas.painting.define({
  profile: schemas.profile,
  heat: schemas.paintingHeat
});

schemas.profileDetail.define({
  heat: schemas.profileHeat,
});
schemas.profile.define({
  heat: schemas.profileHeat
});

schemas.paintingDetail.define({
  profile: schemas.profile,
  heat: schemas.paintingHeat,
  tags: arrayOf(schemas.tags),
  contributed_users: arrayOf(schemas.contributedUsers)
});

schemas.tags.define({
  paintings: arrayOf(schemas.painting),
  heat: schemas.tagHeat
});

schemas.tagDetail.define({
  paintings: arrayOf(schemas.painting),
  heat: schemas.tagHeat
});

schemas.contributedUsers.define({
  profile: schemas.profile,
});

schemas.comments.define({
  profile: schemas.profile,
});

schemas.painterContribute.define({
  profile: schemas.profile,
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
        case 'profileDetail':
          action.normalized = normalize(action.result, schemas.profileDetail);
          break;
        case 'tagDetail':
          action.normalized = normalize(action.result, schemas.tagDetail);
          break;
        case 'deposit':
          action.normalized = normalize(action.result.results, arrayOf(schemas.deposit));
          break;
        case 'comments':
          action.normalized = normalize(action.result.results, arrayOf(schemas.comments));
          break;
        case 'comment':
          action.normalized = normalize(action.result, schemas.comments);
          break;
        case 'painterContribute':
          action.normalized = normalize(action.result.results, arrayOf(schemas.painterContribute));
          break;
        default:
      }
    }
    next(action);
  };
}
