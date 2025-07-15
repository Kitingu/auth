import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    GET_USERS,
    CLEAR_NOTIFICATION,
    LIST_APPS,
    LIST_ROLES,
    LIST_USER_ROLES,
    GET_USER_DETAILS_FROM_TOKEN,
    ASSIGN_ROLES,
    AUTH_WARNING,
    AUTHENTICATION_ERROR,
    AUTH_SUCCESS,
    LIST_ROLE_PERMISSIONS,
    LIST_ROLE_USERS,
    LIST_PERMISSIONS,
    REMOVE_PERMISSIONS,
    ASSIGN_PERMISSIONS,


} from "../types";


export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            localStorage.setItem("isAuthenticated", true)
            localStorage.setItem("user", action.payload.user)
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload.user
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false
            }

        case LOGIN_SUCCESS:

            try {
                localStorage.setItem("token", action.payload.token);
                console.log("Token set successfully");
            } catch (error) {
                console.error("Error setting token in localStorage", error);
            }

            console.log(action.payload, "payload ++++++++++++++")

            // drop user from the payload

            // let { user,roles, ...rest } = action.payload;
            localStorage.setItem("token", action.payload.token)

            return {
                ...state,
                isAuthenticated: true,
                loading: false,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
            }

        case AUTHENTICATION_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                notification: {
                    type: "success",
                    text: action.payload
                }
            }

        case AUTH_ERROR:
            return {
                ...state,
                notification: {
                    type: "error",
                    text: action.payload
                }
            }

        case AUTH_WARNING:
            return {
                ...state,
                notification: {
                    type: "warning",
                    text: action.payload
                }
            }
        case LOGIN_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case LOGOUT:
            localStorage.clear();
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            };
        case CLEAR_NOTIFICATION:
            return {
                ...state,
                notification: null
            };

        case LIST_APPS:
            return {
                ...state,
                apps: action.payload
            };

        case GET_USER_DETAILS_FROM_TOKEN:
            const user_roles = action.payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            return {
                ...state,
                user_roles: user_roles,

                user: {
                    name: action.payload.Name,
                    user_code: action.payload.UserCode,
                    email: action.payload.Email,
                }

            };

        case LIST_ROLES:
            return {
                ...state,
                roles: action.payload
            };

        case ASSIGN_ROLES:
            return {
                ...state,
                notification: {
                    type: "success",
                    text: action.payload
                }
            }
        case LIST_ROLE_PERMISSIONS:
            return {
                ...state,
                role_permissions: action.payload
            }

        case LIST_ROLE_USERS:
            return {
                ...state,
                role_users: action.payload
            }

        case LIST_PERMISSIONS:
            return {
                ...state,
                all_permissions: action.payload
            }

        case REMOVE_PERMISSIONS:
            return {
                ...state,
                notification: {
                    type: "success",
                    text: action.payload
                }
            }

        case ASSIGN_PERMISSIONS:
            return {
                ...state,
                notification: {
                    type: "success",
                    text: action.payload
                }
            }


        default:
            return state;
    }
};


