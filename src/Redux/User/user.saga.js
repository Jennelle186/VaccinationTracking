import { takeLatest, call, all, put } from "redux-saga/effects";
import {
  auth,
  handleUserProfile,
  getCurrentUser,
  GoogleProvider,
} from "../../Firebase/utils";
import UserTypes from "./userTypes";
import {
  signInSuccess,
  signOutSuccess,
  resetPassSuccess,
  errorUser,
} from "./userActions";
import { resetPasswordAPI } from "./userhelp";

export function* snapshotFromUserAuth(user, additionalData = {}) {
  try {
    const userRef = yield call(handleUserProfile, {
      userAuth: user,
      additionalData,
    });
    const snapshot = yield userRef.get();
    yield put(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data(),
      })
    );
  } catch (err) {
    // console.log(err);
    alert(err);
  }
}

export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield snapshotFromUserAuth(user);
  } catch (err) {
    alert(err.message);
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(UserTypes.LOGIN_WITH_EMAIL, emailSignIn);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield snapshotFromUserAuth(userAuth);
  } catch (err) {
    // console.log(err);
    alert(err);
  }
}

export function* userAuthSession() {
  yield takeLatest(UserTypes.AUTHENTICATE_USER, isUserAuthenticated);
}

//for signout
export function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (err) {
    // console.log(err);
    alert(err);
  }
}

export function* onSignOutUserStart() {
  yield takeLatest(UserTypes.LOGOUT_USER, signOutUser);
}

//generator function for signup
export function* signUp({
  payload: { displayName, email, password, confirmPassword },
}) {
  //validation for password and confirmPassword
  if (password !== confirmPassword) {
    const err = ["Password does not match"];
    yield put(errorUser(err));
    return;
  }

  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const additionalData = { displayName };
    yield snapshotFromUserAuth(user, additionalData);

    // await user.sendEmailVerification();
  } catch (err) {
    alert(err);
  }
}

//signup
export function* onSignUpStart() {
  yield takeLatest(UserTypes.USER_REGISTRY, signUp);
}

//generator function to handle this asychronous code for reset password
export function* resetPass({ payload: { email } }) {
  try {
    yield call(resetPasswordAPI, email); //allow us to await the promise to resolve in user.help.js
    yield put(resetPassSuccess());
  } catch (err) {
    yield put(errorUser(err));
  }
}

//reset password
export function* onResetPassStart() {
  yield takeLatest(UserTypes.PASSWORD_RESET, resetPass);
}

//google signIn
export function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(GoogleProvider);
    yield snapshotFromUserAuth(user);
  } catch (err) {
    console.log(err);
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserTypes.LOGIN_WITH_GOOGLE, googleSignIn);
}

export default function* userSaga() {
  yield all([
    call(onEmailSignInStart),
    call(userAuthSession),
    call(onSignOutUserStart),
    call(onSignUpStart),
    call(onResetPassStart),
    call(onGoogleSignInStart),
  ]);
}
