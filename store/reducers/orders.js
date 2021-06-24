import * as Actions from "../actions/orders";
import Status from "../../constants/OrderStatuses";

import { LOGOUT } from "../actions/auth";

const initialState = {
  placed: {
    list: [],
    isLoading: true
  },
  inwork: {
    list: [],
    isLoading: true
  },
  ready: {
    list: [],
    isLoading: true
  },
  received: {
    list: [],
    isLoading: true
  }
};

export default ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.IS_PLACED_ORDERS_LOADING:
      return {
        ...state,
        placed: {
          ...state.placed,
          isLoading: true
        }
      };
    case Actions.IS_INWORK_ORDERS_LOADING:
      return {
        ...state,
        inwork: {
          ...state.inwork,
          isLoading: true
        }
      };

    case Actions.IS_READY_ORDERS_LOADING:
      return {
        ...state,
        ready: {
          ...state.ready,
          isLoading: true
        }
      };

    case Actions.IS_RECEIVED_ORDERS_LOADING:
      return {
        ...state,
        received: {
          ...state.received,
          isLoading: true
        }
      };

    case Actions.SET_INWORK_ORDERS:
      return {
        ...state,
        inwork: {
          list: action.orders,
          isLoading: false
        }
      };
    case Actions.SET_PLACED_ORDERS:
      console.log("Setting placed orders in Redux store");
      return {
        ...state,
        placed: {
          list: action.orders,
          isLoading: false
        }
      };
    case Actions.SET_READY_ORDERS:
      return {
        ...state,
        ready: {
          list: action.orders,
          isLoading: false
        }
      };
    case Actions.SET_RECEIVED_ORDERS:
      return {
        ...state,
        received: {
          list: action.orders,
          isLoading: false
        }
      };
    case Actions.SET_ORDER_DOCUMENTS:
      let order = undefined;
      let orderStatus = undefined;

      while (order == undefined) {
        for (let status in state) {
          const ordersWithStatus = state[status].list;
          order = ordersWithStatus.find(order => order.id === action.orderId);
          orderStatus = status;
        }
      }

      const newOrdersList = state[orderStatus].list.filter(
        order => order.id != action.orderId
      );
      newOrdersList.push({ ...order, documents: action.documents });
      const newState = {
        ...state,
        [orderStatus]: {
          list: newOrdersList,
          isLoading: false
        }
      };
      return newState;
    case Actions.CREATE_NEW_ORDER:
      const newOrder = {
        id: action.id,
        cost: 0,
        documents: [],
        createdAt: new Date().toISOString(),
        status: Status.placed
      };
      return {
        ...state,
        placed: {
          list: [...state.placed.list, newOrder],
          isLoading: false
        }
      };
    case LOGOUT:
      console.log("Cleaning orders");
      return initialState;
    default:
      return state;
  }
};
