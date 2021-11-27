import { csrfFetch } from './csrf';
import { Action, CurrentUser, LoginUser } from '../../module'

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user: CurrentUser) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

// const removeUser = () => {
//   return {
//     type: REMOVE_USER,
//   };
// };

export const login = (user: LoginUser) => async (dispatch: any) => {
  const { email, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action: Action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
