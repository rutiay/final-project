import axios from "axios";
import { REACT_APP_FIREBASE_AUTH_API_KEY } from "../../logic/keys";

const checkError = (error) => {
  if (error === "EMAIL_EXISTS") {
    return "This email is already in use";
  }
};

export const register = (
  name,
  lastName,
  email,
  password,
  setError,
  setAuth,
  setRedirectToDetails
) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${REACT_APP_FIREBASE_AUTH_API_KEY}`;
  axios
    .post(url, {
      email,
      password,
    })
    .then(function (response) {
      setAuth(response.data);
      sendData(name, lastName, email, setRedirectToDetails);
    })
    .catch(function (error) {
      setError(checkError(error?.response?.data?.error?.message));
    });
};

export const isValidInput = (name, lastName, email) => {
  return name.length && lastName.length && email.includes(".com");
};

export const isPasswordMatch = (password, confirmPassword, setError) => {
  if (password.length >= 6) {
    if (password === confirmPassword) {
      return true;
    }
    setError("The Password confirmation does not match");
  } else {
    setError("Password must contain at least 6 characters");
  }
};

const sendData = (name, lastName, email, setRedirectToDetails) => {
  axios
    .post("/users/register", {
      name,
      lastName,
      email,
      followers: [],
      followings: [],
    })
    .then(function () {
      setRedirectToDetails(true);
    })
    .catch(function (error) {
      console.log(error);
    });
};
