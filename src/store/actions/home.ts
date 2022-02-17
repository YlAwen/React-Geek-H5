import request from "utils/request";
import { Dispatch } from "redux";

const saveChannels = (
  payload: {
    id: number;
    name: string;
  }[]
) => {
  return {
    type: "home/get_channels",
    payload,
  };
};
// 获取所有频道列表
export const getChannels = () => {
  return async (dispatch: Dispatch) => {
    const res = await request({
      method: "get",
      url: "/channels",
    });
    dispatch(saveChannels(res.data.channels));
  };
};

// 获取文章列表数据
const saveArticleList = (payload: {
  id: number;
  timestamp: string;
  loadMore: boolean;
  list: [];
}) => {
  return {
    type: "home/save_article_list",
    payload,
  };
};

// 获取文章列表数据
export const getArticleList = ({
  id,
  timestamp,
  loadMore = false,
}: {
  id: number;
  timestamp: string;
  loadMore?: boolean;
}) => {
  return async (dispatch: Dispatch) => {
    const res = await request({
      method: "get",
      url: "/articles",
      params: {
        channel_id: id,
        timestamp: timestamp,
      },
    });
    // console.log(res);

    // 刷新
    dispatch(
      saveArticleList({
        timestamp: res.data.pre_timestamp,
        id,
        list: res.data.results,
        loadMore,
      })
    );
  };
};
