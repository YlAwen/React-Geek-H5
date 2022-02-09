import { getTokenInfo } from "utils/storage";

const initValue = getTokenInfo() || {};
export const login = (state = initValue, action) => {
  const { type, payload } = action;
  switch (type) {
    case "login/token":
      return payload;
    default:
      return state;
  }
};
