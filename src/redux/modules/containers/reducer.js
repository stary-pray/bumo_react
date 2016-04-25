import {combineReducers} from "redux";
import Home from "./Home";
import PaintingDetail from "./PaintingDetail";
import UserPainting from "./UserPainting";
import Like from "./Like";
import Form from "./Form";
import Tags from "./Tags";
import User from "./User";
import TagDetail from "./TagDetail";
import Deposit from "./Deposit";
import CreateCharge from "./CreateCharge";
import MeUpdate from "./MeUpdate";
import MainHeader from "./MainHeader";
import PaintingModal from "./PaintingModal";
import SearchResult from "./SearchResult";

export default combineReducers({
  Home,
  PaintingDetail,
  UserPainting,
  Like,
  Form,
  Tags,
  User,
  TagDetail,
  Deposit,
  CreateCharge,
  MeUpdate,
  MainHeader,
  PaintingModal,
  SearchResult,
});
