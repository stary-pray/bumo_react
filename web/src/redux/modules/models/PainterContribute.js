export const LOAD_PAINTER_CONTRIBUTE = 'bumo/painting/LOAD_PAINTER_CONTRIBUTE';
export const LOAD_PAINTER_CONTRIBUTE_SUCCESS = 'bumo/painting/LOAD_PAINTER_CONTRIBUTE_SUCCESS';
export const LOAD_PAINTER_CONTRIBUTE_FAIL = 'bumo/painting/LOAD_PAINTER_CONTRIBUTE_FAIL';


export function loadPainterContribute(tagType,tagName) {
  return {
    types: [LOAD_PAINTER_CONTRIBUTE, LOAD_PAINTER_CONTRIBUTE_SUCCESS, LOAD_PAINTER_CONTRIBUTE_FAIL],
    promise: (client) => client.get('/api/tag-contribute/tag?type='+tagType+'&name='+tagName),
    normalizeSchema: 'painterContribute'
  };
}
