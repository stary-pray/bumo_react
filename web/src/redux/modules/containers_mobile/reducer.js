import {combineReducers} from "redux";
import Home from "./Home";
import navigation from "./navigation";
import loginInfo from "./loginInfo";
import registerInfo from "./registerInfo";
import paintingDetail from "./paintingDetail";
import tagType from "./tagType";
import tagPaintingDetail from "./tagPaintingDetail";
import userPainting from "./userPainting";
import comments from "./comments";
import commentLog from "./commentLog";
import user from "./user";
import orderPainting from "./orderPainting";
import tagTypePainting from "./tagTypePainting";
import meUpdate from "./meUpdate";
import meUpdateInfo from "./meUpdateInfo";
import searchInfo from "./searchInfo";
import searchResult from "./searchResult";
import cameraImage from "./cameraImage";
export default combineReducers({
  Home,
  navigation,
  loginInfo,
  paintingDetail,
  tagType,
  tagPaintingDetail,
  userPainting,
  comments,
  commentLog,
  user,
  orderPainting,
  tagTypePainting,
  registerInfo,
  meUpdate,
  meUpdateInfo,
  searchInfo,
  searchResult,
  cameraImage
});
