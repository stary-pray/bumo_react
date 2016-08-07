
const LOG_COMMENT = 'bumo/LOG_COMMENT';


const initialState = {
};

export default function commentLog(state = initialState, action) {
  switch (action.type) {
    case LOG_COMMENT:
      return {...state, comment: action.comment};
    default:
      return state;

  }

}
export function logComment(comment) {
  return {
    type:LOG_COMMENT,
    comment
  };
}


