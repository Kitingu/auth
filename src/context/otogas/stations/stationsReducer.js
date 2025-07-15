import {
    GET_STATIONS,
    GET_STATION,
    GET_NOZZLES,
    ADD_STATION,
    STATION_ERROR,
    CLEAR_NOTIFICATION,
    GET_STATION_DISPENSERS,
    GET_DISPENSER_NOZZLES,
    LIST_TILLS,
    LIST_VARIANCES,
    LIST_TANKS,
    LIST_STATION_TANKS,
    GET_DASHBOARD_DATA,
    STATION_ASSIGNMENTS,
    STATION_WARNING,
    LIST_REPORTS,
    REPORT_RECIPIENTS,
    SMS_SENDER_NAMES,
    GET_TOTALIZER_READINGS,
    LIST_MESSAGES

} from "../../types"

export default (state, action) => {
    switch (action.type) {

        case GET_STATIONS:
            return {
                ...state,
                stations: action.payload
            };
        case GET_STATION:
            return {
                ...state,
                dispensers: action.payload
            };

        case GET_NOZZLES:
            return {
                ...state,
                nozzles: action.payload
            };

        case ADD_STATION:
            return {
                ...state,
                loading: false,
                notification: {
                    type: "success",
                    text: action.payload
                }
            };

        case STATION_ERROR:
            return {
                ...state,
                notification: {
                    type: "error",
                    text: action.payload
                }
            };

        case STATION_WARNING:
            return {
                ...state,
                notification: {
                    type: "warning",
                    text: action.payload
                }
            };

        case CLEAR_NOTIFICATION:
            return {
                ...state,
                notification: null
            };

        case GET_STATION_DISPENSERS:
            return {
                ...state,
                current_station_dispensers: action.payload
            };

        case GET_DISPENSER_NOZZLES:
            return {
                ...state,
                current_dispenser_nozzles: action.payload
            };

        case LIST_TILLS:
            return {
                ...state,
                tills: action.payload
            };
        case LIST_VARIANCES:
            return {
                ...state,
                shift_variances: action.payload
            };

        case LIST_TANKS:
            return {
                ...state,
                tanks: action.payload
            };
        case LIST_STATION_TANKS:
            return {
                ...state,
                current_station_tanks: action.payload
            };

        case GET_DASHBOARD_DATA:
            return {
                ...state,
                dashboard_data: action.payload
            }

        case STATION_ASSIGNMENTS:
            return {
                ...state,
                current_station_assignments: action.payload
            }

        case LIST_REPORTS:
            return {
                ...state,
                report_list: action.payload
            };

        case REPORT_RECIPIENTS:
            return {
                ...state,
                report_recipients: action.payload
            }
        case SMS_SENDER_NAMES:
            return {
                ...state,
                sms_sender_names: action.payload
            }
        case GET_TOTALIZER_READINGS:
            return {
                ...state,
                totalizer_readings: action.payload
            }

        case LIST_MESSAGES:
            return {
                ...state,
                bulk_smses: action.payload.messages,
                totalMessagePages: action.payload.totalPages,
                totalMessages: action.payload.totalRecords,
            }
        default:
            return state;
    }
}



