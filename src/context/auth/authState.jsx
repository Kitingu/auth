import React, { useReducer } from "react";
import {
  CurrentUser,
  Login,
  Register,
  ListApps,
  list_roles,
  list_user_roles,
  assign_roles,
  remove_roles,
  get_role_permissions,
  list_permissions,
  ChangePassword,
  users_assigned_to_role,
  remove_role_permission,
  assign_permissions,
  SendOTP,
} from "../../api/auth";
import decodeToken from "../../api/jwt";
import { setupAxiosInterceptors } from "../../api/index";
import { handleNotications } from "../../api/util";

import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  CLEAR_NOTIFICATION,
  LIST_APPS,
  LIST_USER_ROLES,
  ASSIGN_ROLES,
  LIST_ROLES,
  AUTH_WARNING,
  AUTHENTICATION_ERROR,
  AUTH_SUCCESS,
  LIST_ROLE_PERMISSIONS,
  LIST_ROLE_USERS,
  LIST_PERMISSIONS,
  REMOVE_PERMISSIONS,
  ASSIGN_PERMISSIONS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated:
      localStorage.getItem("isAuthenticated") === "true" ? true : false,
    loading: true,
    user: localStorage.getItem("user"),
    roles: [],
    user_roles: localStorage.getItem("user_roles"),
    error: null,
    notification: null,
    apps: localStorage.getItem("apps") || [],
    all_permissions: [],
    role_permissions: [],
    role_users: []
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const mountUserRoles = () => {
    // dispatch({ type: GET_USER_DETAILS_FROM_TOKEN, payload: roles });
    loadUser();
  };

  const loadUser = async () => {
    // @todo - load token into global headers
    let token = localStorage.getItem("token");

    let current_user = await CurrentUser(token);

    setupAxiosInterceptors(token);

    if (current_user.responseCode === 1) {
      dispatch({
        type: USER_LOADED,
        payload: {
          token: localStorage.getItem("token"),
          user: current_user.responseObject,
          user_roles: current_user.responseObject.roles,
        },
      });
    } else {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: current_user.responseMessage,
      });
    }
  };

  // Login User
  // const login = async (formData) => {
  //   let response = await Login(formData);
  //   let dashboard_app_code = '03'


  //   // "name": "Benedict,Kitingu",
  //   // "roles": [],
  //   // "accessApps": [
  //   //   {
  //   //     "accessApp": "Bulk App",
  //   //     "appsCode": "02"
  //   //   },
  //   //   {
  //   //     "accessApp": "Otogas DashBoard",
  //   //     "appsCode": "03"
  //   //   },
  //   //   {
  //   //     "accessApp": "Otogas App",
  //   //     "appsCode": "04"
  //   //   }
  //   // ],



  //   // check if the user has access to the dashboard app

  //   if (response && response.responseCode === 1) {

  //     if (response.responseObject.accessApps.filter(app => app.appsCode === dashboard_app_code).length > 0) {
  //       localStorage.setItem("token", response.responseObject.token);
  //       localStorage.setItem("isAuthenticated", true);
  //       loadUser();
  //     }
  //     else {
  //       dispatch({ type: LOGIN_FAIL, payload: "You do not have access to the dashboard" });
  //     }

  //     // dispatch({ type: LOGIN_SUCCESS, payload: response.responseObject });
  //   } else {
  //     dispatch({ type: LOGIN_FAIL, payload: response.responseMessage });
  //   }
  // };

  const login = async (formData) => {
    try {
      const dashboard_app_code = '03'; // Define dashboard app code
      const response = await Login(formData); // Call the login API
  
      if (response && response.responseCode === 1) {
        const hasDashboardAccess = response.responseObject?.accessApps?.some(app => app.appsCode === dashboard_app_code);
  
        if (hasDashboardAccess) {
          // Store authentication details in local storage
          localStorage.setItem("token", response.responseObject.token);
          localStorage.setItem("isAuthenticated", true);
  
          // Load the user details
          loadUser();
        } else {
          // User does not have access to the dashboard
          dispatch({ 
            type: LOGIN_FAIL, 
            payload: "You do not have access to the dashboard" 
          });
        }
      } else {
        // Handle failed login attempt
        dispatch({ 
          type: LOGIN_FAIL, 
          payload: response?.responseMessage || "Login failed. Please try again." 
        });
      }
    } catch (error) {
      // Handle unexpected errors like network issues
      console.error("Login error:", error);
      dispatch({ 
        type: LOGIN_FAIL, 
        payload: error.message || "An unexpected error occurred. Please try again." 
      });
    }
  };
  

  // Logout
  const logout = () => {
    dispatch({ type: LOGOUT });
    // return <Redirect to="/login" />
  };

  const sendOtp = async (phone_number) => {
    let response = await SendOTP(phone_number);
    if (response && response.responseCode === 1) {
      dispatch({ type: AUTH_SUCCESS, payload: response.responseMessage });

    }
    else {
      dispatch({ type: AUTH_ERROR, payload: response.responseMessage });

    }
    return response;
  }

  const changePassword = async (data) => {
    let response = await ChangePassword(data);
    if (response && response.responseCode === 1) {
      dispatch({ type: AUTH_SUCCESS, payload: response.responseMessage });
    }
    else if (response.responseCode === 2) {
      dispatch({ type: AUTH_WARNING, payload: response.responseMessage });

    } else {
      dispatch({ type: AUTH_ERROR, payload: response.responseMessage });
    }
    return response;
  }

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  const clear_notifications = () => dispatch({ type: CLEAR_NOTIFICATION });

  const list_apps = async () => {
    let response = await ListApps();
    if (response && response.responseCode === 1) {
      dispatch({ type: LIST_APPS, payload: response.responseObject });
    }
  };

  const getUserRoles = async (user_id) => {
    let response = await list_user_roles(user_id);
    if (response && response.responseCode === 1) {
      dispatch({ type: LIST_USER_ROLES, payload: response.responseObject });
    }
  };

  const assignRole = async (user_id, roles) => {
    console.log("Assigning roles", user_id, roles);
    let response = await assign_roles(user_id, roles);
    if (response && response.responseCode === 1) {
      dispatch({ type: ASSIGN_ROLES, payload: response.responseMessage });
    } else if (response.responseCode === 2) {
      dispatch({ type: AUTH_WARNING, payload: response.responseMessage });
    } else {
      dispatch({ type: AUTH_ERROR, payload: handleNotications(response) });
    }
  };

  const removeRole = async (user_id, role_id) => {
    console.log("Removing roles", user_id, role_id);
    let response = await remove_roles(user_id, role_id);
    console.log(response, "response")
    if (response && response.responseCode === 1) {
      dispatch({ type: ASSIGN_ROLES, payload: response.responseMessage });
    } else if (response.responseCode === 2) {
      dispatch({ type: AUTH_WARNING, payload: response.responseMessage });
    } else {
      dispatch({ type: AUTH_ERROR, payload: handleNotications(response) });
    }
  };

  const getRoles = async () => {
    let response = await list_roles();
    if (response && response.responseCode === 1) {
      dispatch({ type: LIST_ROLES, payload: response.responseObject });
    }
  };

  const listRolePermissions = async (role_id) => {
    let response = await get_role_permissions(role_id);
    if (response && response.responseCode === 1) {
      console.log(response.responseObject, "responsev_____")
      dispatch({ type: LIST_ROLE_PERMISSIONS, payload: response.responseObject });
    }
    else{
      dispatch({ type: LIST_ROLE_PERMISSIONS, payload: [] });
    }
  }

  const fetchPermissions = async () => {
    console.log("Fetching permissions")
    let response = await list_permissions();
    console.log(response, "response for all permissions ")
    if (response && response.responseCode === 1) {
      dispatch({ type: LIST_PERMISSIONS, payload: response.responseObject });
    }
    else{
      dispatch({ type: LIST_PERMISSIONS, payload: [] });
    }
  }

  const listUsersByRole = async (role_id) => {
    console.log("tumeingia")
    let response = await users_assigned_to_role(role_id);
    console.log(response, "response")
    if (response && response.responseCode === 1) {
      dispatch({ type: LIST_ROLE_USERS, payload: response.responseObject });
    }
  }


  // assign perssions to role

  const assignPermissions = async (role_id, permissions) => {
    console.log("Assigning permissions", role_id, permissions);
    let response = await assign_permissions(role_id, permissions);
    if (response && response.responseCode === 1) {
      dispatch({ type: ASSIGN_PERMISSIONS, payload: response.responseMessage });
    } else if (response.responseCode === 2) {
      dispatch({ type: AUTH_WARNING, payload: response.responseMessage });
    } else {
      dispatch({ type: AUTH_ERROR, payload: handleNotications(response) });
    }

  };

  // remove permissions from role
  const removePermissions = async (role_id, permisions) => {
    console.log("Removing permissions", role_id, permisions);
    let response = await remove_role_permission(role_id, permisions);
    console.log(response, "response")
    if (response && response.responseCode === 1) {
      dispatch({ type: REMOVE_PERMISSIONS, payload: response.responseMessage });
    } else if (response.responseCode === 2) {
      dispatch({ type: AUTH_WARNING, payload: response.responseMessage });
    } else {
      dispatch({ type: AUTH_ERROR, payload: handleNotications(response) });
    }
  };

  const clearPermissions = () => {
    dispatch({ type: LIST_ROLE_PERMISSIONS, payload: [] });
    dispatch({ type: LIST_PERMISSIONS, payload: [] });
  }



  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        notification: state.notification,
        error: state.error,
        apps: state.apps,
        user_roles: state.user_roles,
        roles: state.roles,
        all_permissions: state.all_permissions,
        role_permissions: state.role_permissions,
        role_users: state.role_users,
        // register,
        login,
        logout,
        clearErrors,
        // get_user_details_from_token,
        clear_notifications,
        list_apps,
        getUserRoles,
        assignRole,
        removeRole,
        getRoles,
        // mountUserRoles,
        loadUser,
        changePassword,
        sendOtp,
        listRolePermissions,
        listUsersByRole,
        fetchPermissions,
        assignPermissions,
        removePermissions,
        clearPermissions
        // fetchUsers,
        // getUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
