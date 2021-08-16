import UserTypes from "./userTypes";
//naming conventions in redux saga
export const emailSignInStart = (userCredentials) => ({
  type: UserTypes.LOGIN_WITH_EMAIL,
  payload: userCredentials,
});

export const signInSuccess = (user) => ({
  type: UserTypes.PROCESSED_LOGIN,
  payload: user,
});

export const userAuthSession = () => ({
  type: UserTypes.AUTHENTICATE_USER,
});

export const signOutUserStart = () => ({
  type: UserTypes.LOGOUT_USER,
});

export const signOutSuccess = () => ({
  type: UserTypes.PROCESSED_LOGOUT,
});

export const signUpStart = (userCredentials) => ({
  type: UserTypes.USER_REGISTRY,
  payload: userCredentials,
});

export const errorUser = (err) => ({
  type: UserTypes.USER_ERROR,
  payload: err,
});

export const resetPassStart = (userCredentials) => ({
  type: UserTypes.PASSWORD_RESET,
  payload: userCredentials,
});

export const resetPassSuccess = () => ({
  type: UserTypes.PROCESSED_PASSWORD_RESET,
  payload: true,
});

export const resetStateUser = () => ({
  type: UserTypes.STATE_OF_USER_RESET,
});

export const googleSignInStart = () => ({
  type: UserTypes.LOGIN_WITH_GOOGLE,
});
