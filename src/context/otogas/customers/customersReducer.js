import {
    ADD_CUSTOMER,
    UPDATE_CUSTOMER,
    CUSTOMER_ERROR,
    GET_CUSTOMERS,
    SEARCH_CUSTOMER,
    CLEAR_NOTIFICATION,
    LIST_VEHICLES,
    LIST_PRODUCTS,
    LIST_SALES,
    LIST_PAYMENT_TYPES,
    LIST_CUSTOMER_WALLETS,
    SET_VEHICLE_SUMMARY,
    LIST_APP_PAYMENT_TYPES,
    LIST_TOPUP_PAYMENT_TYPES,
    CUSTOMER_WARNING,
    LIST_TANK_SIZES,
    GET_MPESA_PAYMENTS,
    LIST_SALE_PAYMENTS,
    SET_VEHICLE_FUELING_EVENTS,
    LIST_CUSTOMER_VEHICLES,
    MPESA_CODE_USAGE
} from "../../types"

export default (state, action) => {
    switch (action.type) {
        case GET_CUSTOMERS:
            return {
                ...state,
                customers: action.payload.customers,
                customerTotalRecords: action.payload.totalRecords,
                loading: false
            };

        case SEARCH_CUSTOMER:
            return {
                ...state,
                customers: action.payload,
                loading: false
            };

        case ADD_CUSTOMER:
            return {
                ...state,
                loading: false,
                notification: {
                    type: "success",
                    text: action.payload
                }
            };

        case CUSTOMER_ERROR:
            return {
                ...state,
                notification: {
                    type: "error",
                    text: action.payload
                }
            };

        case CUSTOMER_WARNING:
            return {
                ...state,
                notification: {
                    type: "warning",
                    text: action.payload
                }
            };


        case UPDATE_CUSTOMER:
            return {
                ...state,
                customers: state.customers.map(customer =>
                    customer.id === action.payload.id ? action.payload : customer
                ),
                loading: false
            };

        case CLEAR_NOTIFICATION:
            return {
                ...state,
                notification: null
            };

        case LIST_VEHICLES:
            return {
                ...state,
                vehicles: action.payload.vehicles,
                vehicleTotalRecords: action.payload.totalRecords
            }

        case LIST_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case LIST_SALES:
            return {
                ...state,
                sales: action.payload.sales,
                salesTotalRecords: action.payload.totalRecords
            }
        case LIST_PAYMENT_TYPES:
            return {
                ...state,
                payment_types: action.payload
            }
        case LIST_APP_PAYMENT_TYPES:
            return {
                ...state,
                app_payment_types: action.payload
            }
        case LIST_TOPUP_PAYMENT_TYPES:
            return {
                ...state,
                topup_payment_types: action.payload
            }
        case LIST_CUSTOMER_WALLETS:
            return {
                ...state,
                customer_balances: action.payload.sales,
                wallets_total_records: action.payload.totalRecords

            }
        case SET_VEHICLE_SUMMARY:
            return {
                ...state,
                vehicle_summary: action.payload
            }
        case LIST_TANK_SIZES:
            return {
                ...state,
                tank_sizes: action.payload
            }
        case GET_MPESA_PAYMENTS:
            return {
                ...state,
                mpesa_payments: action.payload
            }
        case LIST_SALE_PAYMENTS:
            return {
                ...state,
                sale_payments: action.payload
            }
        case SET_VEHICLE_FUELING_EVENTS:
            return {
                ...state,
                vehicle_fueling_events: action.payload
            }
        case LIST_CUSTOMER_VEHICLES:
            return {
                ...state,
                customer_vehicles: action.payload
            }

        case MPESA_CODE_USAGE:
            return {
                ...state,
                code_sales: action.payload
            }
        default:
            return state;
    }


}
