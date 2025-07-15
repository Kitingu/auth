import {
    ADD_ORDER,
    DELETE_ORDER,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_ORDER,
    FILTER_ORDERS,
    CLEAR_FILTER,
    ORDER_ERROR,
    GET_ORDERS,
    CLEAR_ORDERS
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
                loading: false
            };
        case ADD_ORDER:
            return {
                ...state,
                // add new orders before the old state
                orders: [action.payload, ...state.orders],

                loading: false,
            };

        case UPDATE_ORDER:
            return {
                ...state,
                orders: state.orders.map(order =>
                    order._id === action.payload._id ? action.payload : order
                ), //order obj
                loading: false
            };
        case DELETE_ORDER:
            return {
                ...state,
                orders: state.orders.filter(order => {
                    return order._id !== action.payload; //payload is the id
                }),
                loading: false
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload //order obj
            };

        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case FILTER_ORDERS:
            return {
                ...state,
                filtered: state.orders.filter(order => {
                    const regex = new RegExp(`${action.payload}`, "gi");
                    return order.name.match(regex) || order.email.match(regex);
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case ORDER_ERROR: {
            return {
                ...state,
                error: action.payload //msg
            };
        }
        case CLEAR_ORDERS: {
            return {
                ...state,
                orders: null,
                filtered: null,
                error: null,
                current: null
            };
        }
        default:
            return state;
    }
};