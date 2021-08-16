import UserTypes from "./userTypes";

const INITIAL_STATE = {
  currentUser: null,
  resetPassSuccess: false,
  errorUser: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.PROCESSED_LOGIN:
      return {
        ...state,
        currentUser: action.payload,
        errorUser: [],
      };
    case UserTypes.PROCESSED_PASSWORD_RESET:
      return {
        ...state,
        resetPassSuccess: action.payload,
      };
    case UserTypes.USER_ERROR:
      return {
        ...state,
        errorUser: action.payload,
      };
    case UserTypes.STATE_OF_USER_RESET:
    case UserTypes.PROCESSED_LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default userReducer;
