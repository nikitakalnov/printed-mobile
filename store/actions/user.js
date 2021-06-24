export const SET_BASIC_USER_DATA = 'SET_BASIC_USER_DATA';
export const SET_ACCOUNT_BALANCE = 'SET_ACCOUNT_BALANCE';

export const setBasicUserData = (name, phoneNumber, email) => {
  return {
    type: SET_BASIC_USER_DATA,
    userName: name,
    phoneNumber: phoneNumber,
    email: email
  };
}

export const setAccountBalance = () => {
  return async (dispatch, getState) => {
    const authState = getState().auth;
    console.log(authState);

    const userId = authState.userId;
    const token = authState.token;

    const response = await fetch(`https://printed-server.herokuapp.com/accounts/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    });

    if(!response.ok)
      throw new Error('Can not fetch account data');

    const responseData = await response.json();

    dispatch({
      type: SET_ACCOUNT_BALANCE,
      accountBalance: responseData.balance
    });   
  };
}