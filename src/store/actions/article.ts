import { Dispatch } from "redux";
import request from "utils/request";
import { Detail } from "store/reducers/article";

// 获取新闻详情
const saveDetail = (payload: Detail) => {
  return {
    type: "article/save_detail",
    payload,
  };
};
// 获取新闻详情
export const getArticleDetail = (id: string) => {
  return async (dispatch: Dispatch) => {
    const res = await request({
      method: "get",
      url: "/articles/" + id,
    });
    // console.log(res);
    dispatch(saveDetail(res.data));
  };
};
// 关注/取关用户
const follow = (payload: boolean) => {
  return {
    type: "article/follow",
    payload,
  };
};
// 关注用户
export const getFollow = (id: string) => {
  return async (dispatch: Dispatch) => {
    const res = await request({
      method: "post",
      url: "/user/followings",
      data: {
        target: id,
      },
    });
    // console.log(res);
    dispatch(follow(true));
  };
};
// 取关用户
export const delFollow = (id: string) => {
  return async (dispatch: Dispatch) => {
    const res = await request({
      method: "delete",
      url: "/user/followings/" + id,
    });
    // console.log(res);
    dispatch(follow(false));
  };
};
