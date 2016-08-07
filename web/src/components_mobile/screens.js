import {Navigation} from "react-native-navigation";
import Home from "./Home.mobile";
import TagType from "./TagType";
import Login from "./Login";
import PaintingDetail from "./PaintingDetail";
import TagDetail from "./TagDetail";
import TagTypeDetail from "./TagTypeDetail";
import UserPainting from "./UserPainting";
import Me from "./Me";
import Comment from "./Comment";
import Like from "./Like";
import User from "./User";
import PaintingModal from "./PaintingModal";

export function registerScreens(store, Provider){
  Navigation.registerComponent('bumo.Home',()=>Home, store, Provider);
  Navigation.registerComponent('bumo.TagType',()=>TagType, store, Provider);
  Navigation.registerComponent('bumo.Login',()=>Login, store, Provider);
  Navigation.registerComponent('bumo.PaintingDetail', ()=>PaintingDetail, store, Provider);
  Navigation.registerComponent('bumo.TagTypeDetail', ()=>TagTypeDetail, store, Provider);
  Navigation.registerComponent('bumo.UserPainting', ()=>UserPainting, store, Provider);
  Navigation.registerComponent('bumo.TagDetail', ()=>TagDetail, store, Provider);
  Navigation.registerComponent('bumo.Me', ()=>Me, store, Provider);
  Navigation.registerComponent('bumo.Comment',()=>Comment, store, Provider);
  Navigation.registerComponent('bumo.Like',()=>Like, store, Provider);
  Navigation.registerComponent('bumo.User',()=>User, store, Provider);
  Navigation.registerComponent('bumo.PaintingModal',()=>PaintingModal, store, Provider);

}
