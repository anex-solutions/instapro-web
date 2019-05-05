import Axios from "axios";

import { GET_PROFILE, PROFILE_LOADING, GET_POSTS } from "./Types";

export const profileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const getProfile = username => dispatch => {
  dispatch(profileLoading());
  Axios.get(`/api/profile/${username}`)
    .then(res => {
      dispatch({ type: GET_PROFILE, payload: res.data });
      Axios.get(`/api/posts/${username}/${res.data.user}`)
        .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
        .catch(err => dispatch({ type: GET_POSTS, payload: {} }));
    })
    .catch(err => dispatch({ type: GET_PROFILE, payload: null }));
};
