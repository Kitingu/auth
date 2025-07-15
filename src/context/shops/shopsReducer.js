import {
    LIST_SHOP_PRODUCTS,
    ADD_SHOP_ITEM,
    UPDATE_SHOP_ITEM,
    ADD_PAYMENT_METHOD,
    MAKE_SALE,
    LIST_SHOP_SALES,
    LIST_PAYMENT_METHODS,
    SHOPS_ERROR,
    SHOPS_WARNING,
    CLEAR_NOTIFICATION,
    LIST_SHOP_SETUPS,
} from "../types"

export default (state, action) => {
    switch (action.type) {

        case CLEAR_NOTIFICATION:
            return {
                ...state,
                notification: null
            };

        case LIST_SHOP_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            };
        case ADD_SHOP_ITEM:
            return {
                ...state,
                notification: {
                    type: "success",
                    text: action.payload
                },
                loading: false
            };

        case UPDATE_SHOP_ITEM:
            return {
                ...state,
                notification: {
                    type: "success",
                    text: action.payload
                },
                loading: false
            };

        case ADD_PAYMENT_METHOD:
            return {
                ...state,
                notification: {
                    type: "success",
                    text: action.payload
                },
                loading: false
            };

        case MAKE_SALE:
            return {
                ...state,
                notification: {
                    type: "success",
                    text: action.payload
                },
                loading: false
            };

        case LIST_SHOP_SALES:
            return {
                ...state,
                sales: action.payload.records,
                salesCount: action.payload.totalRecords,

                loading: false
            };

        case LIST_PAYMENT_METHODS:
            return {
                ...state,
                paymentMethods: action.payload,
                loading: false
            };

        case SHOPS_ERROR:
            return {
                ...state,
                notification: {
                    type: "error",
                    text: action.payload
                },
                loading: false
            };

        case SHOPS_WARNING:
            return {
                ...state,
                notification: {
                    type: "warning",
                    text: action.payload
                },
                loading: false
            };
        case LIST_SHOP_SETUPS:
            return {
                ...state,
                shop_setups: action.payload,
                loading: false
            };
    

        default:
            return state;
    }
}



