import { login } from "./login";
import { profile } from "./profile";
import { home } from "./home";
import { combineReducers } from "redux";
import { article } from "./article";
const reducer = combineReducers({
  login,
  profile,
  home,
  article,
});
export default reducer;
