import React, { useReducer } from "react";
import CustomerContext from "./customersContext";
import CustomerReducer from "./customersReducer";
import { handleNotications } from "../../../api/util";
import {
  update_vehicle,
  add_vehicle,
  list_vehicles,
  search_customer,
  update_customer_info,
  create_customer,
  update_customer_status,
  list_customers,
  list_products,
  add_product,
  search_vehicle_by_reg_no,
  add_sale,
  stoke_take,
  remove_sale,
  list_sales,
  list_payment_types,
  list_app_payment_types,
  list_topup_types,
  list_customer_wallets,
  all_customer_balances,
  top_up_customer_balance,
  add_payment_type,
  change_station_price,
  set_global_pricing,
  get_vehicle_summary,
  update_vehicle_status,
  transfer_vehicle,
  transfer_sale_to_another_nozzle,
  clear_variance,
  uninstall_vehicle,
  list_tank_sizes,
  add_walk_in_vehicle,
  get_mpesa_payments,
  add_mpesa_transaction,
  activate_mpesa,
  deactivate_mpesa,
  view_sale_payments,
  get_vehicle_fueling_events,
  get_vehicle_by_customer_code,
  upload_sales_data,
  set_credit_limit,
  mpesa_code_usage,
  adjust_stock_take,
  set_customer_credit_limit,
  set_discount,
  transfer_vehicle_balance
} from "../../../api/otogas";

import {
  ADD_CUSTOMER,
  CUSTOMER_ERROR,
  GET_CUSTOMERS,
  GET_CUSTOMER,
  LIST_VEHICLES,
  SEARCH_CUSTOMER,
  CLEAR_NOTIFICATION,
  LIST_PRODUCTS,
  LIST_SALES,
  LIST_PAYMENT_TYPES,
  LIST_APP_PAYMENT_TYPES,
  LIST_TOPUP_PAYMENT_TYPES,
  LIST_CUSTOMER_WALLETS,
  SET_VEHICLE_SUMMARY,
  CUSTOMER_WARNING,
  LIST_TANK_SIZES,
  GET_MPESA_PAYMENTS,
  LIST_SALE_PAYMENTS,
  SET_VEHICLE_FUELING_EVENTS,
  LIST_CUSTOMER_VEHICLES,
  MPESA_CODE_USAGE
} from "../../types";

