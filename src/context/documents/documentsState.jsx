import React, { useReducer } from 'react';
import DocumentsContext from './documentsContext';
import DocumentReducer from './documentsReducer';

import {
  list_departments,
  assign_user_to_department,
  add_document_definition,
  get_docs_per_user_department,
  add_tracking_document,
  renew_tracking_document,
  get_all_tracked_documents,
  get_tracked_document,
  get_tracked_documents_by_department,
  add_department
} from '../../api/documents';

import {
  LIST_DEPARTMENTS,
  ADD_DEPARTMENT,
  ADD_DOCUMENT,
  LIST_DOCUMENTS,
  LIST_DOCUMENTS_BY_DEPARTMENT,
  DOCUMENTS_ERROR,
  CLEAR_NOTIFICATION,
  LIST_TRACKED_DOCUMENTS,
  DOCUMENTS_WARNING
} from '../types';

const DocumentsState = (props) => {
  const initialState = {
    documents: [],
    tracked_documents: [],
    departments: [],
    notification: null
  };

  const [state, dispatch] = useReducer(DocumentReducer, initialState);

  const addDepartment = async (department) => {
    const res = await add_department(department);
    if (res.responseCode === 1) {
      dispatch({
        type: ADD_DEPARTMENT,
        payload: res.responseMessage
      });
    } else if (res.responseCode === 2) {
      dispatch({
        type: DOCUMENTS_WARNING,
        payload: res.responseMessage
      });
    } else {
      dispatch({
        type: DOCUMENTS_ERROR,
        payload: res.responseMessage
      });
    }
  };

  const addDocument = async (document) => {
    const res = await add_department(document);
    if (res.responseCode === 1) {
      dispatch({
        type: ADD_DOCUMENT,
        payload: res.responseMessage
      });
    } else if (res.responseCode === 2) {
      dispatch({
        type: DOCUMENTS_WARNING,
        payload: res.responseMessage
      });
    } else {
      dispatch({
        type: DOCUMENTS_ERROR,
        payload: res.responseMessage
      });
    }
  };

  const assignDepartmentToUser = async (userCode, departmentCode) => {
    const res = await assign_user_to_department(userCode, departmentCode);
    if (res.responseCode === 1) {
      dispatch({
        type: ADD_DEPARTMENT,
        payload: res.responseMessage
      });
    } else if (res.responseCode === 2) {
      dispatch({
        type: DOCUMENTS_WARNING,
        payload: res.responseMessage
      });
    } else {
      dispatch({
        type: DOCUMENTS_ERROR,
        payload: res.responseMessage
      });
    }
  };

  const addDocumentDefinition = async (userCode, departmentCode) => {
    const res = await add_document_definition(userCode, departmentCode);
    if (res.responseCode === 1) {
      dispatch({
        type: ADD_DEPARTMENT,
        payload: res.responseMessage
      });
    } else if (res.responseCode === 2) {
      dispatch({
        type: DOCUMENTS_WARNING,
        payload: res.responseMessage
      });
    } else {
      dispatch({
        type: DOCUMENTS_ERROR,
        payload: res.responseMessage
      });
    }
  };

  const addDocumentTracking = async (documentCode, issueDate, expiryDate) => {
    const res = await add_tracking_document(userCode, departmentCode);
    if (res.responseCode === 1) {
      dispatch({
        type: ADD_DEPARTMENT,
        payload: res.responseMessage
      });
    } else if (res.responseCode === 2) {
      dispatch({
        type: DOCUMENTS_WARNING,
        payload: res.responseMessage
      });
    } else {
      dispatch({
        type: DOCUMENTS_ERROR,
        payload: res.responseMessage
      });
    }
  };

  const renewDocumentTracking = async (trackingCode, expiryDate, renewalDate, documentStatus, hasNotification) => {
    const res = await renew_tracking_document(trackingCode, expiryDate, renewalDate, documentStatus, hasNotification);
    if (res.responseCode === 1) {
      dispatch({
        type: ADD_DEPARTMENT,
        payload: res.responseMessage
      });
    } else if (res.responseCode === 2) {
      dispatch({
        type: DOCUMENTS_WARNING,
        payload: res.responseMessage
      });
    } else {
      dispatch({
        type: DOCUMENTS_ERROR,
        payload: res.responseMessage
      });
    }
  };

  const listDocuments = async () => {
    const res = await get_docs_per_user_department();
    if (res.responseCode === 1) {
      console.log(res, '');
      dispatch({
        type: LIST_DOCUMENTS,
        payload: res.responseObject
      });
    } else {
      dispatch({
        type: LIST_DOCUMENTS,
        payload: []
      });
    }
  };

  const listTrackedDocuments = async () => {
    const res = await get_all_tracked_documents();
    if (res.responseCode === 1) {
      console.log(res, '');
      dispatch({
        type: LIST_TRACKED_DOCUMENTS,
        payload: res.responseObject
      });
    } else {
      dispatch({
        type: LIST_TRACKED_DOCUMENTS,
        payload: []
      });
    }
  };

  const listDepartments = async () => {
    const res = await list_departments();
    console.log(res);
    if (res.responseCode === 1) {
      dispatch({
        type: LIST_DEPARTMENTS,
        payload: res.responseObject
      });
    } else {
      dispatch({
        type: LIST_DEPARTMENTS,
        payload: []
      });
    }
  };

  const clear_notification = () => {
    dispatch({ type: CLEAR_NOTIFICATION });
  };

  return (
    <DocumentsContext.Provider
      value={{
        // Add the state values and functions here
        documents: state.documents,
        departments: state.departments,
        notification: state.notification,
        loading: state.loading,
        tracked_documents: state.tracked_documents,
        addDepartment,
        assignDepartmentToUser,
        addDocumentDefinition,
        addDocumentTracking,
        renewDocumentTracking,
        listDocuments,
        listTrackedDocuments,
        listDepartments,
        addDocument,
        clear_notification
      }}
    >
      {props.children}
    </DocumentsContext.Provider>
  );
};

export default DocumentsState;
