import React, { useReducer } from "react";
import { GetUsers, Register, UpdateUser, ResetPassword, ActivateUser, DeactivateUser, SendOTP, assignUserApps, ListAppUsers } from "../../api/auth";
// import { handleErrorNotification } from "../../api/util";
import UserContext from "./userContext";
import UserReducer from "./userReducer";
import { handleNotications } from "../../api/util";



import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    GET_USERS,
    CLEAR_NOTIFICATION,
    LIST_APP_USERS,
    USER_ERROR,
    USER_WARNING,
    USER_SUCCESS

} from "../types";

const UserState = props => {
    const initialState = {
        users: [],
        selected_user_code: "",
        notification: null,
        app_users: [],
    };

    const [state, dispatch] = useReducer(UserReducer, initialState);



    // Register User    
    const register = async formData => {
        let response = await Register(formData);
        console.log(response);
        if (response && response.responseCode === 1) {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.responseMessage

            })
        }
        else {
            dispatch({
                type: REGISTER_FAIL,
                payload: response.responseMessage
            });

        }
    };



    const fetchUsers = async () => {
        let users = await GetUsers();
        if (users.responseCode === 1) {
            dispatch({ type: GET_USERS, payload: users.responseObject });
        }
        else{
              dispatch({ type: GET_USERS, payload: []});
        }

    }

    const resetPassword = async formData => {
        let response = await ResetPassword(formData);
        if (response && response.responseCode === 1) {
            dispatch({
                type: USER_SUCCESS,
                payload: response.responseMessage
            })
        } else if (response.responseCode === 2) {
            dispatch({ type: USER_WARNING, payload: response.responseMessage });
        }
        else {
            dispatch({ type: USER_ERROR, payload: handleNotications(response) });

        }
    };

    const activateUser = async userCode => {
        let response = await ActivateUser(userCode);
        if (response && response.responseCode === 1) {
            dispatch({
                type: USER_SUCCESS,
                payload: response.responseMessage

            })
        } else if (response.responseCode === 2) {
            dispatch({ type: USER_WARNING, payload: response.responseMessage });
        }
        else {
            dispatch({ type: USER_ERROR, payload: handleNotications(response) });

        }
    };

    const deactivateUser = async userCode => {
        let response = await DeactivateUser(userCode);
        if (response && response.responseCode === 1) {
            dispatch({
                type: USER_SUCCESS,
                payload: response.responseMessage

            })
        } else if (response.responseCode === 2) {
            dispatch({ type: USER_WARNING, payload: response.responseMessage });
        }
        else {
            dispatch({ type: USER_ERROR, payload: handleNotications(response) });

        }
    };

    const clear_notifications = () => {
        dispatch({ type: CLEAR_NOTIFICATION });
    }

    const requestOtp = async (phoneNumber) => {
        let response = await SendOTP(phoneNumber);
        if (response && response.responseCode === 1) {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.responseMessage

            })
        } else if (response.responseCode === 2) {
            dispatch({ type: USER_WARNING, payload: response.responseMessage });
        }
        else {
            dispatch({ type: USER_ERROR, payload: handleNotications(response) });

        }
    };

    const assignUserApp = async (userId, appId) => {
        let response = await assignUserApps(userId, appId);

        if (response && response.responseCode === 1) {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.responseMessage

            })
        } else if (response.responseCode === 2) {
            dispatch({ type: USER_WARNING, payload: response.responseMessage });
        }
        else {
            dispatch({ type: USER_ERROR, payload: handleNotications(response) });

        }
    };

    const updateUser = async (userCode, formData) => {
        let response = await UpdateUser(userCode, formData);
        if (response && response.responseCode === 1) {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.responseMessage

            })
        } else if (response.responseCode === 2) {
            dispatch({ type: USER_WARNING, payload: response.responseMessage });
        }
        else {
            dispatch({ type: USER_ERROR, payload: handleNotications(response) });

        }
    };

    const list_app_users = async () => {
        let response = await ListAppUsers();
        if (response && response.responseCode === 2) {
            dispatch({ type: LIST_APP_USERS, payload: response.responseObject });
        }

    }


    return (
        <UserContext.Provider
            value={{


                error: state.error,
                users: state.users,
                notification: state.notification,
                selected_user_code: state.selected_user_code,
                app_users: state.app_users,
                // clearErrors,
                fetchUsers,
                register,
                resetPassword,
                activateUser,
                deactivateUser,
                clear_notifications,
                requestOtp,
                assignUserApp,
                updateUser,
                list_app_users

            }}
        >
            {props.children}
        </UserContext.Provider>
    );

}

export default UserState;