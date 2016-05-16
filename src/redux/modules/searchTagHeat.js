export const SEARCH_TAG_HEAT = 'bumo/painting/SEARCH_TAG_HEAT';
export const SEARCH_TAG_HEAT_SUCCESS = 'bumo/painting/SEARCH_TAG_HEAT_SUCCESS';
export const SEARCH_TAG_HEAT_FAIL = 'bumo/painting/SEARCH_TAG_HEAT_FAIL';


export function searchTagHeat(tagType, tagName) {
  return {
    types: [SEARCH_TAG_HEAT, SEARCH_TAG_HEAT_SUCCESS, SEARCH_TAG_HEAT_FAIL],
    promise: (client) => client.get('/api/painting-tag/hot?type=' + tagType + '&name=' + tagName),
    normalizeSchema: 'tags'
  }
}
