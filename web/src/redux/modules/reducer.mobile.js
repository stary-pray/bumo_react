import {combineReducers} from "redux";
import auth from "./auth";
import me from "./me";
import models from "./models/reducer";
import containers from "./containers_mobile/reducer";

export default combineReducers({
  containers,
  models,
  auth,
  me,
});
