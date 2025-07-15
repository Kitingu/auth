import React, { useReducer } from "react";
import StationsContext from "./stationsContext";
import StationsReducer from "./stationsReducer";
import { handleNotications } from "../../../api/util";
import {
  add_stations,
  list_stations,
  update_station,
  search_station,
  update_station_status,
  list_nozzles,
  add_nozzle,
  update_nozzle,
  add_station_dispenser,
  update_station_dispenser,
  list_dispensers,
  add_station_tank,
  update_station_tank,
  list_tanks,
  list_tills,
  add_till,
  update_till,
  change_till_status,
  list_station_dispensers,
  list_dispenser_nozzles,
  assign_till_to_dispenser,
  shift_variance,
  set_global_pricing,
  assign_user_to_dispenser,
  unassign_user_to_dispenser,
  list_station_tanks,
  get_dashboard_data,
  set_initial_stock,
  list_station_assignments,
  change_station_price,
  register_pda,
  adjust_stock_take,
  get_totalizer_readings,
  schedule_price_change,
  list_messages,
  download_messages
} from "../../../api/otogas";

import {
  remove_report_recipient,
  add_report_recipient,
  get_reports,
  get_report_recipients,
  get_sms_sender_names,
  send_bulk_sms,
} from "../../../api/auth";

import {
  ADD_STATION,
  UPDATE_STATION,
  STATION_ERROR,
  GET_STATIONS,
  GET_STATION,
  SEARCH_STATION,
  GET_NOZZLES,
  LIST_TANKS,
  CLEAR_NOTIFICATION,
  GET_STATION_DISPENSERS,
  GET_DISPENSER_NOZZLES,
  LIST_TILLS,
  LIST_VARIANCES,
  LIST_STATION_TANKS,
  GET_DASHBOARD_DATA,
  STATION_ASSIGNMENTS,
  STATION_WARNING,
  LIST_REPORTS,
  REPORT_RECIPIENTS,
  GET_TOTALIZER_READINGS,
  SMS_SENDER_NAMES,
  LIST_MESSAGES,
  DOWNLOAD_MESSAGES
} from "../../types";

