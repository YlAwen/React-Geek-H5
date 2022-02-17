type Channel = {
  id: number;
  name: string;
};
export type ArticleList = {
  art_id: string;
  title: string;
  aut_id: string;
  comm_count: number;
  pubdate: string;
  aut_name: string;
  is_top: number;
  cover: {
    type: number | string;
    images: string[];
  };
};
type Articles = {
  [index: string]: {
    timestamp: string;
    list: ArticleList[];
  };
};
type HomeType = {
  channels: Channel[];
  articles: Articles;
};
type Action =
  | {
      type: "home/get_channels";
      payload: Channel[];
    }
  | {
      type: "home/save_article_list";
      payload: {
        id: string;
        timestamp: string;
        loadMore?: boolean;
        list: ArticleList[];
      };
    };
const initValue: HomeType = {
  channels: [],
  articles: {},
};
export const home = (state = initValue, action: Action) => {
  switch (action.type) {
    case "home/get_channels":
      return {
        ...state,
        channels: action.payload,
      };
    case "home/save_article_list":
      const { id, timestamp, loadMore, list } = action.payload;
      return {
        ...state,
        articles: {
          ...state.articles,
          [id]: {
            timestamp: timestamp,
            list: loadMore ? [...state.articles[id].list, ...list] : list,
          },
        },
      };

    default:
      return state;
  }
};
