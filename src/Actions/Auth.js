import axios from "axios";
import authToken from "../utils/authToken";
import { setAlert } from "./Alert";
import { loadCurPosts, loadOtherPosts } from "./Post";
import { loadProfiles } from "./Profile.Action";
const NEW_URL = "https://friendly-pear-sock.cyclic.app/"
// const NEW_URL = "https://weconnect-api-u9ml.onrender.com/";
// const NEW_URL = "https://weconnect-production.up.railway.app/";
const oldURL = "http://localhost:5001/";
//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    authToken(localStorage.token);
  }
  try {
    const res = await axios.get(`${NEW_URL}api/auth`);
    console.log(res.data.data[0].msg);
    dispatch({
      type: "USER_LOADED",
      payload: res.data.data[0].msg,
    });

    const response = await axios.get(`${NEW_URL}api/profile/me`);
    console.log(response.data.data[0]);
    dispatch({
      type: "L_PROFILE",
      payload: response.data.data[0],
    });

  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};

export const RegisterUser =
  ({ fName, lName, email, password, passwordConfirm, profileImage }) =>
  async (dispatch) => {
    try {
      const fomData = new FormData();
      fomData.append("fName", fName);
      fomData.append("lName", lName);
      fomData.append("email", email);
      fomData.append("password", password);
      fomData.append("passwordConfirm", passwordConfirm);
      fomData.append("pImage", profileImage);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.post(`${NEW_URL}api/user`, fomData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: { token: res.data.data[0].token },
      });
      dispatch(loadUser());
      if (res.status === 201) {
        // console.log("sdfs");
        res.data.data.forEach((err) => {
          dispatch(setAlert(err.msg, "danger"));
        });
      }
      // console.log(res.data)
    } catch (error) {
      // console.log(error.message);
      // console.log(error);
    }
  };

export const login = (email, password) => async (dispatch) => {
  try {
    console.log(email + "::" + password);
    console.log("FROM XYZZ");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      email,
      password,
    });
    const res = await axios.post(`${NEW_URL}api/auth/login`, body, config);
    console.log(res);
    if (res.data.status == "Success") {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { token: res.data.data[0].msg },
      });
      dispatch(loadUser());
      dispatch(loadProfiles());
      dispatch(loadCurPosts());
      dispatch(loadOtherPosts());
    } else {
      dispatch(
        setAlert(
          "Sorry There exists an error in your credentials. Please try again or create one if you don't have any",
          "danger"
        )
      );
    }
  } catch (error) {
    dispatch(
      setAlert(
        "Sorry There exists an error in your credentials. Please try again.",
        "danger"
      )
    );
    dispatch({
      type: "LOGIN_FAILED",
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: "CLEAR_PROFILE" });
  dispatch({
    type: "LOGOUT",
  });
};