const StationState = (props) => {
  const initialState = {
    stations: [],
    dispensers: [],
    current_station_dispensers: [],
    current_dispenser_nozzles: [],
    current_station_tanks: [],
    current_station_assignments: [],
    nozzles: [],
    tanks: [],
    current: null,
    filtered: null,
    error: null,
    tills: [],
    notification: null,
    shift_variances: [],
    dashboard_data: {},
    report_list: [],
    report_recipients: [],
    sms_sender_names: [],
    totalizer_readings: [],
    bulk_smses: [],
    totalMessagePages: 0,
    totalMessages: 0,

  };

  const [state, dispatch] = useReducer(StationsReducer, initialState);

  // list stations
  const listStations = async () => {
    // debugger;
    const res = await list_stations();
    if (res.responseCode === 1) {
      dispatch({ type: GET_STATIONS, payload: res.responseObject });
    }
  };

  // add station
  const addStation = async (station) => {
    const res = await add_stations(station);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_STATION, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  };

  // update station
  const updateStation = async (station) => {
    const res = await update_station(station);
    if (res.responseCode === 1) {
      dispatch({ type: UPDATE_STATION, payload: res.responseObject });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  };

  // search station
  const searchStation = async (station) => {
    const res = await search_station(station);
    if (res.responseCode === 1) {
      dispatch({ type: SEARCH_STATION, payload: res.responseObject });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  };

  // update station status
  const updateStationStatus = async (station) => {
    const res = await update_station_status(station);
    if (res.responseCode === 1) {
      dispatch({ type: UPDATE_STATION, payload: res.responseObject });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  };

  // list station nozzles
  const listNozzles = async (station) => {
    const res = await list_nozzles(station);
    if (res.responseCode === 1) {
      dispatch({ type: GET_NOZZLES, payload: res.responseObject });
    }
  };

  // add station nozzle
  const addStationNozzle = async (station) => {
    const res = await add_nozzle(station);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_STATION, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  };

  // update station nozzle
  const updateStationNozzle = async (station) => {
    const res = await update_nozzle(station);
    if (res.responseCode === 1) {
      dispatch({ type: UPDATE_STATION, payload: res.responseObject });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  };

  // add station dispenser
  const addStationDispenser = async (station) => {
    const res = await add_station_dispenser(station);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_STATION, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  };

  // update station dispenser
  const updateStationDispenser = async (station) => {
    const res = await update_station_dispenser(station);
    if (res.responseCode === 1) {
      dispatch({ type: UPDATE_STATION, payload: res.responseObject });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  };

  // list station dispensers
  const listDispensers = async () => {
    const res = await list_dispensers();

    if (res.responseCode === 1) {
      dispatch({ type: GET_STATION, payload: res.responseObject });
    }
  };

  // add station tank
  const addStationTank = async (station) => {
    const res = await add_station_tank(station);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_STATION, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  };

  // update station tank
  const updateStationTank = async (station) => {
    const res = await update_station_tank(station);
    if (res.responseCode === 1) {
      dispatch({ type: UPDATE_STATION, payload: res.responseObject });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  };

  // list station tanks
  const listTanks = async (station) => {
    const res = await list_tanks(station);
    if (res.responseCode === 1) {
      dispatch({ type: LIST_TANKS, payload: res.responseObject });
    }
  };

  const listStationTanks = async (station) => {
    const res = await list_station_tanks(station);
    if (res.responseCode === 1) {
      dispatch({ type: LIST_STATION_TANKS, payload: res.responseObject });
    }
  };

  // till numbers
  const listTills = async (station) => {
    const res = await list_tills(station);
    if (res.responseCode === 1) {
      dispatch({ type: LIST_TILLS, payload: res.responseObject });
    }
  };

  // add till
  const addTill = async (station) => {
    const res = await add_till(station);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_STATION, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  };

  // update till
  const updateTill = async (station) => {
    const res = await update_till(station);
    if (res.responseCode === 1) {
      dispatch({ type: UPDATE_STATION, payload: res.responseObject });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  };

  const changeTillStatus = async (till, status) => {
    const res = await change_till_status(till, status);
    if (res.responseCode === 1) {
      dispatch({ type: UPDATE_STATION, payload: res.responseObject });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  };

  const clear_notification = () => {
    dispatch({ type: CLEAR_NOTIFICATION });
  };

  const listStationDispensers = async (statioCode) => {
    const res = await list_station_dispensers(statioCode);
    if (res.responseCode === 1) {
      dispatch({ type: GET_STATION_DISPENSERS, payload: res.responseObject });
    }
    else {
      dispatch({ type: GET_STATION_DISPENSERS, payload: [] });
    }
  };

  const listDispenserNozzles = async (dispenserCode) => {
    const res = await list_dispenser_nozzles(dispenserCode);
    if (res.responseCode === 1) {
      dispatch({ type: GET_DISPENSER_NOZZLES, payload: res.responseObject });
    }
    else {
      dispatch({ type: GET_DISPENSER_NOZZLES, payload: [] });
    }
  };

  const assignTillToDispenser = async (formData) => {
    const res = await assign_till_to_dispenser(formData);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_STATION, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  };

  const listShiftvariances = async () => {
    const res = await shift_variance();
    if (res.responseCode === 1) {
      dispatch({ type: LIST_VARIANCES, payload: res.responseObject });
    }
  };

  const setGlobalPricing = async (productCode, newPrice) => {
    const res = await set_global_pricing(productCode, newPrice);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_STATION, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  };

  const setStationPrice = async (formData) => {
    const res = await change_station_price(formData);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_STATION, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  };

  const schedulePriceChange = async (formData) => {
    const res = await schedule_price_change(formData);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_STATION, payload: res.responseMessage });
    }
    else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    }
    else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  }

  const assignUserToDispenser = async (formData) => {
    console.log(formData);
    const res = await assign_user_to_dispenser(formData);
    console.log(res);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_STATION, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  };

  const unAssignUserToDispenser = async (userCode) => {
    console.log(userCode);
    const res = await unassign_user_to_dispenser(userCode);
    console.log(res);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_STATION, payload: res.responseMessage });
    }
    else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    }
    else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  }

  const getDashboardData = async () => {
    const res = await get_dashboard_data();
    if (res.responseCode === 1) {
      dispatch({ type: GET_DASHBOARD_DATA, payload: res.responseObject });
    }
  };

  const setInitialStock = async (formData) => {
    const res = await set_initial_stock(formData);
    console.log(res);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_STATION, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  };

  const stationAssignments = async (stationCode) => {
    const res = await list_station_assignments(stationCode);
    if (res.responseCode === 1) {
      dispatch({ type: STATION_ASSIGNMENTS, payload: res.responseObject });
    }
  };

  const registerPda = async (formData) => {
    console.log(formData);
    const res = await register_pda(formData);
    console.log(res);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_STATION, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  };

  const listReports = async () => {
    const res = await get_reports();

    if (res) {
      dispatch({ type: LIST_REPORTS, payload: res });
    }
  };

  const removeReportRecipient = async (reportId, email) => {
    const res = await remove_report_recipient(reportId, email);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_STATION, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  };

  const addReportRecipient = async (reportId, recipient, type) => {
    const res = await add_report_recipient(reportId, recipient, type);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_STATION, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  };

  const listReportRecipients = async (reportId) => {
    const res = await get_report_recipients(reportId);
    if (res.responseCode === 1) {
      console.log(res.responseObject);
      dispatch({ type: REPORT_RECIPIENTS, payload: res.responseObject });
    } else {
      dispatch({ type: REPORT_RECIPIENTS, payload: [] });
    }
  };

  const adjustStockTake = async (formData) => {
    const res = await adjust_stock_take(formData);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_STATION, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    } else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  }

  const getTotalizerReadings = async (date) => {
    const res = await get_totalizer_readings(date);
    console.log(res);
    if (res.responseCode === 1) {
      dispatch({ type: GET_TOTALIZER_READINGS, payload: res.responseObject });
    }
    else {
      dispatch({ type: GET_TOTALIZER_READINGS, payload: [] });
    }
  }

  const sendBulkMessages = async (message, sender, formData) => {
    // const escapedMessage = message.replace(/([.*+?^${}&'()|[\]\\])/g, '\\$1')
    const res = await send_bulk_sms(message, sender, formData);

    console.log(res);
    if (res.responseCode === 1) {
      dispatch({ type: ADD_STATION, payload: res.responseMessage });
    } else if (res.responseCode === 2) {
      dispatch({ type: STATION_WARNING, payload: res.responseMessage });
    }
    else {
      dispatch({ type: STATION_ERROR, payload: handleNotications(res) });
    }
  }

  const getSenderNames = async () => {
    const res = await get_sms_sender_names();
    console.log(typeof res)
    if (typeof res === 'object') {
      dispatch({ type: SMS_SENDER_NAMES, payload: res });
    }
    else{
      dispatch({ type: SMS_SENDER_NAMES, payload: [] });
    }
  }

  const listMessages = async (page, page_size,sender) => {
    const res = await list_messages(page, page_size,sender);
    console.log(res);
    if (res.responseCode === 1) {
      dispatch({ type: LIST_MESSAGES, payload: res.responseObject });
    }
    else {
      dispatch({ type: LIST_MESSAGES, payload: [] });
    }
  }


  const downloadMessages = async (sender, batchNumber,startDate,endDate) => {
    const res = await download_messages(sender, batchNumber,startDate,endDate);
    console.log(res);
  }

  return (
    <StationsContext.Provider
      value={{
        stations: state.stations,
        filtered: state.filtered,
        error: state.error,
        current: state.current,
        dispensers: state.dispensers,
        nozzles: state.nozzles,
        tanks: state.tanks,
        tills: state.tills,
        notification: state.notification,
        current_station_dispensers: state.current_station_dispensers,
        current_dispenser_nozzles: state.current_dispenser_nozzles,
        current_station_tanks: state.current_station_tanks,
        shift_variances: state.shift_variances,
        dashboard_data: state.dashboard_data,
        current_station_assignments: state.current_station_assignments,
        report_list: state.report_list,
        report_recipients: state.report_recipients,
        sms_sender_names: state.sms_sender_names,
        totalizer_readings: state.totalizer_readings,
        bulk_smses: state.bulk_smses,
        totalMessagePages: state.totalMessagePages,
        totalMessages: state.totalMessages,
        listStations,
        addStation,
        updateStation,
        searchStation,
        updateStationStatus,
        listNozzles,
        addStationNozzle,
        updateStationNozzle,
        addStationDispenser,
        updateStationDispenser,
        listDispensers,
        listTanks,
        addStationTank,
        updateStationTank,
        listTills,
        addTill,
        updateTill,
        changeTillStatus,
        clear_notification,
        listStationDispensers,
        listDispenserNozzles,
        assignTillToDispenser,
        listShiftvariances,
        setGlobalPricing,
        setStationPrice,
        assignUserToDispenser,
        unAssignUserToDispenser,
        listStationTanks,
        getDashboardData,
        setInitialStock,
        stationAssignments,
        registerPda,
        listReports,
        removeReportRecipient,
        addReportRecipient,
        listReportRecipients,
        adjustStockTake,
        getTotalizerReadings,
        sendBulkMessages,
        getSenderNames,
        schedulePriceChange,
        listMessages,
        downloadMessages
      }}
    >
      {props.children}
    </StationsContext.Provider>
  );
};

export default StationState;
