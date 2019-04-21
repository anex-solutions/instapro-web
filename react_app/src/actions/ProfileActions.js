import Axios from "axios";

import {
  // TEST_DISPATCH,
  GET_ERRORS,
  GET_PROFILE,
  PROFILE_NOT_FOUND,
  PROFILE_LOADING
} from "./Types";

export const profileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const getProfile = username => dispatch => {
  dispatch(profileLoading());
  Axios.get(`/api/profile/${username}`)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_PROFILE, payload: null }));
};
