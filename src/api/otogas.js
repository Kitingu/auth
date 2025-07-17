import axios from "./index";

// lists
export const list_customers = async (
  page,
  page_size,
  customerName,
  customerPhone,
) => {
  // otogas/Customer/GetAllCustomers/1/100?customerName=100&customerPhone=099
  try {
    const res = await axios.get(
      `/otogas/Customer/GetAllCustomers/${page}/${page_size}?customerName=${customerName}&customerPhone=${customerPhone}`,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const list_products = async () => {
  try {
    const res = await axios.get("/otogas/Setup/GetProducts");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const list_stations = async () => {
  try {
    const res = await axios.get("/otogas/Station/GetAllStations");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// list vehicles
export const list_vehicles = async (
  page_size,
  page,
  customerName,
  vehicleRegistrationNumber,
  productCode,
  status,
) => {
  console.log(
    page,
    page_size,
    customerName,
    vehicleRegistrationNumber,
    productCode,
    status,
  );
  try {
    // otogas/Customer/GetAllVehicles/10/1?customerName=name&vehicleRegistrationNumber=name&productCode=1&status=true'
    const res = await axios.get(
      `/otogas/Customer/GetAllVehicles/${page}/${page_size}?customerName=${customerName}&vehicleRegistrationNumber=${vehicleRegistrationNumber}&productCode=${productCode}&status=${status}`,
    );
    console.log(res, "res");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// tills
export const list_tills = async () => {
  try {
    const res = await axios.get("/payments/Payments/GetAllTills");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const add_till = async (formData) => {
  try {
    const res = await axios.post("/payments/Payments/AddTill", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const update_till = async (formData) => {
  try {
    const res = await axios.post("/payments/Payments/UpdateTill", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const assign_till_to_dispenser = async (formData) => {
  try {
    const res = await axios.post(
      "/payments/Payments/AssignTillToDispenser",
      formData,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const change_till_status = async (tillId, status) => {
  try {
    const res = await axios.post(
      `/otogas/UpdateTillStatus?tillId=${tillId}&IsActive=${status}`,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// customer

export const create_customer = async (formData) => {
  try {
    const res = await axios.post("/otogas/Customer/AddCustomer", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const update_customer_status = async (customer_id, status) => {
  try {
    const res = await axios.post(
      `/otogas/UpdateCustomerStatus?customerId=${customer_id}&IsActive=${status}`,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const update_customer_info = async (customerCode, formData) => {
  try {
    const res = await axios.post(
      `/otogas/Customer/UpdateCustomer?customerCode=${customerCode}`,
      formData,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const search_customer = async (search_customer) => {
  // https://os.protoenergy.com/otogas/Customer/SearchVehicle?VehicleRegNo=KBR%20450L&StationCode=0001' \
  try {
    const res = await axios.post(
      `/otogas/Customer/SearchVehicle?VehicleRegNo=${search_customer.regno}&StationCode=${search_customer.station}`,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// vehicle
export const add_vehicle = async (formData) => {
  try {
    const res = await axios.post("/otogas/Customer/AddVehicle", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const update_vehicle = async (formData) => {
  try {
    const res = await axios.patch(
      "/otogas/Customer/UpdateVehicle",
      formData,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const update_vehicle_status = async (vehicleCode, status) => {
  //    otogas/Customer/DeactivateVehicle?vehicleCode=00'
  // otogas/Customer/ActivateVehicle?vehicleCode=2340'

  if (status === "activate") {
    try {
      const res = await axios.post(
        `/otogas/Customer/ActivateVehicle?vehicleCode=${vehicleCode}`,
      );
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  } else {
    try {
      const res = await axios.post(
        `/otogas/Customer/DeactivateVehicle?vehicleCode=${vehicleCode}`,
      );
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
};

export const uninstall_vehicle = async (vehicleCode) => {
  console.log(vehicleCode, "vehicleCode");
  try {
    const res = await axios.post(
      `/otogas/Customer/MarkVehicleAsUnInstalled?vehicleCode=${vehicleCode}`,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
export const search_vehicle_by_reg_no = async (reg_no) => {
  try {
    const res = await axios.post(
      `/otogas/SearchVehicleByRegNumber?vehicleRegistrationNumner=${reg_no}`,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const transfer_vehicle = async (formData) => {
  console.log(formData, "formdata");
  try {
    const res = await axios.post(
      "/otogas/Customer/TransferVehicle",
      formData,
    );
    console.log(res, "res");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// orders

export const create_order = async (formData) => {
  try {
    const res = await axios.post("/otogas/AddOrder", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const add_plan = async (formData) => {
  try {
    const res = await axios.post("/otogas/AddPlan", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const cancel_delivery_plan = async (deliveryPlanId) => {
  try {
    const res = await axios.post(`/otogas/CancelDeliveryPlan`, {
      deliveryPlanId,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const plan_assignment = async (formData) => {
  try {
    const res = await axios.put("/otogas/PlanAssignments", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const attach_order = async (deliveryPlanId, orderIds) => {
  try {
    const res = await axios.post("/otogas/AttachOrder", {
      deliveryPlanId,
      orderIds,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const list_orders = async () => {
  try {
    const res = await axios.get("/bulk/Bulk/BulkOrders");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// loading
export const new_loading = async (formData) => {
  try {
    const res = await axios.post("/otogas/Loading", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const offloading = async (formData) => {
  try {
    const res = await axios.post("/otogas/Offloading", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deliverorder = async (formData) => {
  try {
    const res = await axios.post("/otogas/DeliverOrder", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const remove_order = async (orderId) => {
  try {
    // stringify the order id

    const res = await axios.delete("/otogas/RemoveOrder", [
      JSON.stringify(orderId),
    ]);

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// approvals
export const finance_approval = async (formData) => {
  try {
    const res = await axios.post("/otogas/FinanceApproval", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// manager approval
export const manager_approval = async (formData) => {
  try {
    const res = await axios.post("/otogas/ManagerApproval", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// stations

export const add_stations = async (formData) => {
  try {
    const res = await axios.post("/otogas/Station/AddStation", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const update_station = async (formData) => {
  try {
    const res = await axios.post("/otogas/UpdateStation", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const update_station_status = async (stationCode, status) => {
  try {
    const res = await axios.post(
      `/otogas/UpdateStationStatus?stationCode=${stationCode}&isActive=${status}`,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const add_station_tank = async (formData) => {
  try {
    const res = await axios.post("/otogas/Station/AddTank", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const list_station_tanks = async (stationCode) => {
  try {
    const res = await axios.get(
      `/otogas/Station/StationTank?stationCode=${stationCode}`,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const update_station_tank = async (formData) => {
  try {
    const res = await axios.post("/otogas/UpdateStationTank", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const list_tanks = async () => {
  try {
    const res = await axios.get("/otogas/Station/GetAllTanks");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// export const list_tanks = async (station) => {
//     try {
//         const res = await axios.get(`/otogas/StationTanks?stationCode=${station}`);
//         return res.data;
//     }
//     catch (error) {
//         return error.response.data;
//     }
// }

export const search_station = async (stationCode) => {
  try {
    const res = await axios.get(
      `/otogas/SearchStation?stationCode=${stationCode}`,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// station nozzles
export const add_nozzle = async (formData) => {
  try {
    const res = await axios.post("/otogas/Station/AddNozzle", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const update_nozzle = async (formData) => {
  try {
    const res = await axios.post("/otogas/UpdateStationNozzle", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const list_nozzles = async (station) => {
  try {
    const res = await axios.get(`/otogas/Station/GetAllNozzles`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// station dispensers
export const add_station_dispenser = async (formData) => {
  try {
    const res = await axios.post("/otogas/Station/AddDispenser", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const update_station_dispenser = async (formData) => {
  try {
    const res = await axios.post(
      "/otogas/UpdateStationDispenser",
      formData,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const list_dispensers = async () => {
  try {
    const res = await axios.get(`/otogas/Station/GetAllDispensers`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const list_station_dispensers = async (stationCode) => {
  try {
    const res = await axios.get(
      `/otogas/Station/ListStationDispensers?stationCode=${stationCode}`,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// list dispenser nozzles
export const list_dispenser_nozzles = async (dispenserCode) => {
  try {
    const res = await axios.get(
      `/otogas/Station/ListDispenserNozzles?dispenserCode=${dispenserCode}`,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const assign_user_to_dispenser = async (formData) => {
  console.log(formData, "formdata");
  try {
    const res = await axios.post(
      "/otogas/Station/AssignDispenser",
      formData,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const unassign_user_to_dispenser = async (userCode) => {
  try {
    const res = await axios.post(
      `/otogas/Station/UnAssignDispenser?userCode=${userCode}`,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

//  sales
export const add_sale = async (formData) => {
  try {
    const res = await axios.post("/otogas/Sales/AddMisingSale", formData);
    console.log(res, "res");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const transfer_sale_to_another_nozzle = async (
  transactionCode,
  nozzleCode,
) => {
  // otogas/Sales/TransferSaleToAnotherNozzle?transactionCode=009&nozzleCode=3445'
  try {
    const res = await axios.post(
      `/otogas/Sales/TransferSaleToAnotherNozzle?transactionCode=${transactionCode}&nozzleCode=${nozzleCode}`,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const reverse_a_sale = async (transactionCode) => {
  try {
    const res = await axios.post(
      `/otogas/Sales/ReverseASale?transactionCode=${transactionCode}`,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const remove_sale = async (saleId) => {
  try {
    const res = await axios.post(
      `/otogas/Sales/ReverseasaleAsync?saleid=${saleId}`,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const clear_variance = async (type, shiftNumber) => {
  if (type === "defer") {
    try {
      const res = await axios.post(
        `/otogas/Sales/DeferVariance?shiftNumber=${shiftNumber}`,
      );
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  } else if (type === "write_off") {
    try {
      const res = await axios.post(
        `/otogas/Sales/WriteOffVariance?shiftNumber=${shiftNumber}`,
      );
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
};

export const stoke_take = async (formData) => {
  try {
    const res = await axios.post("/otogas/Stock/StokeTake", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// variance

// otogas/Stock/Shiftvariances
export const shift_variance = async () => {
  try {
    const res = await axios.get("/otogas/Stock/AllVariances");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// list sales
export const list_sales = async (
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
  isDescending,
) => {
  try {
    // otogas/Sales/AllSales?shiftNumber=12&dispenserName=23&nozzleName=23&paymentTypeName=23&startDate=32&endDate=32&pageNumber=1&pageSize=10' \
    console.log("request", await axios.get(
      `/otogas/Sales/AllSales?stationCode=${stationCode}&shiftNumber=${shiftNumber}&dispenserName=${dispenserName}&nozzleName=${nozzleName}&paymentTypeName=${paymentTypeName}&startDate=${startDate}&endDate=${endDate}&pageNumber=${pageNumber}&pageSize=${pageSize}&orderByColumn=${orderByColumn}&isDescending=${isDescending}`
    ))

    const res = await axios.get(
      `/otogas/Sales/AllSales?stationCode=${stationCode}&shiftNumber=${shiftNumber}&dispenserName=${dispenserName}&nozzleName=${nozzleName}&paymentTypeName=${paymentTypeName}&startDate=${startDate}&endDate=${endDate}&pageNumber=${pageNumber}&pageSize=${pageSize}&orderByColumn=${orderByColumn}&isDescending=${isDescending}`,
    );
    console.log(res, "this is the response");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const list_payment_types = async () => {
  try {
    const res = await axios.get("/otogas/Sales/AllPaymentTypes");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const list_app_payment_types = async () => {
  try {
    const res = await axios.get("/otogas/Sales/MobileAppPaymentTypes");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const list_topup_types = async () => {
  try {
    const res = await axios.get("/otogas/Sales/TopUpTypes");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export const add_payment_type = async (formData) => {
  try {
    const res = await axios.post("/otogas/Setup/AddPaymentType", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const list_customer_wallets = async () => {
  try {
    const res = await axios.get("/otogas/Sales/GetAllCustomerBalances");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const all_customer_balances = async (registrationNumber, customerName, pagenumber, pageSize) => {
  try {

    const res = await axios.post(`/otogas/Sales/get-all-customer-balances-sql?registrationNumber=${registrationNumber}&customerName=${customerName}&pageNumber=${pagenumber}&pageSize=${pageSize}`);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}

export const download_cutomer_wallet_topup_history = async (from, to) => {
  // otogas/Sales/WalletTopUps?dateFrom=1&dateTo=1'
  console.log(to, from, "to, from");

  const url = `otogas/Sales/WalletTopUps?dateFrom=${from}&dateTo=${to}`
  return downloadFile(url, "WalletTopUps.xlsx")

}

export const top_up_customer_balance = async (formData) => {
  console.log(formData, "formdata ++++");
  try {
    const res = await axios.post(
      "/otogas/Sales/TopUpCustomerWallet",
      formData,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const set_global_pricing = async (productCode, newPrice) => {
  // otogas/Setup/GlobalPriceChange?productCode=02&newPrice=1000'
  try {
    const res = await axios.get(
      `/otogas/Setup/GlobalPriceChange?productCode=${productCode}&newPrice=${newPrice}`,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const schedule_price_change = async (formData) => {
  try {
    const res = await axios.post("/otogas/Setup/PriceSchedule", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const change_station_price = async (formData) => {
  try {
    const res = await axios.post("/otogas/Setup/ChangePrice", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const add_product = async (product) => {
  try {
    const res = await axios.post("/otogas/Setup/AddProduct", product);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const get_vehicle_summary = async (vehicleCode, startDate, endDate) => {
  // otogas/Sales/GetCustomerStatement/12621/2024-08-29/2024-09-29
  // otogas/Sales/GetCustomerStatement/12621/2024-08-28/2024-09-28
  console.log(
    vehicleCode,
    startDate,
    endDate,
    "vehicleCode, startDate, endDate",
  );
  console.log(
    `/otogas/Sales/GetCustomerStatement/${vehicleCode}/${startDate}/${endDate}`,
  );
  try {
    const res = await axios.post(
      `/otogas/Sales/GetCustomerStatement/${vehicleCode}/${startDate}/${endDate}`,
    );
    console.log(res, "res++++");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const get_dashboard_data = async () => {
  try {
    const res = await axios.get("/otogas/Sales/GetDashBoardData");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const set_initial_stock = async (formData) => {
  try {
    console.log(formData, "formData");
    const res = await axios.post("/otogas/Stock/Initialstocktake", {
      readings: [formData],
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const searchVehicle = async (stationCode, vehicleRegNo) => {
  try {
    const res = await axios.get(
      `/otogas/Customer/SearchVehicle/${stationCode}/${vehicleRegNo}`,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const searchEmployee = async (userCode) => {
  console.log(userCode, "usercode");
  try {
    const response = await axios.get(
      `/otogas/Sales/GetEmployeePrice?userCode=${userCode}`,
    );
    console.log(response, "response");
    return response.data;
  } catch (error) {
    console.error("Error during employee search:", error);
    return (
      error.response?.data || {
        error: "An error occurred while searching the employee",
      }
    );
  }
};

export const validatePaymentReference = async (dispenserCode, transId) => {
  // payments/Payments/ConfirmPayment/SIF2O6HUMS/D001
  try {
    const response = await axios.post(
      `/payments/Payments/ConfirmPayment/${transId}/${dispenserCode}`,
    );
    console.log(response, "response 09000");
    return response.data;
  } catch (error) {
    console.error("Error during payment validation:", error);
    return (
      error.response?.data || {
        error: "An error occurred while validating the payment",
      }
    );
  }
};


// {
//   "responseObject": {
//     "amount": 1000,
//     "voucherNo": "VCH12345",
//     "isUsed": true,
//     "vehicleCode": "20219",
//     "expiryDate": "2025-12-31T00:00:00",
//     "id": 1,
//     "dateCreated": "2025-02-26T15:48:04.48",
//     "userCode": "00004"
//   },
//   "responseCode": 1,
//   "responseMessage": "Voucher is Valid"
// }

export const validateVoucher = async (voucherNo) => {
  // curl -X 'GET' \
  // 'https://os.protoenergy.com/otogas/Sales/ValidateVoucher?VoucherNo=VCH12345' \
  // -H 'accept: */*' \

  try {
    const response = await axios.get(
      `/otogas/Sales/ValidateVoucher?VoucherNo=${voucherNo}`,
    );
    console.log(response, "response 09000");
    return response.data;
  } catch (error) {
    console.error("Error during voucher validation:", error);
    return (
      error.response?.data || {
        error: "An error occurred while validating the voucher",
      }
    );
  }
};


export const validateShopPaymentReference = async (transId) => {
  //  'https://os.protoenergy.com/payments/Payments/ConfirmGaragePayment/12' 

  try {
    const response = await axios.post(
      `/payments/Payments/ConfirmGaragePayment/${transId}`,
    );
    console.log(response, "response 09000");
    return response.data;
  } catch (error) {
    console.error("Error during payment validation:", error);
    return (
      error.response?.data || {
        error: "An error occurred while validating the payment",
      }
    );
  }
};

export const list_station_assignments = async (stationCode) => {
  console.log(stationCode, "stationCode");
  try {
    const res = await axios.get(
      `/otogas/Station/GetAllDispenserAssignments/${stationCode}`,
    );
    console.log(res, "res");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const list_tank_sizes = async () => {
  try {
    const res = await axios.get("/otogas/Customer/GetTankSizes");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const register_pda = async (formData) => {
  console.log(formData, "formData");

  try {
    const res = await axios.post(
      `/otogas/Setup/RegisterPDA?deviceName=${formData.deviceName}&deviceIMEI=${formData.deviceIMEI}&deviceSerialNumber=${formData.deviceSerialNumber}&deviceModel=${formData.deviceModel}&dispensercode=${formData.dispenserCode}`,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const add_walk_in_vehicle = async (formData) => {
  try {
    const res = await axios.post(
      "/otogas/Customer/RegisterNonOtogasVehicle",
      formData,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const get_mpesa_payments = async (
  tillNumber,
  startDate,
  endDate,
  transId,
) => {
  // payments/Payments/MpesaTransactions?tillNumber=6055280&dateFrom=1&dateTo=2&transId=3
  console.log(tillNumber, startDate, endDate, transId, "tillNumber, startDate, endDate, transId");
  try {
    const res = await axios.get(
      `/payments/Payments/MpesaTransactions?tillNumber=${tillNumber}&dateFrom=${startDate}&dateTo=${endDate}&transId=${transId}`,
    );
    console.log(res, "res");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const activate_mpesa = async (transId) => {
  try {
    const res = await axios.put(
      `/payments/Payments/ActivateMpesa?transId=${transId}`,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deactivate_mpesa = async (transId) => {
  try {
    const res = await axios.put(
      `/payments/Payments/BlockMpesa?transId=${transId}`,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// /payments/Payments/AddMpesaTransaction, payload
export const add_mpesa_transaction = async (formData) => {
  try {
    const res = await axios.post(
      "/payments/Payments/AddMpesaTransaction",
      formData,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const download_vehicle_statement = async (vehicleCode) => {
  // https://localhost:44369/otogas/Sales/export-customer-transactions/12617

  const url = `/otogas/Sales/export-customer-transactions/${vehicleCode}`
  return downloadFile(url, "vehicle_statement.xlsx");

}

export const download_vehicle_statement_pdf = async (vehicleCode) => {

  const url = `/otogas/Sales/export-customer-transactions-pdf/${vehicleCode}`
  return downloadFile(url, "vehicle_statement.pdf", "application/pdf");


};

export const download_customer_balances = async () => {

  const url = "/otogas/Sales/export-customer-wallet-balances"
  return downloadFile(url, "customer_balances.xlsx");
};

export const download_customer_statement = async (customerCode, type) => {
  const url = type === "pdf"
    ? `/otogas/Sales/export-customer-transactions-pdf/${customerCode}`
    : `/otogas/Sales/CustomerAllVehiclesStatement/${customerCode}`;

  const file_extension = type === "pdf" ? "pdf" : "xlsx";

  downloadFile(url, `customer_statement.${file_extension}`, `application/${file_extension}`);

};

export const upload_sales_data = async (file, type) => {
  const formData = new FormData();
  formData.append("file", file);

  // curl -X 'POST' \
  // 'https://os.protoenergy.com/otogas/Sales/UploadSalesData?topUpType=1' \
  // -H 'accept: */*' \
  // -H 'Content-Type: multipart/form-data' \
  // -F 'file='

  try {
    const res = await axios.post(
      `/otogas/Sales/UploadSalesData?topUpType=${type}`,
      formData,
      {
        headers: {
          accept: "*/*",
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const view_sale_payments = async (saleId) => {
  // otogas/Sales/ViewPayments/QO4LDJAMJRO93
  console.log(saleId, "saleId");
  try {
    const res = await axios.get(`/otogas/Sales/ViewPayments/${saleId}`);
    console.log(res, "res");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const get_vehicle_fueling_events = async (vehicleCode) => {
  try {
    const res = await axios.get(
      `/otogas/Sales/GetFuelingEventsForVehicle/${vehicleCode}`,
    );
    console.log(res, "res");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const get_vehicle_by_customer_code = async (vehicleCode) => {
  try {
    const res = await axios.get(
      `/otogas/Customer/GetVehicleByCustomerCode?customerCode=${vehicleCode}`,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const downloadFile = async (url,
  fileName = "download",
  fileType = "application/octet-stream",
  method = "GET",
  data = null) => {
  // try {
  //   const res = await axios.get(url, {
  //     responseType: "blob",
  //     validateStatus: function (status) {
  //       return status < 500; // Resolve for statuses below 500
  //     },
  //   });

  try {
    const res = await axios({
      url,
      method,
      data,
      responseType: "blob",
      validateStatus: (status) => status < 500
    });

    console.log(res, "res");

    // Handle status codes
    if (res.status === 200) {
      const blob = new Blob([res.data], { type: fileType });
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", fileName);

      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } else if (res.status === 404) {
      console.log("File not found");
      return "File not found";
    }

    else if (res.status === 403) {

      return "You are not authorized to download this file";
    }

    else {

      return `Error: ${res.statusText}`;
    }
  } catch (error) {

    return error.response?.data || error.message;
  }
};

export const download_sales_per_day = (date) => {
  const url = `/otogas/Sales/ExportDailySales?date=${date}`;
  return downloadFile(url, `daily_sales_${date}.xlsx`);
};


export const download_monthly_sales = async (month, year) => {
  // /otogas/Sales/ExportMonthlySales2/3'
  console.log(month, year, "month, year");
  const url = `/otogas/Sales/ExportMonthlySales/${month}/${year}`

  return downloadFile(url, `monthly_sales_${month}_${year}.xlsx`);

};

export const set_credit_limit = async (formData) => {
  try {
    const res = await axios.post(
      "/otogas/Customer/UpdateCreditLimit",
      formData,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const set_discount = async (formData) => {
  try {
    const res = await axios.post(
      "/otogas/Customer/CustomerDiscount",
      formData,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};


export const set_customer_credit_limit = async (formData) => {
  console.log(formData, "formData");
  try {
    const res = await axios.post(
      "/otogas/Customer/CustomerCreditLimit",
      formData,
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export const mpesa_code_usage = async (mpesaCode) => {
  try {
    const res = await axios.get(
      `/payments/Payments/GetMpesaCodeUsage?transId=${mpesaCode.trim()}`
    );
    console.log(res, "kskkdkfekk");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
  // 
}

export const export_all_customers = async () => {
  const url = "/otogas/Customer/export-all-customers";
  return downloadFile(url, "all_customers.xlsx");
}

export const get_totalizer_readings = async (date) => {
  // try {otogas/Stock/GetTotalizerReadings/2024-10-20'
  try {
    const res = await axios.get(`/otogas/Stock/GetTotalizerReadings/${date}`);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}

export const adjust_stock_take = async (formData) => {
  try {
    const res = await axios.post("/otogas/Stock/AdjustStockTake", formData);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}

export const transfer_vehicle_balance = async (formData) => {
  try {
    const res = await axios.post("/otogas/Sales/TransferWalletAmount", formData);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}

export const exportVariancesReport = async () => {
  try {
    const url = "/otogas/Stock/ExportVarianceReport"
    downloadFile(url, "variance_report.xlsx");
  }
  catch (error) {
    return error.response.data;
  }
}

export const messageBalance = async (sender) => {
  // otogas/Messaging/GetCreditBalance?sender=Otogas
  try {
    const res = await axios.get(`/otogas/Messaging/GetCreditBalance?sender=${sender}`);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}

export const download_messages = async (sender, batchNumber, startDate, endDate) => {
  // otogas/Messaging/DownloadBulkMessages?sender=otogas&batchNumber=1&startDate=1&endDate=1' 

  try {
    const url = `/otogas/Messaging/DownloadBulkMessages?sender=${sender}&batchNumber=${batchNumber}&startDate=${startDate}&endDate=${endDate}`;
    downloadFile(url, "messages.xlsx");
  }
  catch (error) {
    return error.response.data;
  }
}

export const list_messages = async (page, size, sender) => {
  // otogas/Messaging/GetBulkMessages?page=1&size=10&sender=Otogas

  try {
    const res = await axios.post(`/otogas/Messaging/GetBulkMessages?page=${page}&size=${size}&sender=${sender}`);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}

// otoshop
export const list_otoshop_products = async () => {
  try {
    const res = await axios.get("/OtoShop/GetShopItems");
    console.log(res, "res");
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}

export const add_shop_items = async (formData) => {

  try {
    const res = await axios.post("/OtoShop/AddShopItems", formData);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}


// update shop items
export const update_shop_items = async (formData) => {
  try {
    const res = await axios.put("/OtoShop/UpdateShopItems", formData);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}


// add paymernt method
export const add_payment_method = async (formData) => {
  // {
  //   "paymentMethod": "Mpesa"
  // }
  try {
    const res = await axios.post("/OtoShop/AddPaymentMethods", formData);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}

export const make_sale = async (formData) => {
  // OtoShop/AddOtoshopSal
  try {
    const res = await axios.post("/OtoShop/AddOtoshopSale", formData);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}

// OtoShop/GetShopSales' 
export const list_otoshop_sales = async (pageNumber, pageSize, DateCreated, ItemCode) => {
  // 'https://os.protoenergy.com/OtoShop/GetShopSales?pageNumber=1&pageSize=1&DateCreated=2025-01-27&ItemCode=002' \
  try {
    const res = await axios.get(`/OtoShop/GetShopSales?pageNumber=${pageNumber}&pageSize=${pageSize}&DateCreated=${DateCreated}&ItemCode=${ItemCode}`);
    console.log(res, "thso")
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}

// /OtoShop/GetPaymentMethods' 
export const list_payment_methods = async () => {
  try {
    const res = await axios.get("/OtoShop/GetPaymentMethods");
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}

// 'https://os.protoenergy.com/OtoShop/GetOtoShopSetups' \
export const list_shop_setups = async () => {
  try {
    const res = await axios.get("/OtoShop/GetOtoShopSetups");
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}

// curl -X 'POST' \
// 'https://os.protoenergy.com/OtoShop/validate-consumption?vehicleCode=004&itemCode=345' \
// -H 'accept: */*' \


export const validate_consumption = async (vehicleCode, itemCode) => {
  try {
    const res = await axios.post(`/OtoShop/validate-consumption?vehicleCode=${vehicleCode}&itemCode=${itemCode}`);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}

// curl -X 'POST' \
//   'https://os.protoenergy.com/OtoShop/add-update-otoshop-setup' \
//   -H 'accept: */*' \
//   -H 'Authorization: Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJVbmlxdWVJZCI6IjY4YTk0MDJhLTQyNzYtNDg5Ni04MjBlLWE3ZjBhMTFmNTdiNyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiNWNjN2UzOTItMDZiMi00ZDNlLTkwOTctYmEyZTg5ZDc5ODc0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiQmVuZWRpY3QiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdXJuYW1lIjoiS2l0aW5ndSIsInVzZXJuYW1lIjoiQm13ZW5kd2FAcHJvdG9lbmVyZ3kuY29tIiwiaWQiOiI1Y2M3ZTM5Mi0wNmIyLTRkM2UtOTA5Ny1iYTJlODlkNzk4NzQiLCJOYW1lIjoiQmVuZWRpY3QgTXdlbmR3YSBLaXRpbmd1IiwiUGF5cm9sbE51bWJlciI6IktBQkMzODI3IiwiUGhvbmVOdW1iZXIiOiIrMjU0NzE1MzU3ODY3IiwiVXNlckNvZGUiOiIwMDAwNCIsIkVtYWlsIjoiYm13ZW5kd2FAcHJvdG9lbmVyZ3kuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIkNhbiBVcGRhdGUgQ3VzdG9tZXIgRGV0YWlscyIsIkNhbiBWaWV3IEFsbCBWYXJpYW5jZXMiLCJDYW4gUGVyZm9ybSBGaW5hbmNlIEFwcHJvdmFsIiwiQ2FuIEFjdGl2YXRlIE1wZXNhIENvZGUiLCJDYW4gQWRkIEEgQ3VzdG9tZXIiLCJDYW4gVmlldyBUYW5rcyBJbiBBIFN0YXRpb24iLCJDYW4gRGVmZXIgQSBWYXJpYW5jZSIsIkNhbiBBZGQgUHJpY2UiLCJDYW4gQWRkIEEgUGF5bWVudCBNZXRob2QiLCJDYW4gQWRkIEN1c3RvbWVyIiwiQ2FuIEFzc2lnbiBBIFVzZXIgVG8gQSBSb2xlIiwiQ2FuIEFkZCBBIFRpbGwiLCJDYW4gVXBkYXRlIEEgVGlsbCIsIkNhbiBWaWV3IEJ1bGsgQWdlbnQgT3JkZXJzIiwiQ2FuIFZpZXcgRnVlbGluZyBFdmVudHMgRm9yIFZlaGljbGUiLCJDYW4gdmlldyBCdWxrIEN1c3RvbWVyIExpc3RpbmdzIiwiQ2FuIFVwZGF0ZSBBIE5venpsZSIsIkNhbiBBc3NpZ24gQSBEaXNwZW5zZXIiLCJDYW4gdmlldyBEZWxpdmVyZWQgT3JkZXJzIFN0YXRpc3RpY3MiLCJDYW4gVmlldyBDdXN0b21lciBMaXN0IiwiQ2FuIEFkZCBQcm9kdWN0IiwiQ2FuIFZpZXcgQWxsIERpc3BlbnNlcnMiLCJDYW4gdmlldyBEYWlseSBzYWxlcyBEYXRhIiwiQ2FuIFZpZXcgVXNlciBQZXJtaXNzaW9ucyIsIkNhbiBUb3AgVXAgQ3VzdG9tZXIgV2FsbGV0IiwiQ2FuIFZpZXcgQnVsayBDdXN0b21lciIsIkNhbiBEbyBPcmRlciBMb2FkaW5ncyBUbyBhIEJ1bGsgVmVoaWNsZSIsIkNhbiBWaWV3IFByb2R1Y3RzIiwiQ2FuIFNlYXJjaCBBIEJ1bGsgQ3VzdG9tZXIiLCJDYW4gQWRkIEEgQnVsayBWZWhpY2xlIiwiQ2FuIEFkZCBBIFJlY2lwaWVudCBUbyBBbiBFbWFpbCIsIkNhbiBWaWV3IEJ1bGsgRHJpdmVyIERhc2hCb2FyZCIsIkNhbiBTdG9jayBUYWtlIiwiQ2FuIENoYW5nZSBDb21wbGFpbiBTdGF0dXMiLCJDYW4gVmlldyBVc2VyIFJvbGVzIiwiQ2FuIEFkZCBBIE5ldyBCdWxrIE9yZGVyIiwiQ2FuIHZpZXcgZGVsaXZlcnkgcGxhbnMiLCJDYW4gQWRkIFBheW1lbnQgVHlwZSIsIkNhbiBWaWV3IEFsbCBOb3p6bGVzIiwiQ2FuIFVwZGF0ZSBCdWxrIEN1c3RvbWVyIEluZm9ybWF0aW9uIiwiQ2FuIFZpZXcgU2hpZnQgVmFyaWFuY2VzIiwiQ2FuIFVuYXNzaWduIGFuIE9yZGVyIEZyb20gQSBQbGFuIiwiQ2FuIFZpZXcgQnVsayBEcml2ZXIgT3JkZXJzIiwiQ2FuIFZpZXcgQWxsIFZlaGljbGVzIiwiQ2FuIFZpZXcgQWxsIEFwcHMiLCJDYW4gU2VhcmNoIEJ1bGsgVmVoaWNsZSIsIkNhbiBVcGRhdGUgQSBUYW5rIiwiQ2FuIFZpZXcgQ3VzdG9tZXIgU3RhdGVtZW50IiwiQ2FuIEFjdGl2YXRlIEEgVmVoaWNsZSIsIkNhbiBkZWxpdmVyIE9yZGVycyIsIkNhbiBWaWV3IEJ1bGsgVmVoaWNsZSBMaXN0aW5nIiwiQ2FuIEFkZCBBIFNhbGUiLCJDYW4gVmlldyBBbGwgVXNlcnMiLCJDYW4gUmVtb3ZlIEEgUmVjaXBpZW50IEZyb20gQW4gRW1haWwiLCJDYW4gVmlldyBTaGlmdCBTdGF0dXMiLCJDYW4gUmV2ZXJzZSBBIFNhbGUiLCJDYW4gVW5JbnN0YWxsIGEgVmVoaWNsZSIsIkNhbiBBc3NpZ24gVXNlciBBbiBBcHAiLCJDYW4gRXhwb3J0IEN1c3RvbWVycyIsIkNhbiBWaWV3IEFsbCBDb21wbGFpbnMiLCJDYW4gQWN0aXZhdGUgVXNlcnMiLCJDYW4gVHJhbnNmZXIgV2FsbGV0IEFtb3VudCBGcm9tIE9uZSBWZWhpY2xlIFRvIEFub3RoZXIiLCJDYW4gVmlldyBEYXNoQm9hcmQgRGF0YSIsIkNhbiBUcmFuc2ZlciBBIFZlaGljbGUiLCJDYW4gVmlldyBTYWxlcyBEYXRhIiwiQ2FuIFBlcmZvcm0gTWFuYWdlciBBcHByb3ZhbCIsIkNhbiBBZGQgQSBOb3p6bGUiLCJDYW4gVmlldyBBbGwgVGFua3MiLCJDYW4gRGVhY3RpdmF0ZSBVc2VycyIsIkNhbiB2aWV3IERlbGl2ZXJlZCBPcmRlcnMgU3RhdGlzdGljcyBNb250aGx5IiwiQ2FuIERlbGl2ZXIgQnVsayBPcmRlcnMiLCJDYW4gV3JpdGUgT2ZmIEEgVmFyaWFuY2UiLCJDYW4gQWRkIEJ1bGsgQ3VzdG9tZXJMb2NhdGlvbiIsIkNhbiB1cGRhdGUgY3JlZGl0IExpbWl0IiwiQ2FuIEdldCBBbGwgQnVsayBQcm9kdWN0cyIsIkNhbiBWaWV3IEN1c3RvbWVyQmFsYW5jZXMiLCJDYW4gVmlldyBBbGwgUm9sZXMiLCJDYW4gUmVtb3ZlIEEgUm9sZSBGcm9tIEEgVXNlciIsImNhbiB2aWV3IGN1c3RvbWVyIHZlaGljbGVzIiwiQ2FuIFZpZXcgQWxsIFBlcm1pc3Npb25zIiwiQ2FuIEFzc2lnbiBBIFJvbGUgVG8gQSBVc2VyIiwiQ2FuIEFkZCBBIENvbXBsYWluIiwiQ2FuIEFkZCBBIFZlaGljbGUiLCJDYW4gVmlldyBCdWxrIERyaXZlcnMiLCJDYW4gUmVtb3ZlIEFuIE9yZGVyIEZyb20gVGhlIFBsYW4iLCJDYW4gdmlldyBidWxrIE9yZGVycyIsIkNhbiBQbGFuIEJ1bGsgQXNzaWdubWVudHMgQ2hhbmdlcyIsIkNhbiBBZGQgQSBTdGF0aW9uIiwiQ2FuIEFkZCBBIG5ldyBQcm9kdWN0IiwiQ2FuIFZpZXcgQWxsIFNhbGVzIiwiQ2FuIFZpZXcgTXBlc2EgVHJhbnNhY3Rpb25zIiwiQ2FuIEFkZCBBIEJ1bGsgRGVsaXZlcnkgUGxhbiIsIkNhbiBSZWdpc3RlciBQREEgRGV2aWNlIiwiQ2FuIFZpZXcgU2FsZXMgSGlzdG9yeSIsIkNhbiBWaWV3IEFsbCBUaWxscyIsIkNhbiBWaWV3IEFsbCBVc2VycyBXaXRoIEFwcHMiLCJDYW4gVXBkYXRlIEJ1bGsgQ3VzdG9tZXIgU3RhdHVzIiwiQ2FuIFVwZGF0ZSBBIERpc3BlbnNlciIsIkNhbiBWaWV3IFJlcG9ydHMiLCJDYW4gdmlldyBNb250aGx5IHNhbGVzIERhdGEiLCJDYW4gUmVnaXN0ZXIgQSBVc2VyIiwiQ2FuIFZpZXcgQWxsIE5venpsZXMgSW4gQSBEaXNwZW5zZXIiLCJDYW4gVXBkYXRlIEEgVmVoaWNsZSIsIkNhbiBVcGRhdGUgQnVsayBDdXN0b21lciBMb2NhdGlvbiIsIkNhbiBBZGQgQSBSb2xlIiwiQ2FuIFNlYXJjaCBWZWhpY2xlIiwiQ2FuIEFkZCBBIERpc3BlbnNlciIsIkNhbiBBc3NpZ24gUGVybWlzc2lvbnMgVG8gQSBSb2xlIiwiQ2FuIEJsb2NrIE1wZXNhIENvZGUiLCJDYW4gVXBkYXRlIEEgU3RhdGlvbiIsIkNhbiBSZWdpc3RlciBOb25PdG9nYXMgVmVoaWNsZSIsIkNhbiBWaWV3IEVtYWlsIFJlY2lwaWVudHMiLCJDYW4gVmlldyBQYXltZW50cyIsIkNhbiB2aWV3IFdlYiBEYXNoQm9hcmQiLCJDYW4gT2ZmTG9hZCBBIEJ1bGsgVmVoaWNsZSIsIkNhbiBBc3NpZ24gQSBUaWxsIFRvIEEgRGlzcGVuc2VyIiwiQ2FuIFZpZXcgQnVsayBBZ2VudCBEYXNoQm9hcmQiLCJDYW4gQ2FuY2VsIEEgQnVsayBEZWxpdmVyeSBQbGFuIiwiQ2FuIFZpZXcgU2FsZXMgU2hpZnQgU3VtbWFyeSIsIkNhbiBWaWV3IFRhbmsgU2l6ZXMiLCJDYW4gRGVhY3RpdmF0ZSBBIFZlaGljbGUiLCJDYW4gVmlldyBBbGwgSW4gQSBEaXNwZW5zZXJzIiwiQ2FuIFJlbW92ZSBVc2VyIEZyb20gQW4gQXBwIiwiQ2FuIEV4cG9ydCBDdXN0b21lciBXYWxsZXQgQmFsYW5jZXMgZXhjZWwiLCJDYW4gQWRkIE1wZXNhIFRyYW5zYWN0aW9ucyIsIkNhbiBJbml0aWFsIFN0b2NrIFRha2UiLCJDYW4gVmlldyBBbGwgU3RhdGlvbnMiLCJDYW4gVmlldyBVc2VycyBBc3NpZ25lZCBUbyBBIFJvbGUiLCJDYW4gVmlldyBTdG9jayBUYWtlcyIsIkNhbiBBdHRhY2ggQSBOZXcgQnVsayBPcmRlciIsIkNhbiBVcGRhdGUgYSBCdWxrIFZlaGljbGUiLCJDYW4gVHJhbnNmZXIgU2FsZSBUbyBBbm90aGVyIE5venpsZSIsIkNhbiBWaWV3IEFsbCBEaXNwZW5zZXIgQXNzaWdubWVudHMiLCJDYW4gVmlldyBFbXBsb3llZSBQcmljZSIsIkNhbiBBZGQgQSBUYW5rIiwiQ2FuIFVuQXNzaWduIEEgRGlzcGVuc2VyIl0sImV4cCI6MTczODA4Njk5MH0.7x_EVShX7h4m16r2G-7KzSvjBgJgOgGB5g9H-YxRZYM' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "itemCode": "003",
//   "duration": 7,
//   "litresConsumed": 10
// }'


export const add_update_otoshop_setup = async (formData) => {
  try {
    const res = await axios.post("/OtoShop/add-update-otoshop-setup", formData);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}



// distributorship

// https://os.protoenergy.com/api/AuthorizationLetter/search-retailers?pageNumber=1&pageSize=10&

export const get_retailer_auth_letters = async (pageNumber, pageSize, params) => {
  console.log(
    pageNumber, pageSize, params
  )
  try {
    const res = await axios.get(`/api/AuthorizationLetter/search-retailers?pageNumber=${pageNumber}&pageSize=${pageSize}&searchparams=${params}`)
    return res.data
  }
  catch (error) {
    return error.response.data;
  }
}

// https://os.protoenergy.com/api/AuthorizationLetter/get-a-retailer?retailorCode=000002'
export const get_retailer = async (retailerCode) => {
  try {
    const res = await axios.get(`api/AuthorizationLetter/get-a-retailer?retailorCode=${retailerCode}`)
    return res.data
  }
  catch (error) {
    return error.response.data;
  }
}

// api/AuthorizationLetter/get-all-retailers?pageNumber=1&pageSize=10'

export const get_all_retailers = async (pageNumber, pageSize) => {
  try {
    const res = await axios.get(`/api/AuthorizationLetter/get-all-retailers?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    console.log(res, "res")
    return res.data
  }
  catch (error) {
    return error.response.data;
  }
}
export const list_retailer_outlets = async (id) => {
  try {
    const res = await axios.get(`/api/AuthorizationLetter/get-a-retailer-outlets${id}`)
    console.log(res, "res<><><>")
    return res.data
  }
  catch (error) {
    console.log(error)
    return error.response.data;
  }
}

// api/AuthorizationLetter/approval-status-letters?status=1&pageNumber=1&pageSize=10
export const list_auth_letters = async (pageNumber, pageSize, status) => {
  try {
    const res = await axios.post(`/api/AuthorizationLetter/approval-status-letters?status=${status}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
    console.log(res, "res")
    return res.data
  }
  catch (error) {
    return error.response.data;
  }
}

// https://os.protoenergy.com/api/AuthorizationLetter/search-retailers?pageNumber=1&pageSize=10&searchparams=ha' \
export const get_all_retailers_ex = async (pageNumber, pageSize, params) => {
  console.log(pageNumber, pageSize, params, "pageNumber, pageSize, params")
  try {
    const res = await axios.get(`/api/AuthorizationLetter/search-retailers?pageNumber=${pageNumber}&pageSize=${pageSize}&searchparams=${params}`)
    console.log(res, "rexxo")
    return res.data
  }
  catch (error) {
    return error.response.data;
  }
}

export const list_distributors = async (pageNumber, pageSize) => {
  try {
    const res = `/api/AuthorizationLetter/get-all-distributors?pageNumber=${pageNumber}&pageSize=${pageSize}`
    return res.data
  }
  catch (error) {
    return error.response.data;
  }
}

//   'https://os.protoenergy.com/api/AuthorizationLetter/download/000003' \

export const download_retailer_letter = async (retailerCode) => {
  try {
    const url = `api/AuthorizationLetter/download/${retailerCode}`
    downloadFile(url, "retailerAuthorizationLetter.pdf");
  }
  catch (error) {
    return error.response.data;
  }
}


// 'https://os.protoenergy.com/api/AuthorizationLetter/add-retailer' 

export const add_retailer = async (formData) => {
  try {
    const res = await axios.post("/api/AuthorizationLetter/add-retailer", formData);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}

export const add_distributor = async (formData) => {
  try {
    const res = await axios.post("/api/AuthorizationLetter/add-distributor", formData);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}


// actions

export const initiate_auth_letter = async (formData) => {
  try {
    const res = await axios.post("/api/AuthorizationLetter/letters-initiate", formData);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}

export const reject_auth_letter = async (formData) => {
  try {
    const res = await axios.post("/api/AuthorizationLetter/letters-reject", formData);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}


export const approve_auth_letter = async (formData) => {
  try {
    const res = await axios.post("/api/AuthorizationLetter/letters-approve", formData);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}




// validate

export const verify_letter = async (id) => {
  try {
    const res = await axios.post(`/api/AuthorizationLetter/verify-retailer?refno=${id}`);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}

// 'https://os.protoenergy.com/api/AuthorizationLetter/add-a-retailer-outlet' 
export const add_retailer_outlet = async (formData) => {
  try {
    const res = await axios.post("/api/AuthorizationLetter/add-a-retailer-outlet", formData);
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
}

//  'https://os.protoenergy.com/api/AuthorizationLetter/download/multiple' \

export const download_multiple_authLetters = async (ids) => {
  try {
    const url = 'api/AuthorizationLetter/download/multiple';
    await downloadFile(url, "retailerAuthorizationLetter.zip", "application/zip", "POST", ids);
  } catch (error) {
    return error.response?.data || error.message;
  }
};



