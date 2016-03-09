import { combineReducers } from 'redux';

import Home from './Home';
import PaintingDetail from './PaintingDetail';
import UserPainting from './UserPainting';
import Like from './Like';
import Form from './Form';
import HotPainting from './HotPainting';
import Tags from './Tags';
import User from './User';
import TagDetail from './TagDetail';

export default combineReducers({
  Home,
  PaintingDetail,
  UserPainting,
  Like,
  Form,
  HotPainting,
  Tags,
  User,
  TagDetail,
});
