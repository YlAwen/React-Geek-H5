import request from "utils/request";
import { Dispatch } from "redux";
import { User, UserProfile } from "../reducers/profile";

// 保存用户自己信息
const saveUser = (payload: User) => {
  return {
    type: "profile/user",
    payload,
  };
};

// 获取用户自己信息
export const getUser = () => {
  return async (dispatch: Dispatch) => {
    const res = await request({
      method: "get",
      url: "/user",
    });
    // console.log(res);
    dispatch(saveUser(res.data));
  };
};

// 保存用户个人资料
const savaUserProfile = (payload: UserProfile) => {
  return {
    type: "profile/user_profile",
    payload,
  };
};

// 获取用户个人资料
export const getUserProfile = () => {
  return async (dispatch: Dispatch) => {
    const res = await request({
      method: "get",
      url: "/user/profile",
    });
    // console.log(res);
    dispatch(savaUserProfile(res.data));
  };
};
type PartialUserProfile = Partial<UserProfile>;
// 编辑用户个人资料;
export const updateUser = (data: PartialUserProfile) => {
  return async (dispatch: Dispatch) => {
    await request({
      method: "patch",
      url: "/user/profile",
      data,
    });
    // console.log(res);
  };
};

// 编辑用户照片资料（头像、身份证照片）

const updatePhoto = (payload: any) => {
  return {
    type: "profile/edit_photo",
    payload,
  };
};

// 编辑用户照片资料（头像、身份证照片）
export const updateUserPhoto = (data: FormData) => {
  return async (dispatch: Dispatch) => {
    const res = await request({
      method: "patch",
      url: "/user/photo",
      data,
    });
    // console.log(res.data.photo);
    dispatch(updatePhoto(res.data.photo));
  };
};

// 退出登录
export const removeAll = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: "profile/remove_all",
    });
  };
};
