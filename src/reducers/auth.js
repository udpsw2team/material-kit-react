import actions from '../actions/index';

const { SET_AUTH_TOKEN } = actions.authEnv;

const initialState = {
  token: null
}

const AuthApi = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return { ...state, token: action.data }
    default:
      return state;
  }
}



export default AuthApi;