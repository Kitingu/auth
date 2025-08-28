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
  update_retailer,
  reject_auth_letter,
  approve_auth_letter,
  list_auth_letters,
  list_retailer_outlets,
  get_a_retailer,
  add_distributor_outlet,
  initiate_distributor_letter,
  list_dist_auth_letters,
  get_a_distributor,
  update_distributor,
  list_distributor_outlets,
  download_distributor_letter,
  approve_dist_auth_letter,
  reject_dist_auth_letter,

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
  LIST_RETAILER_OUTLETS,
  GET_A_RETAILER,
  GET_A_DISTRIBUTOR,
  LIST_DIST_AUTH_LETTERS,
  LIST_DISTRIBUTOR_OUTLETS,
  

} from '../types';

const DistributorsState = (props) => {
  const initialState = {
    distributors: [],
    distributor_outlets: [],
    distributor: {},
    distributor_auth_letters: [],
    distributor_auth_letters_count: 0,
    distributor_auth_letters_total_pages: 0,
    retailers: [],
    retailer_outlets: [],
    retailer: {},
    notification: null,
    loading: CSSFontFeatureValuesRule,
    auth_letters: [],
    auth_letters_count: 0,
    auth_letters_total_pages: 0
  };

  const [state, dispatch] = useReducer(DistributorReducer, initialState);

  const listDistributors = async (pageNumber, pageSize) => {
    const res = await list_distributors(pageNumber, pageSize);
    console.log(res.responseObject, 'resbonz');

    if (res.responseCode === 2) {
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

  const updateRetailer = async (formData) => {
    const res = await update_retailer(formData);
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

  const updateDistributor = async (formData) => {
    const res = await update_distributor(formData);
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

  const getRetailer = async (retailerCode) => {
    console.log('callled ');

    const res = await get_a_retailer(retailerCode);
    console.log(res.responseObject, 'res');
    if (res.responseCode === 1) {
      dispatch({
        type: GET_A_RETAILER,
        payload: res.responseObject
      });
    } else {
      dispatch({
        type: GET_A_RETAILER,
        payload: {}
      });
    }
  };

  const getDistributor = async (retailerCode) => {
    console.log('callled ');

    const res = await get_a_distributor(retailerCode);
    console.log(res.responseObject, 'res');
    if (res.responseCode === 1) {
      dispatch({
        type: GET_A_DISTRIBUTOR,
        payload: res.responseObject
      });
    } else {
      dispatch({
        type: GET_A_DISTRIBUTOR,
        payload: {}
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

  const listDistributorLetters = async (pageNumber, pageSize, params) => {
    console.log('callled ');

    const res = await list_dist_auth_letters(pageNumber, pageSize, params);
    console.log(res.responseObject, 'res');
    if (res.responseCode === 1) {
      dispatch({
        type: LIST_DIST_AUTH_LETTERS,
        payload: res.responseObject
      });
    } else {
      dispatch({
        type: LIST_DIST_AUTH_LETTERS,
        payload: []
      });
    }
  };

  const addRetailerOutlet = async (formData) => {
    const res = await add_retailer_outlet(formData);
    console.log(res, '`ROFOOFO');
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

  const addDistributorOutlet = async (formData) => {
    const res = await add_distributor_outlet(formData);
    console.log(res, '`ROFOOFO');
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
    console.log(id);
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


    const getDistributorOutlets = async (id) => {
    console.log('callled <><><><><><><><><>');
    console.log(id);
    const res = await list_distributor_outlets(id);
    console.log(res.responseObject, 'responz');
    if (res.responseCode === 1) {
      dispatch({
        type: LIST_DISTRIBUTOR_OUTLETS,
        payload: res.responseObject
      });
    } else {
      dispatch({
        type: LIST_DISTRIBUTOR_OUTLETS,
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

  const initateDistributorAuthLetter = async (formData) => {
    const res = await initiate_distributor_letter(formData);
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

    const rejectDistributorAuthorizationLetter = async (formData) => {
    const res = await reject_dist_auth_letter(formData);
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

  const approveDistributorAuthorizationLetter = async (formData) => {
    const res = await approve_dist_auth_letter(formData);
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
        distributor_outlets: state.distributor_outlets,
        distributor: state.distributor,
        distributor_auth_letters: state.distributor_auth_letters,
        distributor_auth_letters_count: state.distributor_auth_letters_count,
        distributor_auth_letters_total_pages: state.distributor_auth_letters_total_pages,
        retailers: state.retailers,
        retailer_outlets: state.retailer_outlets,
        notification: state.notification,
        loading: state.loading,
        auth_letters: state.auth_letters,
        auth_letters_count: state.auth_letters_count,
        auth_letters_total_pages: state.auth_letters_total_pages,
        retailer: state.retailer,
        listDistributors,
        getDistributorOutlets,
        getDistributor,
        addDistributor,
        addDistributorOutlet,
        initateDistributorAuthLetter,
        listDistributorLetters,
        addRetailer,
        updateRetailer,
        listRetailers,
        addRetailerOutlet,
        initiateAuthorizationLetter,
        rejectAuthorizationLetter,
        approveAuthorizationLetter,
        listAuthLetters,
        getRetailerOutlets,
        clear_notification,
        getRetailer,
        approveDistributorAuthorizationLetter,
        rejectDistributorAuthorizationLetter,
      }}
    >
      {props.children}
    </DistributorContext.Provider>
  );
};

export default DistributorsState;
