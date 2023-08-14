export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function handleLogout() {
  return {
    type: LOGOUT_USER,
  };
}

export function handleLogin(username, password) {
  return (dispatch, getState) => {
      const {users} = getState();
      const user = Object.values(users).find((user) => user.id === username && user.password === password);
      if (user != null) {
          return dispatch(setAuthedUser(user.id));
      }
  };
}