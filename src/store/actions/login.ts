import request from "utils/request";
import { setTokenInfo, removeTokenInfo } from "utils/storage";
import { Dispatch } from "redux";
type Token = {
  token: string;
  refresh_token: string;
};
export const saveToken = (payload: Token) => {
  return {
    type: "login/token",
    payload,
  };
};

// 发送短信验证码
export const sendCode = (mobile: string) => {
  return async () => {
    await request({
      url: `/sms/codes/${mobile}`,
      method: "get",
    });
    // console.log(res);
  };
};

// 用户认证（登录注册）
export const login = (data: { mobile: string; code: string }) => {
  return async (dispatch: Dispatch) => {
    const res = await request({
      method: "post",
      url: "/authorizations",
      data,
    });
    // console.log(res);
    dispatch(saveToken(res.data));
    // token保存至本地
    setTokenInfo(res.data);
  };
};

// 退出登录
export const logout = () => {
  return (dispatch: Dispatch) => {
    removeTokenInfo();
    dispatch({
      type: "login/logout",
    });
  };
};
