import {
  ADD_DISTRIBUTOR,
  ADD_RETAILER,
  ADD_RETAILER_OUTLET,
  DOWNLOAD_RETAILER_LETTER,
  GET_ALL_RETAILERS,
  LIST_DISTRIBUTORS,
  DISTRIBUTOR_ERROR,
  DISTRIBUTOR_WARNING,
  CLEAR_NOTIFICATION,
  LIST_AUTH_LETTERS,
  LIST_RETAILER_OUTLETS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        notification: null
      };

    case LIST_DISTRIBUTORS:
      return {
        ...state,
        distributors: action.payload,
        loading: false
      };
    case ADD_DISTRIBUTOR:
      return {
        ...state,
        notification: {
          type: 'success',
          text: action.payload
        },
        loading: false
      };

    case ADD_RETAILER:
      return {
        ...state,
        notification: {
          type: 'success',
          text: action.payload
        },
        loading: false
      };

    case ADD_RETAILER_OUTLET:
      return {
        ...state,
        notification: {
          type: 'success',
          text: action.payload
        },
        loading: false
      };

    case DISTRIBUTOR_ERROR:
      return {
        ...state,
        notification: {
          type: 'error',
          text: action.payload
        },
        loading: false
      };

    case DISTRIBUTOR_WARNING:
      return {
        ...state,
        notification: {
          type: 'warning',
          text: action.payload
        },
        loading: false
      };
    case GET_ALL_RETAILERS:
      return {
        ...state,
        retailers: action.payload,
        loading: false
      };

    case LIST_AUTH_LETTERS:
      return {
        ...state,
        auth_letters: action.payload.items,
        auth_letters_count: action.payload.totalCount,
        auth_letters_total_pages: action.payload.totalPages,
        loading: false
      };

    case LIST_RETAILER_OUTLETS:
      return {
        ...state,
        retailer_outlets: action.payload[0].outlets,
        loading: false
      };

    default:
      return state;
  }
};
