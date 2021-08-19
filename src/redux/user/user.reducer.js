import userTypes from "./user.types";

const INITIAL_STATE = {
  authPending: true, //--
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SET_CURRENT_USER:
      return {
        ...state,
        authPending: false, //--
        currentUser: action.payload,
      };
    case userTypes.SET_AUTH_PENDING: //--
      return {
        ...state,
        authPending: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
