import {combineReducers} from "redux";
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
  routing: {},
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
