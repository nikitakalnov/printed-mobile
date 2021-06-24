import { SET_BASIC_USER_DATA, SET_ACCOUNT_BALANCE } from '../actions/user';
import { LOGOUT } from '../actions/auth';

const initialState = {
  phoneNumber: null,
  email: null,
  userName: null,
  accountBalance: null
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGOUT: 
      console.log('Cleaning users');
      return initialState;
    case SET_BASIC_USER_DATA: 
      return {
        ...state,
        phoneNumber: action.phoneNumber,
        email: action.email,
        userName: action.userName,
      };
    case SET_ACCOUNT_BALANCE:
      return {
        ...state,
        accountBalance: action.accountBalance
      };
    default:
      return state;
  }
};

export default userReducer;