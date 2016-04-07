export const LOAD_TAGS = 'bumo/painting/LOAD_TAGS';
export const LOAD_TAGS_SUCCESS = 'bumo/painting/LOAD_TAGS_SUCCESS';
export const LOAD_TAGS_FAIL = 'bumo/painting/LOAD_TAGS_FAIL';
export const LOAD_TAGS_TYPE = 'bumo/painting/LOAD_TAGS_TYPE';
export const LOAD_TAGS_TYPE_SUCCESS = 'bumo/painting/LOAD_TAGS_TYPE_SUCCESS';
export const LOAD_TAGS_TYPE_FAIL = 'bumo/painting/LOAD_TAGS_TYPE_FAIL'

export function loadTags() {
  return {
    types: [LOAD_TAGS, LOAD_TAGS_SUCCESS, LOAD_TAGS_FAIL],
    promise: (client) => client.get('/api/painting-tag/hot'),
    normalizeSchema: 'tags'
  };
}

export function loadTagsType(tagType) {
  return {
    types: [LOAD_TAGS_TYPE, LOAD_TAGS_TYPE_SUCCESS, LOAD_TAGS_TYPE_FAIL],
    promise: (client) => client.get('/api/painting-tag/hot?'+tagType),
    normalizeSchema: 'tags'
  };
}
