const initialState = {
  phoneNumber: null,
  password: null,
  email: null,
  isAuthenticated: false,
  isAuthenticationSuccessful: false,
  tokenExpirationDate: null
};

const authReducer = (state = initialState, action) => {
  return state;
}

export default authReducer;