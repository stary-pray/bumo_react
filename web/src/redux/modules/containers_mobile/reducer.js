import {combineReducers} from "redux";
import Home from "./Home";
import navigation from "./navigation";
import loginInfo from "./loginInfo";
import registerInfo from "./registerInfo";
import paintingDetail from "./paintingDetail";
import tagType from "./tagType";
import tagPaintingDetail from "./tagPaintingDetail";
import backButton from "./backButton";
import userPainting from "./userPainting";
import comments from "./comments";
import commentLog from "./commentLog";
import user from "./user";
import orderPainting from "./orderPainting";
import tagTypePainting from "./tagTypePainting";
import meUpdate from "./meUpdate";
import meUpdateInfo from "./meUpdateInfo";
export default combineReducers({
  Home,
  navigation,
  loginInfo,
  paintingDetail,
  tagType,
  tagPaintingDetail,
  backButton,
  userPainting,
  comments,
  commentLog,
  user,
  orderPainting,
  tagTypePainting,
  registerInfo,
  meUpdate,
  meUpdateInfo
});
