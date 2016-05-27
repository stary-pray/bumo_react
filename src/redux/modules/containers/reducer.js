import {combineReducers} from "redux";
import Home from "./Home";
import PaintingDetail from "./PaintingDetail";
import UserPainting from "./UserPainting";
import LikeAction from "./LikeAction";
import Form from "./Form";
import Tags from "./Tags";
import User from "./User";
import TagTypeDetail from "./TagTypeDetail";
import Deposit from "./Deposit";
import CreateCharge from "./CreateCharge";
import MeUpdate from "./MeUpdate";
import MainHeader from "./MainHeader";
import PaintingModal from "./PaintingModal";
import SearchResult from "./SearchResult";
import TamashiPopup from "./TamashiPopup";
import TagPaintingDetail from "./TagPaintingDetail";
import Comments from "./Comments";

export default combineReducers({
  Home,
  PaintingDetail,
  UserPainting,
  LikeAction,
  Form,
  Tags,
  User,
  TagTypeDetail,
  Deposit,
  CreateCharge,
  MeUpdate,
  MainHeader,
  PaintingModal,
  SearchResult,
  TamashiPopup,
  TagPaintingDetail,
  Comments
});
