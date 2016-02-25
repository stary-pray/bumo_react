import { combineReducers } from 'redux';

import Home from './Home';
import PaintingDetail from './PaintingDetail';
import UserPainting from './UserPainting';
import Like from './Like';
import Form from './Form';
export default combineReducers({
  Home,
  PaintingDetail,
  UserPainting,
  Like,
  Form
});
