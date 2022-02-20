export type Detail = {
  art_id: string;
  attitude: number;
  aut_id: string;
  aut_name: string;
  aut_photo: string;
  comm_count: number;
  content: string;
  is_collected: boolean;
  is_followed: boolean;
  like_count: number;
  pubdate: string;
  title: string;
  read_count: number;
};
type ArticleType = {
  detail: Detail;
};
type Action =
  | {
      type: "article/save_detail";
      payload: Detail;
    }
  | {
      type: "article/follow";
      payload: boolean;
    };
const initialState: ArticleType = {
  detail: {},
} as ArticleType;

export const article = (state = initialState, action: Action) => {
  switch (action.type) {
    case "article/save_detail":
      return {
        ...state,
        detail: action.payload,
      };
    case "article/follow":
      return {
        ...state,
        detail: {
          ...state.detail,
          is_followed: action.payload,
        },
      };

    default:
      return state;
  }
};
