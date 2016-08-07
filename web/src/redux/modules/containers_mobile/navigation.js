
const SWITCH_TAB = 'bumo/SWITCH_TAB';
export const SWITCH_TAG_TYPE = 'bumo/SWITCH_TAG_TYPE';
const initialState = {
  tab:'paintingList',
  tagType:'人物'
};

export default function navigation(state = initialState, action) {
  switch (action.type) {
    case SWITCH_TAB:
      return {...state, tab: action.tab};
    case SWITCH_TAG_TYPE:
      return {...state, tagType: action.tagType};
    default:
      return state;

  }

}
export function switchTab(tab) {
  return {
    type:SWITCH_TAB,
    tab
  };
}

export function switchTagType(tagType) {
  return {
    type:SWITCH_TAG_TYPE,
    tagType
  };
}


