export const SET_PLACED_ORDERS = "SET_PLACED_ORDERS";
export const SET_INWORK_ORDERS = "SET_INWORK_ORDERS";
export const SET_READY_ORDERS = "SET_READY_ORDERS";
export const SET_RECEIVED_ORDERS = "SET_RECEIVED_ORDERS";

export const IS_PLACED_ORDERS_LOADING = "IS_PLACED_ORDERS_LOADING";
export const IS_INWORK_ORDERS_LOADING = "IS_INWORK_ORDERS_LOADING";
export const IS_READY_ORDERS_LOADING = "IS_READY_ORDERS_LOADING";
export const IS_RECEIVED_ORDERS_LOADING = "IS_RECEIVED_ORDERS_LOADING";

export const SET_ORDER_DOCUMENTS = "SET_ORDER_DOCUMENTS";

export const CREATE_NEW_ORDER = "CREATE_NEW_ORDER";
export const SET_NEW_ORDER_DETAILS = "SET_NEW_ORDER_DETAILS";

export const getOrdersWithStatus = status => {
  console.log(`Fetching orders with status: ${status}`)

  return async (dispatch, getState) => {
    const setLoadingAction = `IS_${status.toUpperCase()}_ORDERS_LOADING`;

    dispatch({
      type: setLoadingAction
    });

    const action = `SET_${status.toUpperCase()}_ORDERS`;

    const authState = getState().auth;

    const token = authState.token;
    const userId = authState.userId;

    const response = await fetch(
      `https://printed-server.herokuapp.com/users/${userId}/orders?status=${status}`,
      {
        method: "GET",
        headers: {
          Authorization: token
        }
      }
    );

    if (!response.ok) throw new Error("Can not fetch orders");

    const ordersList = await response.json();

    console.log(ordersList)

    dispatch({
      type: action,
      orders: ordersList
    });
  };
};

export const setOrderDocuments = orderId => {
  return async (dispatch, getState) => {
    const authState = getState().auth;

    const token = authState.token;

    const response = await fetch(
      `https://printed-server.herokuapp.com/orders/${orderId}/documents`,
      {
        method: "GET",
        headers: {
          Authorization: token
        }
      }
    );

    if (!response.ok) throw new Error("Can not fetch orders");

    const documents = await response.json();

    const documentsInfo = documents.map(document => ({
      pagesCount: document["pagesCount"]
    }));

    dispatch({
      type: SET_ORDER_DOCUMENTS,
      documents: documentsInfo,
      orderId: orderId
    });
  };
};

const createNewOrder = () => {
  return async (dispatch, getState) => {
    const authState = getState().auth;
    const token = authState.token;

    const response = await fetch(
      "https://printed-server.herokuapp.com/orders/new",
      {
        method: "POST",
        headers: {
          Authorization: token
        }
      }
    );

    const newOrderId = await response.json();

    dispatch({
      type: CREATE_NEW_ORDER,
      id: newOrderId
    });
  };
};

const setNewOrderDetails = (orderId, receiveOption, radius, location) => {
  return async (dispatch, getState) => {
    const authState = getState().auth;
    const token = authState.token;

    const response = await fetch(
      `https://printed-server.herokuapp.com/orders/${orderId}`,
      {
        method: "PUT",
        headers: {
          Authorization: token
        },
        body: JSON.stringify({
          receiveOption: receiveOption,
          radius: radius,
          location: location
        })
      }
    );
  };
};

export const addOrderDocument = orderId => {
  return async (dispatch, getState) => {};
};
