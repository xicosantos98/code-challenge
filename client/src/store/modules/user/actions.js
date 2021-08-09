import { actions } from './index';
import { signinRequest, getUserTokenRequest, signupRequest } from '../../../services/auth';
import { setToken } from '../../../utils/axios';

export const login = (data) => async (dispatch) => {
  const { setUser } = actions;

  const user = (await signinRequest(data)) || null;
  return dispatch(setUser(user));
};

export const signup = (data) => async (dispatch) => {
  const { setUser } = actions;

  const response = (await signupRequest(data)) || null;
  if (!response.error) {
    return dispatch(setUser(response.user));
  }
  return response;
}

export const getUserByToken = () => async (dispatch) => {
  const { setUser } = actions;

  const user = (await getUserTokenRequest()) || null;
  dispatch(setUser(user));
};

export const logout = () => async (dispatch) => {
  const { setUser } = actions;

  setToken(null);
  dispatch(setUser(null));
};