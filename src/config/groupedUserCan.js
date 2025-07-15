import userCan from "./user_can";


c


const financeLevelOne = (user) => {
    const roles =
        [

            "POST:Sales:SalesShiftSummarySummary",
            "POST:Sales:TransferSaleToAnotherNozzle",

        ]

    // return true or false if user has all the roles
    if (user.roles && user.roles.includes(roles)) {
        return true;
    }

}

const financeAllAccess = (user) => {
    const roles =
        [
            "POST:Payments:AddTill",
            "GET:Payments:GetAllTills",
            "POST:Sales:TransferSaleToAnotherNozzle",
            "POST:Sales:ReverseSale",
            "POST:Sales:TransferSaleToAnotherNozzle",
            "POST:Stock:RefreshASale",

            // manage 
        ]

    return userCan(user, roles);
}

const backendAllAccess = (user) => {
    const roles = [
        "POST:Sales:AddSale",
        "GET:Stock:GetStockTakes",
        "POST:Bulk:AddCustomerLocation",
        "GET:Bulk:BulkDrivers",
        "POST:Bulk:DeliverOrders",
        "POST:Station:UpdateDispenser",
        "POST:Payments:AddTill",
        "POST:Sales:TransferSaleToAnotherNozzle",
        "POST:Sales:ReverseSale",
        "GET:Customer:GetAllComplains",
        "POST:Bulk:UpdateCustomerInfo",
        "GET:Bulk:DriverOrders",
        "GET:Bulk:DeliveryPlans",
        "GET:Bulk:DriverDashBoard",
        "GET:Payments:GetAllTills",
        "GET:Station:GetAllNozzles",
        "POST:Customer:DeactivateVehicle",
        "GET:Bulk:ListAllCustomers",
        "GET:Bulk:CustomersList",
        "POST:Station:UpdateTank",
        "POST:Customer:AddComplain",
        "POST:UserRoles:AssignPermissionsToRole",
        "POST:Station:AddStation",
        "POST:Customer:AddVehicle",
        "GET:Bulk:AgentDashBoard",
        "POST:Customer:AddCustomer",
        "GET:Station:GetAllTanks",
        "POST:Station:AddTank",
        "DELETE:Bulk:RemoveOrder",
        "POST:UserRoles:AssignUserToRole",
        "GET:Stock:ShiftVariances",
        "GET:Station:GetAllDispensers",
        "GET:Station:GetAllStations",
        "POST:Station:UpdateNozzle",
        "POST:UserRoles:RemoveRoleFromUser",
        "POST:Payments:UpdateTill",
        "GET:Customer:GetAllVehicles",
        "POST:Bulk:AddPlan",
        "POST:Stock:StockTake",
        "PUT:Bulk:PlanAssignMents",
        "POST:Station:AssignDispenser",
        "POST:Station:UpdateStation",
        "GET:Stock:ShiftSales",
        "PATCH:Customer:UpdateVehicle",
        "GET:Bulk:GetDeliveredOrdersStatistics",
        "POST:Customer:ActivateVehicle",
        "GET:Bulk:WebDashBoard",
        "GET:Bulk:DeliveredOrders",
        "POST:Bulk:SearchCustomer",
        "POST:Bulk:AttachOrder",
        "GET:Stock:ShiftStatus",
        "POST:Payments:AssignTillToDispenser",
        "GET:Customer:SearchVehicle",
        "POST:Bulk:BulkMangerApproval",
        "GET:Bulk:UnattachedOrders",
        "POST:Bulk:LoadOrders",
        "POST:Bulk:CancelDeliveryPlan",
        "POST:Stock:RefreshASale",
        "Post:Authentication:UpdateUserDetails",
        "Post:Authentication:UpdateUserDetails",
        "POST:Bulk:AddOrder",
        "POST:Bulk:FinanceApproval",
        "POST:Stock:InitialStockTake",
        "POST:Bulk:AddProduct",
        "POST:Bulk:AddVehicle",
        "POST:Station:AddNozzle",
        "GET:UserRoles:GetUsersAssignedToRole",
        "Get:Authentication:GetAllUsers",
        "GET:Station:GetAllDispenserAssignments",
        "POST:Setup:AddPrice",
        "PATCH:Customer:ChangeComplainStatus",
        "GET:Bulk:BulkVehicleListing",
        "Post:Authentication:AssignUserToApp",
        "Post:Authentication:AssignUserToApp",
        "Post:Authentication:DeactivateUser",
        "Post:Authentication:DeactivateUser",
        "POST:Setup:ViewProducts",
        "POST:Bulk:OffLoading",
        "GET:Bulk:BulkOrders",
        "GET:UserRoles:GetUserRoles",
        "POST:Bulk:UpdateVehicle",
        "Post:Authentication:RegisterUser",
        "Post:Authentication:RegisterUser",
        "POST:Setup:AddProduct",
        "Post:Authentication:RemoveUserFromApp",
        "Post:Authentication:RemoveUserFromApp",
        "POST:Station:AddDispenser",
        "Post:Authentication:ActivateUser",
        "Post:Authentication:ActivateUser",
        "POST:Station:UnAssignDispenserAsync",
        "POST:Setup:AddPaymentType",
        "POST:Bulk:UpdateCustomerStatus",
        "POST:Bulk:SearchVehicleByRegNumber",
        "GET:UserRoles:GetUserPermissions",
        "POST:UserRoles:AssignRoleToUser",
        "Get:Authentication:GetUserApps",
        "Get:Authentication:GetUserApps",
        "POST:Bulk:AddCustomer",
        "GET:Bulk:AgentOrders",
        "POST:Sales:SalesShiftSummarySummary",
        "POST:UserRoles:AddUserRoles",
    ]

}
