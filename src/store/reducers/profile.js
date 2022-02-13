const initValue = {
  user: {},
  userProfile: {},
};

export const profile = (state = initValue, action) => {
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
    default:
      return state;
  }
};
