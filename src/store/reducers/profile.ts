export type User = {
  id: string;
  name: string;
  photo: string;
  art_count: number;
  follow_count: number;
  fans_count: number;
  like_count: number;
};
export type UserProfile = {
  id: string;
  photo: string;
  name: string;
  mobile: string;
  gender: number;
  birthday: string;
  intro?: string;
};
type InitType = {
  user: User;
  userProfile: UserProfile;
};
const initValue: InitType = {
  user: {},
  userProfile: {},
} as InitType;
type Action =
  | {
      type: "profile/user";
      payload: User;
    }
  | {
      type: "profile/user_profile";
      payload: UserProfile;
    }
  | {
      type: "profile/edit_photo";
      payload: string;
    }
  | {
      type: "profile/remove_all";
      payload: null;
    };
export const profile = (state = initValue, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "profile/user":
      return { ...state, user: payload };
    case "profile/user_profile":
      return { ...state, userProfile: payload };
    case "profile/edit_photo":
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          photo: payload,
        },
      };
    case "profile/remove_all":
      return initValue;
    default:
      return state;
  }
};
