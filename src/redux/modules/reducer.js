import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import auth from "./auth";
import {reducer as form} from "redux-form";
import me from "./me";
import notification from "./notification";
import waypoint from "./waypoint";
import models from "./models/reducer";
import containers from "./containers/reducer";
import paintingUpload from "./PaintingUpload";
import tags from "./tags";
import preferences from "./preferences";
import searchTagHeat from "./searchTagHeat";

export default combineReducers({
  routing: routerReducer,
  models,
  containers,
  auth,
  form,
  me,
  waypoint,
  notification,
  paintingUpload,
  preferences,
  tags,
  searchTagHeat
});