// {
//     "UniqueId": "381dc04e-cf2a-48fa-aeb0-e093617ed055",
//     "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": "5cc7e392-06b2-4d3e-9097-ba2e89d79874",
//     "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname": "Benedict",
//     "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname": "Mwendwa",
//     "username": "Bmwendwa@protoenergy.com",
//     "id": "5cc7e392-06b2-4d3e-9097-ba2e89d79874",
//     "Name": "Benedict Mwendwa Mwendwa",
//     "PayrollNumber": "KABC3827",
//     "PhoneNumber": "+254715357867",P
//     "UserCode": "00004",
//     "Email": "bmwendwa@protoenergy.com",
//     "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": [
//         [
//   POST:Customer:UpdateCustomer
// GET:Stock:AllVariances
// POST:Bulk:FinanceApproval
// PUT:Payments:ActivateMpesa
// POST:Bulk:AddCustomer
// GET:Station:StationTank
// POST:Sales:DeferVariance
// POST:Setup:ChangePrice
// POST:Payments:ConfirmPayment
// POST:Customer:AddCustomer
// POST:UserRoles:AssignUserToRole
// POST:Payments:AddTill
// POST:Payments:UpdateTill
// GET:Bulk:AgentOrders
// GET:Bulk:BulkCustomerListing
// POST:Station:UpdateNozzle
// POST:Station:AssignDispenser
// GET:Bulk:GetDeliveredOrdersStatistics
// GET:Bulk:CustomersList
// POST:Setup:AddProduct
// GET:Station:GetAllDispensers
// GET:UserRoles:GetUserPermissions
// POST:Sales:TopUpCustomerWallet
// GET:Bulk:ListAllCustomers
// POST:Bulk:Loading
// GET:Setup:GlobalPriceChange
// POST:Bulk:SearchCustomer
// POST:Bulk:AddVehicle
// POST:Setup:AddRecipient
// GET:Bulk:DriverDashBoard
// POST:Stock:StockTake
// PATCH:Customer:ChangeComplainStatus
// GET:UserRoles:GetUserRoles
// POST:Bulk:AddOrder
// GET:Bulk:DeliveryPlans
// POST:Setup:AddPaymentType
// GET:Station:GetAllNozzles
// POST:Bulk:UpdateCustomerInfo
// GET:Stock:Shiftvariances
// GET:Bulk:UnattachedOrders
// GET:Bulk:DriverOrders
// GET:Customer:GetAllVehicles
// GET:Authentication:GetAllApps
// POST:Bulk:SearchVehicleByRegNumber
// POST:Station:UpdateTank
// POST:Sales:GetCustomerStatement
// POST:Customer:ActivateVehicle
// GET:Bulk:DeliveredOrders
// GET:Bulk:BulkVehicleListing
// POST:Sales:AddSale
// GET:Authentication:GetAllUsers
// POST:Setup:RemoveRecipient
// GET:Stock:Shiftstatus
// POST:Sales:ReverseSaleAsync
// POST:Customer:MarkVehicleAsUnInstalled
// POST:Authentication:AssignUserToApp
// GET:Customer:GetAllComplains
// POST:Authentication:ActivateUser
// GET:Sales:GetDashBoardData
// POST:Customer:TransferVehicle
// POST:Bulk:BulkMangerApproval
// POST:Station:AddNozzle
// GET:Station:GetAllTanks
// POST:Authentication:DeactivateUser
// GET:Bulk:GetDeliveredOrdersStatisticsForMonth
// POST:Bulk:DeliverOrders
// POST:Sales:WriteOffVariance
// POST:Bulk:AddCustomerLocation
// GET:Bulk:Products
// POST:Sales:GetAllCustomerBalances
// GET:UserRoles:GetRoles
// POST:UserRoles:RemoveRoleFromUser
// GET:UserRoles:GetAllRoles
// POST:UserRoles:AssignRoleToUser
// POST:Customer:AddComplain
// POST:Customer:AddVehicle
// GET:Bulk:BulkDrivers
// DELETE:Bulk:RemoveOrder
// GET:Bulk:BulkOrders
// PUT:Bulk:PlanAssignMents
// POST:Station:AddStation
// POST:Bulk:AddProduct
// GET:Sales:AllSales
// GET:Payments:MpesaTransactions
// POST:Bulk:AddPlan
// POST:Setup:RegisterPDA
// GET:Stock:Saleshistory
// GET:Payments:GetAllTills
// GET:Authentication:GetUserApps
// POST:Bulk:UpdateCustomerStatus
// POST:Station:UpdateDispenser
// GET:Setup:Reports
// POST:Authentication:RegisterUser
// GET:Station:ListDispenserNozzles
// PATCH:Customer:UpdateVehicle
// PUT:Bulk:UpdateCustomerLocation
// POST:UserRoles:AddUserRoles
// GET:Customer:SearchVehicle
// POST:Station:AddDispenser
// POST:UserRoles:AssignPermissionsToRole
// PUT:Payments:BlockMpesa
// POST:Station:UpdateStation
// GET:Customer:RegisterNonOtogasVehicle
// GET:Setup:GetRecipients
// GET:Bulk:WebDashBoard
// POST:Bulk:OffLoading
// POST:Payments:AssignTillToDispenser
// GET:Bulk:AgentDashBoard
// POST:Bulk:CancelDeliveryPlan
// POST:Sales:SalesShiftSummarySummary
// GET:Customer:GetTankSizes
// POST:Customer:DeactivateVehicle
// GET:Station:ListStationDispensers
// POST:Authentication:RemoveUserFromApp
// POST:Payments:AddMpesaTransaction
// POST:Stock:InitialStockTake
// GET:Station:GetAllStations
// GET:UserRoles:GetUsersAssignedToRole
// GET:Stock:GetStockTakes
// POST:Bulk:AttachOrder
// POST:Bulk:UpdateVehicle
// POST:Sales:TransferSaleToAnotherNozzle
// GET:Station:GetAllDispenserAssignments
// POST:Station:AddTank
// POST:Station:UnAssignDispenserAsync
// ],
//     "exp": 1725147698
// }