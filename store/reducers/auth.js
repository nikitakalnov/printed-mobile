import { SIGN_IN, SIGN_UP, AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
  phoneNumber: null,
  email: null,
  token: '',
  userId: null,
  userName: '',
  tokenExpirationDate: null,
  accountNumber: null
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGOUT: 
      return initialState;
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId
      };
    case SIGN_UP:
    default:
      return state;
  }
};

export default authReducer;