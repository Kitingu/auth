import {
  LIST_DEPARTMENTS,
  ADD_DEPARTMENT,
  ADD_DOCUMENT,
  LIST_DOCUMENTS,
  LIST_DOCUMENTS_BY_DEPARTMENT,
  DOCUMENTS_ERROR,
  CLEAR_NOTIFICATION,
  DOCUMENTS_WARNING
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        notification: null
      };

    case LIST_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
        loading: false
      };

    case LIST_DOCUMENTS:
      return {
        ...state,
        documents: action.payload,
        loading: false
      };
    case ADD_DEPARTMENT:
      return {
        ...state,
        notification: {
          type: 'success',
          text: action.payload
        },
        loading: false
      };

    case ADD_DOCUMENT:
      return {
        ...state,
        notification: {
          type: 'success',
          text: action.payload
        },
        loading: false
      };

    case DOCUMENTS_ERROR:
      return {
        ...state,
        notification: {
          type: 'error',
          text: action.payload
        },
        loading: false
      };

    case DOCUMENTS_WARNING:
      return {
        ...state,
        notification: {
          type: 'warning',
          text: action.payload
        },
        loading: false
      };

    default:
      return state;
  }
};
