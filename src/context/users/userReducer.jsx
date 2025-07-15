import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS,
    GET_USERS,
    CLEAR_CURRENT_USER,
    SET_CURRENT_USER,
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS,
    GET_USER,
    CLEAR_NOTIFICATION,
    LIST_APP_USERS,
    USER_ERROR, USER_WARNING, USER_SUCCESS

} from "../types";


export default(state, action) => {
    switch (action.type) { 
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                notification: {
                    text: action.payload,
                    type: "success"
                }

            };

        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                notification: {
                    text: action.payload,
                    type: "error"
                }
            };

        case USER_ERROR:
            return {
                ...state,
                loading: false,
                notification: {
                    text: action.payload,
                    type: "error"
                }
            };

        case USER_WARNING:
            return {
                ...state,
                loading: false,
                notification: {
                    text: action.payload,
                    type: "warning"
                }
            };

        case USER_SUCCESS:
            return {
                ...state,
                loading: false,
                notification: {
                    text: action.payload,
                    type: "success"
                }
            };

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.map(user => 
                    user.id === action.payload.id ? action.payload : user
                ),
                loading: false
            };

        case UPDATE_USER_FAIL:
            return {
                ...state,
                loading: false,
                notification: {
                    text: action.payload,
                    type: "error"
                }
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        case CLEAR_NOTIFICATION:
            return {
                ...state,
                notification: null
            };
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };

        case GET_USER:
            return {
                ...state,
                selected_user: action.payload,
                loading: false

            }

        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };

        case CLEAR_CURRENT_USER:
            return {
                ...state,
                currentUser: null
            };
        case LIST_APP_USERS:
            return {
                ...state,
                app_users: action.payload
            };

        default:
            return state;
    }
};
