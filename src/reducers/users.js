import todoAction from '../actions/index';

const {
  GET_ME_REQUEST, GET_ME_SUCCESS, GET_ME_FAILED,
  GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILED,
  CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILED,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED,
  DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILED } = todoAction.todo;

const { SET_ME_INFO } = todoAction.authEnv;

const initialState = {
  // users
  users: [],
  me: {},
  // user status
  getMeStatus: null,
  getUsersStatus: null,
  createUserStatus: null,
  updateUserStatus: null,
  deleteUserStatus: null,
}

const UserApi = (state = initialState, action) => {
  switch (action.type) {
    case SET_ME_INFO:
      console.log('set me info', action.data)
      return { ...state, me: action.data }
    case GET_ME_REQUEST:
      return { ...state, getMeStatus: 0 }
    case GET_ME_SUCCESS:
      {
        const tmpMe = action.data[0];
        return { ...state, me: tmpMe, getMeStatus: 1 }
      }
    case GET_ME_FAILED:
      return { ...state, getMeStatus: -1 }
    case GET_USERS_REQUEST:
      return { ...state, getUsersStatus: 0 }
    case GET_USERS_SUCCESS:
      {
        let tmpUsers = [];
        if (Array.isArray(action.data)) {
          tmpUsers = action.data;
        } else if (action.data.members) {
            tmpUsers = action.data.members;
          }
        tmpUsers.forEach(user => {
          user.status = 'active';
        })
        return { ...state, users: tmpUsers, getUsersStatus: 1 }
      }
    case GET_USERS_FAILED:
      return { ...state, getUsersStatus: -1 }
    case CREATE_USER_REQUEST:
      return { ...state, createUserStatus: 0 }
    case CREATE_USER_SUCCESS:
      // const msg = action.data;
      return { ...state, createUserStatus: 1 }
    case CREATE_USER_FAILED:
      return { ...state, createUserStatus: -1 }
    case UPDATE_USER_REQUEST:
      return { ...state, updateUserStatus: 0 }
    case UPDATE_USER_SUCCESS:
      // const updateMsg = action.data;
      return { ...state, updateUserStatus: 1 }
    case UPDATE_USER_FAILED:
      return { ...state, updateUserStatus: -1 }
    case DELETE_USER_REQUEST:
      return { ...state, deleteUserStatus: 0 }
    case DELETE_USER_SUCCESS:
      // const deleteMsg = action.data;
      return { ...state, deleteUserStatus: 1 }
    case DELETE_USER_FAILED:
      return { ...state, deleteUserStatus: -1 }
    default:
      return state;
  }
}



export default UserApi;