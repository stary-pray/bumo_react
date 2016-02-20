import { combineReducers } from 'redux';

import Home from './Home';
import PaintingDetail from './PaintingDetail';
import UserPainting from './UserPainting';
import Like from './Like';
export default combineReducers({
  Home,
  PaintingDetail,
  UserPainting,
  Like
});