const CustomerState = (props) => {
  const initialState = {
    customers: [],
    customerTotalRecords: 0,
    current: null,
    filtered: null,
    error: null,
    drivers: [],
    vehicles: [],
    vehicleTotalRecords: 0,
    notification: null,
    variance: null,
    sales: [],
    salesTotalRecords: 0,
    products: [],
    payment_types: [],
    app_payment_types: [],
    customer_balances: [],
    wallets_total_records: 0,
    vehicle_summary: [],
    tank_sizes: [],
    mpesa_payments: [],
    sale_payments: [],
    vehicle_fueling_events: [],
    customer_vehicles: {
      customer: {},
      vehicles: [],
      totalVehicles: 0,
      totalBalance: 0,
    },
    code_sales: [],
    topup_payment_types: [],
  };

  const [state, dispatch] = useReducer(CustomerReducer, initialState);

  // Get Customers
  const getCustomers = async (
    page,
    page_size,
    customerName,
    customerPhone,
  ) => {
    const res = await list_customers(
      page,
      page_size,
      customerName,
      customerPhone,
    );
    if (res.responseCode === 1) {
      dispatch({ type: GET_CUSTOMERS, payload: res.responseObject });
    }
  };

  // list products
  const listProducts = async () => {
    const res = await list_products();
    if (res.responseCode === 1) {
      dispatch({ type: LIST_PRODUCTS, payload: res.responseObject });
    }
  };



  // Create Customer
  const addCustomer = async (customer) => {
    const res = await create_customer(customer);
    console.log(res, "res");
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  // Update Customer status
  const updateCustomerStatus = async (customer) => {
    const res = await update_customer_status(customer);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  // update customer
  const updateCustomer = async (customerCode, customer) => {
    const res = await update_customer_info(customerCode, customer);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  // search customer
  //
  const searchCustomer = async (regno, station) => {
    const response = await search_customer(regno, station);
    if (response.responseCode === 1) {
      dispatch({
        type: SEARCH_CUSTOMER,
        payload: response.responseObject,
      });
    } else {
      dispatch({
        type: CUSTOMER_ERROR,
        payload: handleNotications(response),
      });
    }
  };


  // fetch vehicles
  const fetchVehicles = async (
    page,
    page_size,
    customerName,
    vehicleRegistrationNumber,
    productCode,
    status,
  ) => {
    const response = await list_vehicles(
      page,
      page_size,
      customerName,
      vehicleRegistrationNumber,
      productCode,
      status,
    );
    if (response.responseCode === 1) {
      console.log(response.responseObject, "response.responseObject");
      dispatch({ type: LIST_VEHICLES, payload: response.responseObject });
    }
    // else {
    //     dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(response) });});
    // }
  };

  // Add vehicle
  const addVehicle = async (vehicle) => {
    const response = await add_vehicle(vehicle);
    if (response.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: response.responseMessage });
    } else if (response.responseCode === 2) {
      dispatch({
        type: CUSTOMER_WARNING,
        payload: response.responseMessage,
      });
    } else {
      dispatch({
        type: CUSTOMER_ERROR,
        payload: handleNotications(response),
      });
    }
  };

  // update vehicle
  const UpdateVehicle = async (vehicle) => {
    const response = await update_vehicle(vehicle);
    if (response.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: response.responseMessage });
    } else {
      dispatch({
        type: CUSTOMER_ERROR,
        payload: handleNotications(response),
      });
    }
  };

  // search vehicle
  const searchVehicle = async (text) => {
    const response = await search_vehicle_by_reg_no(text);
    if (response.responseCode === 1) {
      dispatch({ type: GET_CUSTOMER, payload: response.responseObject });
    } else {
      dispatch({
        type: CUSTOMER_ERROR,
        payload: handleNotications(response),
      });
    }
  };

  // const searchVehicleByStationCodeandRegNo = async (stationCode, regNo) => {
  //     const response = await search_vehicle_by_reg_no(stationCode, regNo);
  //     if (response.responseCode === 1) {
  //         dispatch({ type: GET_CUSTOMER, payload: response.responseObject });
  //     } else {
  //         dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(response) });});
  //     }
  // };

  const clear_notification = () => {
    dispatch({ type: CLEAR_NOTIFICATION });
  };

  const addSale = async (formData) => {
    console.log(formData, "formData");
    const res = await add_sale(formData);
    console.log(res, "res IRIRIKK");
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  const removeSale = async (transactionCode) => {
    const res = await remove_sale(transactionCode);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  const transferSale = async (transactionCode, nozzleCode) => {
    const res = await transfer_sale_to_another_nozzle(
      transactionCode,
      nozzleCode,
    );
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  const refreshSale = async (refreshType, shiftNumber) => {
    const res = await remove_sale(refreshType, shiftNumber);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  const stokeTake = async (formData) => {
    const res = await stoke_take(formData);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  const adjustStockTake = async (formData) => {
    const res = await adjust_stock_take(formData);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  const listSales = async (
    shiftNumber,
    stationCode,
    dispenserName,
    nozzleName,
    paymentTypeName,
    startDate,
    endDate,
    pageNumber,
    pageSize,
    orderByColumn,
    isDescending
  ) => {
    const res = await list_sales(
      shiftNumber,
      stationCode,
      dispenserName,
      nozzleName,
      paymentTypeName,
      startDate,
      endDate,
      pageNumber,
      pageSize,
      orderByColumn,
      isDescending
    );
    if (res.responseCode === 1) {
      dispatch({ type: LIST_SALES, payload: res.responseObject });
    }
    else {
      dispatch({
        type: LIST_SALES, payload: {
          "totalRecords": 0,
          "pageNumber": 1,
          "pageSize": 10,
          "sales": []
        }
      });
    }
  };

  // payment types
  const listPaymentTypes = async () => {
    const res = await list_payment_types();
    if (res.responseCode === 1) {
      dispatch({ type: LIST_PAYMENT_TYPES, payload: res.responseObject });
    }
  };

  const listAppPaymentTypes = async () => {
    const res = await list_app_payment_types();
    if (res.responseCode === 1) {
      dispatch({
        type: LIST_APP_PAYMENT_TYPES,
        payload: res.responseObject,
      });
    }
  };

  const listTopupPaymentTypes = async () => {
    const res = await list_topup_types();
    if (res.responseCode === 1) {
      dispatch({
        type: LIST_TOPUP_PAYMENT_TYPES,
        payload: res.responseObject,
      });
    } else {
      dispatch({
        type: LIST_TOPUP_PAYMENT_TYPES,
        payload: [],
      });
    }
  };


  const addPaymentType = async (paymentType) => {
    const res = await add_payment_type(paymentType);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  const listCustomerBalances = async () => {
    const res = await list_customer_wallets();
    if (res.responseCode === 1) {
      dispatch({
        type: LIST_CUSTOMER_WALLETS,
        payload: res.responseObject,
      });
    }
  };

  const allCustomerBalances = async (registrationNumber, customerName, pagenumber, pageSize) => {
    const res = await all_customer_balances(registrationNumber, customerName, pagenumber, pageSize);
    if (res.responseCode === 1) {
      dispatch({
        type: LIST_CUSTOMER_WALLETS,
        payload: res.responseObject,
      });
    }
  };

  const topUpCustomerBalance = async (formData) => {
    console.log(formData, "formData");
    const res = await top_up_customer_balance(formData);
    console.log(res, "res");
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  const addProduct = async (product) => {
    const res = await add_product(product);
    console.log(res, "res");
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  const changeStationPrice = async (formData) => {
    const res = await change_station_price(formData);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  const setGlobalPricing = async (product, price) => {
    const res = await set_global_pricing(product, price);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  const getVehicleSummary = async (regNo, startDate, endDate) => {
    const res = await get_vehicle_summary(regNo, startDate, endDate);
    console.log(res, "res ??????");
    if (res.responseCode === 1) {
      dispatch({
        type: SET_VEHICLE_SUMMARY,
        payload: res.responseObject,
      });
    }
  };

  const updateVehicleStatus = async (vehicleCode, status) => {
    const res = await update_vehicle_status(vehicleCode, status);
    console.log(res, "res");
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  const clearVariance = async (type, shiftNumber) => {
    console.log(type, shiftNumber, "type, shiftNumber");
    const res = await clear_variance(type, shiftNumber);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  const uninstallVehicle = async (vehicleCode) => {
    const res = await uninstall_vehicle(vehicleCode);
    console.log(res, "res");
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };
  const transferVehicle = async (formData) => {
    const res = await transfer_vehicle(formData);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  const transferVehicleBalance = async (formData) => {
    const res = await transfer_vehicle_balance(formData);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };


  const listTankSizes = async () => {
    const res = await list_tank_sizes();
    if (res.responseCode === 1) {
      dispatch({ type: LIST_TANK_SIZES, payload: res.responseObject });
    }
  };

  const addWalkinVehicle = async (vehicle) => {
    const res = await add_walk_in_vehicle(vehicle);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  const getMpesaPayments = async (tillNumber, startDate, endDate, transId) => {
    const res = await get_mpesa_payments(
      tillNumber,
      startDate,
      endDate,
      transId,
    );
    console.log(res, "res");
    console.log(tillNumber)
    console.log(startDate)
    console.log(endDate)
    console.log(transId)
    if (res.responseCode === 1) {
      dispatch({ type: GET_MPESA_PAYMENTS, payload: res.responseObject });
    }
    else {
      dispatch({ type: GET_MPESA_PAYMENTS, payload: [] });
    }
  };

  const addMpesaTransaction = async (formData) => {
    const res = await add_mpesa_transaction(formData);
    console.log(res, "res");
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  // activate mpesa code
  const activateMpesaCode = async (transId) => {
    const res = await activate_mpesa(transId);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };


  // deactivate mpesa code
  const deactivateMpesaCode = async (transId) => {
    const res = await deactivate_mpesa(transId);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };



  const viewSalePayments = async (saleId) => {
    const res = await view_sale_payments(saleId);
    if (res.responseCode === 1) {
      dispatch({ type: LIST_SALE_PAYMENTS, payload: res.responseObject });
    }
  };

  const getVehicleFuelingEvents = async (vehicleCode) => {
    const res = await get_vehicle_fueling_events(vehicleCode);
    if (res.responseCode === 1) {
      dispatch({
        type: SET_VEHICLE_FUELING_EVENTS,
        payload: res.responseObject,
      });
    }
  };

  const getCustomerVehicles = async (customerCode) => {
    const res = await get_vehicle_by_customer_code(customerCode);
    if (res.responseCode === 1) {
      dispatch({
        type: LIST_CUSTOMER_VEHICLES,
        payload: res.responseObject,
      });
    }
  };



  const uploadSalesData = async (file, type) => {
    console.log(type, "type");
    const res = await upload_sales_data(file, type);

    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: res.responseMessage });
    }
  };

  const setCreditLimit = async (formData) => {
    const res = await set_credit_limit(formData);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  const setDiscount = async (formData) => {
    const res = await set_discount(formData);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  const setCustomerCreditLimit = async (formData) => {
    const res = await set_customer_credit_limit(formData);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_CUSTOMER, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: CUSTOMER_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: CUSTOMER_ERROR, payload: handleNotications(res) });
    }
  };

  const mpesaCodeUsage = async (transId) => {
    const res = await mpesa_code_usage(transId);
    if (res.responseCode === 1) {
      dispatch({ type: MPESA_CODE_USAGE, payload: res.responseObject });
    }
    else {
      dispatch({ type: MPESA_CODE_USAGE, payload: [] });
    }
  }

  return (
    <CustomerContext.Provider
      value={{
        customers: state.customers,
        customerTotalRecords: state.customerTotalRecords,
        filtered: state.filtered,
        error: state.error,
        current: state.current,
        drivers: state.drivers,
        vehicles: state.vehicles,
        vehicleTotalRecords: state.vehicleTotalRecords,
        notification: state.notification,
        variance: state.variance,
        sales: state.sales,
        salesTotalRecords: state.salesTotalRecords,
        payment_types: state.payment_types,
        app_payment_types: state.app_payment_types,
        products: state.products,
        customer_balances: state.customer_balances,
        wallets_total_records: state.wallets_total_records,
        vehicle_summary: state.vehicle_summary,
        tank_sizes: state.tank_sizes,
        mpesa_payments: state.mpesa_payments,
        sale_payments: state.sale_payments,
        vehicle_fueling_events: state.vehicle_fueling_events,
        customer_vehicles: state.customer_vehicles,
        code_sales: state.code_sales,
        topup_payment_types: state.topup_payment_types,
        getCustomers,
        addCustomer,
        updateCustomerStatus,
        updateCustomer,
        searchCustomer,
        addVehicle,
        fetchVehicles,
        UpdateVehicle,
        updateVehicleStatus,
        searchVehicle,
        listProducts,
        clear_notification,
        addSale,
        removeSale,
        refreshSale,
        transferSale,
        stokeTake,
        listSales,
        listPaymentTypes,
        listAppPaymentTypes,
        listCustomerBalances,
        allCustomerBalances,
        topUpCustomerBalance,
        addProduct,
        addPaymentType,
        changeStationPrice,
        setGlobalPricing,
        getVehicleSummary,
        clearVariance,
        uninstallVehicle,
        transferVehicle,
        listTankSizes,
        addWalkinVehicle,
        getMpesaPayments,
        addMpesaTransaction,
        viewSalePayments,
        getVehicleFuelingEvents,
        getCustomerVehicles,
        uploadSalesData,
        setCreditLimit,
        setDiscount,
        setCustomerCreditLimit,
        mpesaCodeUsage,
        activateMpesaCode,
        deactivateMpesaCode,
        adjustStockTake,
        transferVehicleBalance,
        listTopupPaymentTypes
        // searchVehicleByStationCodeandRegNos
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerState;
