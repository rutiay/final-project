import axios from "axios";
import { REACT_APP_FIREBASE_AUTH_API_KEY } from "../../logic/keys";

const checkError = (error) => {
  if (error === "INVALID_PASSWORD") return "Wrong password";
  if (error === "EMAIL_NOT_FOUND")
    return "The email address provided is not registered";
};

export const isValidInput = (email, setError) => {
  if (!email.includes(".com")) {
    setError("Invalid Email");
    return false;
  }
  return true;
};

export const login = (email, password, setError, setAuth, setRedirectToHome) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${REACT_APP_FIREBASE_AUTH_API_KEY}`;
  axios
    .post(url, {
      email,
      password,
    })
    .then(function (response) {
      setAuth(response.data);
      setRedirectToHome(true);
    })
    .catch(function (error) {
      setError(checkError(error?.response?.data?.error?.message));
    });
};
