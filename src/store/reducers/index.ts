import { login } from "./login";
import { profile } from "./profile";
import { home } from "./home";
import { combineReducers } from "redux";

const reducer = combineReducers({
  login,
  profile,
  home,
});
export default reducer;
