import React, { useReducer } from "react";
import ShopsContext from "./shopsContext";
import ShopsReducer from "./shopsReducer";
import { handleNotications } from "../../api/util";
import {
  list_otoshop_products,
  add_shop_items,
  update_shop_items,
  add_payment_method,
  make_sale,
  list_otoshop_sales,
  list_payment_methods,
  list_shop_setups,
  validate_consumption,
  add_update_otoshop_setup


} from "../../api/otogas";


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
  SETUP_SHOP_ITEM

} from "../types";

const ShopsState = (props) => {
  const initialState = {
    products: [],
    sales: [],
    salesCount: 0,
    shop_setups: [],
    paymentMethods: [],
    notification: null,
    loading: false,



  };

  const [state, dispatch] = useReducer(ShopsReducer, initialState);


  const listProducts = async () => {

    const res = await list_otoshop_products();
    if (res.responseCode === 1) {
      dispatch({
        type: LIST_SHOP_PRODUCTS,
        payload: res.responseObject,
      });

    }
    else {
      dispatch({
        type: LIST_SHOP_PRODUCTS,
        payload: []
      });
    }

  }

  const addProduct = async (product) => {
    const res = await add_shop_items(product);
    if (res.responseCode === 1) {
      dispatch({
        type: ADD_SHOP_ITEM,
        payload: res.responseMessage,
      });

    } else if (res.responseCode === 2) {
      dispatch({
        type: SHOPS_WARNING,
        payload: res.responseMessage,
      });
    }
    else {
      dispatch({
        type: SHOPS_ERROR,
        payload: res.responseMessage,
      });
    }
  }

  const updateProduct = async (product) => {
    const res = await update_shop_items(product);
    if (res.responseCode === 1) {
      dispatch({
        type: UPDATE_SHOP_ITEM,
        payload: res.responseMessage,
      });

    } else if (res.responseCode === 2) {
      dispatch({
        type: SHOPS_WARNING,
        payload: res.responseMessage,
      });
    }
    else {
      dispatch({
        type: SHOPS_ERROR,
        payload: res.responseMessage,
      });
    }
  }

  const listSales = async (pageNumber, pageSize, DateCreated, ItemCode) => {
    console.log("callled ")
    console.log(pageNumber, pageSize, DateCreated, ItemCode, "params")
    const res = await list_otoshop_sales(pageNumber, pageSize, DateCreated, ItemCode);
    console.log(res, "vgdewhbbhjdwjknjknwendf")
    if (res.responseCode === 1) {
      dispatch({
        type: LIST_SHOP_SALES,
        payload: res.responseObject,
      });

    } else {
      dispatch({
        type: LIST_SHOP_SALES,
        payload: { records: [], totalRecords: 0 },
      });
    }
  }

  const addPaymentType = async (paymentMethod) => {
    const res = await add_payment_method(paymentMethod);
    console.log("payment method", res);
    if (res.responseCode === 1) {
      dispatch({
        type: ADD_PAYMENT_METHOD,
        payload: res.responseMessage,
      });

    } else if (res.responseCode === 2) {
      dispatch({
        type: SHOPS_WARNING,
        payload: res.responseMessage,
      });
    }
    else {
      dispatch({
        type: SHOPS_ERROR,
        payload: res.responseMessage,
      });
    }
  }

  const listPaymentMethods = async () => {
    const res = await list_payment_methods();
    if (res.responseCode === 1) {
      dispatch({
        type: LIST_PAYMENT_METHODS,
        payload: res.responseObject,
      });

    } else {
      dispatch({
        type: LIST_PAYMENT_METHODS,
        payload: [],
      });
    }
  }

  const makeSale = async (sale) => {
    const res = await make_sale(sale);
    console.log(res, "ghjeklwjrhgwvbenfjkw,dbsfhwjd");
    if (res.responseCode === 1) {
      dispatch({
        type: MAKE_SALE,
        payload: res.responseMessage,
      });

    } else if (res.responseCode === 2) {
      dispatch({
        type: SHOPS_WARNING,
        payload: res.responseMessage,
      });
    }
    else {
      dispatch({
        type: SHOPS_ERROR,
        payload: res.responseMessage,
      });
    }
  }

  const clear_notification = () => {
    dispatch({ type: CLEAR_NOTIFICATION });
  };

  const listShopSetups = async () => {
    const res = await list_shop_setups();
    console.log(res, "ghjeklwjrhgwvbenfjkw,dbsfhwjd");
    if (res.responseCode === 1) {
      dispatch({
        type: LIST_SHOP_SETUPS,
        payload: res.responseObject,
      });
    }
    else {
      dispatch({
        type: list_shop_setups,
        payload: [],
      });
    }
  }

  const setupShopItem = async (setup) => {
    const res = await add_update_otoshop_setup(setup);
    console.log(res, "ghjeklwjrhgwvbenfjkw,dbsfhwjd");
    if (res.responseCode === 1) {
      dispatch({
        type: ADD_SHOP_ITEM,
        payload: res.responseMessage,
      });
    }
    else if (res.responseCode === 2) {
      dispatch({
        type: SHOPS_WARNING,
        payload: res.responseMessage,
      });
    }

    else {
      dispatch({
        type: SHOPS_ERROR,
        payload: res.responseMessage,
      });
    }
  }



  return (
    <ShopsContext.Provider
      value={{
        // Add the state values and functions here
        products: state.products,
        sales: state.sales,
        salesCount: state.salesCount,
        paymentMethods: state.paymentMethods,
        notification: state.notification,
        loading: state.loading,
        shop_setups: state.shop_setups,
        listProducts,
        addProduct,
        updateProduct,
        listSales,
        addPaymentType,
        makeSale,
        listPaymentMethods,
        clear_notification,
        setupShopItem,
        listShopSetups

      }}
    >
      {props.children}
    </ShopsContext.Provider>
  );
};

export default ShopsState;
