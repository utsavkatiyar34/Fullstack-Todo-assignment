import {
  ADD_TODO_ERROR,
  ADD_TODO_LOADING,
  ADD_TODO_SUCCESS,
  DELETE_TODO_ERROR,
  DELETE_TODO_LOADING,
  DELETE_TODO_SUCCESS,
  GET_TODO_ERROR,
  GET_TODO_LOADING,
  GET_TODO_SUCCESS,
  PATCH_TODO_ERROR,
  PATCH_TODO_LOADING,
  PATCH_TODO_SUCCESS,
  SIGNUP_TODO_LOADING,
  SIGNUP_TODO_SUCCESS,
  SIGNUP_TODO_ERROR,
  LOGIN_TODO_LOADING,
  LOGIN_TODO_SUCCESS,
  LOGIN_TODO_ERROR,
  LOGOUT,
  GETLOGIN_TODO_LOADING,
  GETLOGIN_TODO_SUCCESS,
  GETLOGIN_TODO_ERROR,
} from "./actionTypes";

const initialState = {
  login: {
    loading: false,
    error: false,
    token:null,
    email:null,
  },
  profile:{
    loading:false,
    error:false,
    user:[]
  },
  signup: {
    loading: false,
    error: false,
  },
  todo: {
    loading: false,
    error: false,
    data: [],
  },
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO_LOADING:
      return {
        ...state,
        todo: {
          ...state.todo,
          loading: true,
        },
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todo: {
          ...state.todo,
          loading: false,
          error: false,
          data:action.payload,
        },
      };
    case ADD_TODO_ERROR:
      return {
        ...state,
        todo: {
          ...state.todo,
          loading: false,
          error: true,
        },
      };
    case GET_TODO_LOADING:
      return {
        ...state,
        todo: {
          ...state.todo,
          loading: true,
        },
      };
    case GET_TODO_SUCCESS:
      return {
        ...state,
        todo: {
          ...state.todo,
          loading: false,
          error: false,
          data: action.payload,
        },
      };
    case GET_TODO_ERROR:
      return {
        ...state,
        todo: {
          ...state.todo,
          loading: false,
          error: true,
        },
      };
    case PATCH_TODO_LOADING:
      return {
        ...state,
        todo: {
          ...state.todo,
          loading: true,
        },
      };
    case PATCH_TODO_SUCCESS:
      return {
        ...state,
        todo: {
          ...state.todo,
          loading: false,
          error: false,
          data:action.payload,
        },
      };
    case PATCH_TODO_ERROR:
      return {
        ...state,
        todo: {
          ...state.todo,
          loading: false,
          error: true,
        },
      };
    case DELETE_TODO_LOADING:
      return {
        ...state,
        todo: {
          ...state.todo,
          loading: true,
        },
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        todo: {
          ...state.todo,
          loading: false,
          error: false,
          data:action.payload,
        },
      };
    case DELETE_TODO_ERROR:
      return {
        ...state,
        todo: {
          ...state.todo,
          loading: false,
          error: true,
        },
      };
    case SIGNUP_TODO_LOADING:
      return {
        ...state,
        signup: {
          ...state.signup,
          loading: true,
        },
      };
    case SIGNUP_TODO_SUCCESS:
      return {
        ...state,
        signup: {
          ...state.signup,
          loading: false,
          error: false,
        },
      };
    case SIGNUP_TODO_ERROR:
      return {
        ...state,
        signup: {
          ...state.signup,
          loading: false,
          error: true,
        },
      };
    case LOGIN_TODO_LOADING:
      return {
        ...state,
        login: {
          ...state.login,
          loading: true,
        },
      };
    case LOGIN_TODO_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          error: false,
          token: action.payload.token,
          email: action.payload.email
        },
      };
    case LOGIN_TODO_ERROR:
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          error: true,
        },
      };
      case GETLOGIN_TODO_LOADING:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: true,
        },
      };
    case GETLOGIN_TODO_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: false,
          error: false,
          user:action.payload
        },
      };
    case GETLOGIN_TODO_ERROR:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: false,
          error: true,
        },
      };
      case LOGOUT:
      return {
        ...state,
        login: {
          ...state.login,
          loading:false,
          error:false,
          email:null,
          token:null,
        },
      };

    default:
      return { ...state };
  }
};
