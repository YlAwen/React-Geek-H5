import { getTokenInfo } from "utils/storage";
type Token = {
  token: string;
  refresh_token: string;
};
type Action =
  | {
      type: "login/token";
      payload: Token;
    }
  | {
      type: "profile/user_logout";
      payload: null;
    };
const initValue: Token | {} = getTokenInfo() || {};
export const login = (state = initValue, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "login/token":
      return payload;
    case "profile/user_logout":
      return {};
    default:
      return state;
  }
};
