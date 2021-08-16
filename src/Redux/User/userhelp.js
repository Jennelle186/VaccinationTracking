import { auth } from "../../Firebase/utils";

export const resetPasswordAPI = (email) => {
  const config = {
    url: "http://localhost:3000/login",
  };

  return new Promise((resolve, reject) => {
    //send password
    auth
      .sendPasswordResetEmail(email, config)
      //resolve
      .then(() => {
        resolve();
      })
      .catch(() => {
        const err = ["Email does not exist. Please try again"];
        reject(err);
      });
  });
};
