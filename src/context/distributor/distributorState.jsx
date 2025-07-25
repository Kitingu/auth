import React, { useReducer } from 'react';
import DistributorContext from './distributorContext';
import DistributorReducer from './distributorReducer';
import { handleNotications } from '../../api/util';
import {
  add_retailer_outlet,
  add_retailer,
  list_distributors,
  download_retailer_letter,
  get_all_retailers,
  get_all_retailers_ex,
  get_retailer,
  get_retailer_auth_letters,
  add_distributor,
  initiate_auth_letter,
  reject_auth_letter,
  approve_auth_letter,
  list_auth_letters,
  list_retailer_outlets
} from '../../api/otogas';

import {
  ADD_DISTRIBUTOR,
  LIST_DISTRIBUTORS,
  ADD_RETAILER,
  GET_ALL_RETAILERS,
  ADD_RETAILER_OUTLET,
  DOWNLOAD_RETAILER_LETTER,
  CLEAR_NOTIFICATION,
  DISTRIBUTOR_ERROR,
  DISTRIBUTOR_WARNING,
  LIST_AUTH_LETTERS,
  LIST_RETAILER_OUTLETS
} from '../types';

const DistributorsState = (props) => {
  const initialState = {
    distributors: [],
    retailers: [],
    retailer_outlets: [],
    notification: null,
    loading: false,
    auth_letters: [],
    auth_letters_count: 0,
    auth_letters_total_pages: 0
  };

  const [state, dispatch] = useReducer(DistributorReducer, initialState);

  const listDistributors = async (pageNumber, pageSize) => {
    const res = await list_distributors();
    if (res.responseCode === 1) {
      dispatch({
        type: LIST_DISTRIBUTORS,
        payload: res.responseObject
      });
    } else {
      dispatch({
        type: LIST_DISTRIBUTORS,
        payload: []
      });
    }
  };

  const addDistributor = async (formData) => {
    const res = await add_distributor(formData);
    if (res.responseCode === 1) {
      dispatch({
        type: ADD_DISTRIBUTOR,
        payload: res.responseMessage
      });
    } else if (res.responseCode === 2) {
      dispatch({
        type: DISTRIBUTOR_WARNING,
        payload: res.responseMessage
      });
    } else {
      dispatch({
        type: DISTRIBUTOR_ERROR,
        payload: res.responseMessage
      });
    }
  };

  const addRetailer = async (formData) => {
    const res = await add_retailer(formData);
    if (res.responseCode === 1) {
      dispatch({
        type: ADD_RETAILER,
        payload: res.responseMessage
      });
    } else if (res.responseCode === 2) {
      dispatch({
        type: DISTRIBUTOR_WARNING,
        payload: res.responseMessage
      });
    } else {
      dispatch({
        type: DISTRIBUTOR_ERROR,
        payload: res.responseMessage
      });
    }
  };

  const listRetailers = async (pageNumber, pageSize, params) => {
    console.log('callled ');

    const res = await get_all_retailers_ex(pageNumber, pageSize, params);
    console.log(res.responseObject, 'res');
    if (res.responseCode === 1) {
      dispatch({
        type: GET_ALL_RETAILERS,
        payload: res.responseObject
      });
    } else {
      dispatch({
        type: GET_ALL_RETAILERS,
        payload: []
      });
    }
  };

  const listAuthLetters = async (pageNumber, pageSize, params) => {
    console.log('callled ');

    const res = await list_auth_letters(pageNumber, pageSize, params);
    console.log(res.responseObject, 'res');
    if (res.responseCode === 1) {
      dispatch({
        type: LIST_AUTH_LETTERS,
        payload: res.responseObject
      });
    } else {
      dispatch({
        type: LIST_AUTH_LETTERS,
        payload: []
      });
    }
  };

  const addRetailerOutlet = async (formData) => {
    const res = await add_retailer_outlet(formData);
    console.log(res, "`ROFOOFO")
    if (res.responseCode === 1) {
      dispatch({
        type: ADD_RETAILER_OUTLET,
        payload: res.responseMessage
      });
    } else if (res.responseCode === 2) {
      dispatch({
        type: DISTRIBUTOR_WARNING,
        payload: res.responseMessage
      });
    } else {
      dispatch({
        type: DISTRIBUTOR_ERROR,
        payload: res.responseMessage
      });
    }
  };

  const getRetailerOutlets = async (id) => {
    console.log('callled <><><><><><><><><>');
    console.log(id)
    const res = await list_retailer_outlets(id);
    console.log(res.responseObject, 'responz');
    if (res.responseCode === 1) {
      dispatch({
        type: LIST_RETAILER_OUTLETS,
        payload: res.responseObject
      });
    } else {
      dispatch({
        type: LIST_RETAILER_OUTLETS,
        payload: []
      });
    }
  };

  const initiateAuthorizationLetter = async (formData) => {
    const res = await initiate_auth_letter(formData);
    if (res.responseCode === 1) {
      dispatch({
        type: ADD_RETAILER_OUTLET,
        payload: res.responseMessage
      });
    } else if (res.responseCode === 2) {
      dispatch({
        type: DISTRIBUTOR_WARNING,
        payload: res.responseMessage
      });
    } else {
      dispatch({
        type: DISTRIBUTOR_ERROR,
        payload: res.responseMessage
      });
    }
  };

  const rejectAuthorizationLetter = async (formData) => {
    const res = await reject_auth_letter(formData);
    if (res.responseCode === 1) {
      dispatch({
        type: ADD_RETAILER_OUTLET,
        payload: res.responseMessage
      });
    } else if (res.responseCode === 2) {
      dispatch({
        type: DISTRIBUTOR_WARNING,
        payload: res.responseMessage
      });
    } else {
      dispatch({
        type: DISTRIBUTOR_ERROR,
        payload: res.responseMessage
      });
    }
  };

  const approveAuthorizationLetter = async (formData) => {
    const res = await approve_auth_letter(formData);
    if (res.responseCode === 1) {
      dispatch({
        type: ADD_RETAILER_OUTLET,
        payload: res.responseMessage
      });
    } else if (res.responseCode === 2) {
      dispatch({
        type: DISTRIBUTOR_WARNING,
        payload: res.responseMessage
      });
    } else {
      dispatch({
        type: DISTRIBUTOR_ERROR,
        payload: res.responseMessage
      });
    }
  };

    const clear_notification = () => {
      dispatch({ type: CLEAR_NOTIFICATION });
    };

  return (
    <DistributorContext.Provider
      value={{
        // Add the state values and functions here
        distributors: state.distributors,
        retailers: state.retailers,
        retailer_outlets: state.retailer_outlets,
        notification: state.notification,
        loading: state.loading,
        auth_letters: state.auth_letters,
        auth_letters_count: state.auth_letters_count,
        auth_letters_total_pages: state.auth_letters_total_pages,
        listDistributors,
        addDistributor,
        addRetailer,
        listRetailers,
        addRetailerOutlet,
        initiateAuthorizationLetter,
        rejectAuthorizationLetter,
        approveAuthorizationLetter,
        listAuthLetters,
        getRetailerOutlets,
        clear_notification
      }}
    >
      {props.children}
    </DistributorContext.Provider>
  );
};

export default DistributorsState;
