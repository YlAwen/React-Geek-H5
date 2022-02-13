import request from "utils/request";
import { setTokenInfo, removeTokenInfo } from "utils/storage";

export const saveToken = (payload) => {
  return {
    type: "login/token",
    payload,
  };
};

// 发送短信验证码
export const sendCode = (mobile) => {
  return async () => {
    const res = await request({
      url: `/sms/codes/${mobile}`,
      method: "get",
    });
    // console.log(res);
  };
};

// 用户认证（登录注册）
export const login = (data) => {
  return async (dispatch) => {
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
  return (dispatch) => {
    removeTokenInfo();
    dispatch({
      type: "login/logout",
    });
  };
};
