import axios from "./index";

export const Login = async (formData) => {
    try {
        const res = await axios.post("/otogas/Authentication/SignInUser", {
            ...formData,
            appCode: "01",
        });
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

// current user
export const CurrentUser = async (token) => {
    try {
        const res = await axios.get(
            "/otogas/Authentication/CurrentUserDetails",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

// user registration
export const Register = async (formData) => {
    try {
        const res = await axios.post(
            "/otogas/Authentication/RegisterUser",
            formData,
        );
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};
// update user'

export const UpdateUser = async (userCode, formData) => {
    try {
        const res = await axios.post(
            `/otogas/Authentication/UpdateUserDetails?userCode=${userCode}`,
            formData,
        );
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

// reset password
export const ResetPassword = async (password) => {
    try {
        const res = await axios.post(
            `/otogas/Authentication/ResetPassword?passWord=${password}`,
        );
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

// get users
export const GetUsers = async () => {
    try {
        const res = await axios.get("/otogas/Authentication/GetAllUsers");
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const GetUser = async (userCode) => {
    try {
        const res = await axios.get(
            `/otogas/Authentication/CurrentUserDetails?userCode=${userCode}`,
        );
        return res.data.responseObject;
    } catch (error) {
        return error.response.data;
    }
};

// ListAppUsers

export const ListAppUsers = async () => {
    try {
        const res = await axios.get("/otogas/Station/AttendantsList");
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

// deactivate user

export const DeactivateUser = async (userCode) => {
    try {
        const res = await axios.post(
            `/otogas/Authentication/DeactivateUser?userCode=${userCode}`,
        );
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

// activate user
export const ActivateUser = async (userCode) => {
    try {
        // Authentication/ActivateUser?userCode=00006'
        const res = await axios.post(
            `/otogas/Authentication/ActivateUser?userCode=${userCode}`,
        );
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

// send otp
export const SendOTP = async (msisdn) => {
    // 'GET' \
    // 'https://os.protoenergy.com/otogas/Authentication/SendOTP?phoneNumber=0715357867' 
    try {
        console.log(msisdn, "msisdn");
        const res = await axios.get(
            `otogas/Authentication/SendOTP?phoneNumber=${msisdn}`,
        );
        console.log(res, "res");
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

// forgot password

export const ChangePassword = async (formData) => {
    try {
        const res = await axios.post(
            "/otogas/Authentication/ChangePassword",
            formData,
        );
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

// List Apps
export const ListApps = async () => {
    try {
        const res = await axios.get("/otogas/Authentication/GetAllApps");
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const assignUserApps = async (userId, appId) => {
    try {
        const res = await axios.post(
            `/otogas/Authentication/AssignUserToApp?userCode=${userId}&appCode=${appId}`,
        );

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

// roles
export const list_roles = async () => {
    try {
        const res = await axios.get("/otogas/UserRoles/get-all-roles");
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const list_user_roles = async (user_id) => {
    try {
        const res = await axios.get(
            `/otogas/UserRoles/get-user-roles/${user_id}`,
        );
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const assign_roles = async (user_id, role_id) => {
    try {
        const res = await axios.post(
            `/otogas/UserRoles/assign-role-to-user?userId=${user_id}&roleId=${role_id}`,
        );
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const remove_roles = async (user_id, role_id) => {
    try {
        const res = await axios.post(
            `/otogas/UserRoles/remove-role-from-user?userId=${user_id}&roleId=${role_id}`,
        );
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const users_assigned_to_role = async (role_id) => {
    console.log(role_id, "role_id ?????");
    try {
        // 'https://os.protoenergy.com/otogas/UserRoles/get-users-assigned-to-role/001' \
        const res = await axios.get(
            `/otogas/UserRoles/get-users-assigned-to-role/${role_id}`,
        );

        console.log(res, "users assigned to role ");
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const get_role_permissions = async (roleId) => {
    console.log(roleId, "roleId")
    try {
        const res = await axios.get(
            `/otogas/UserRoles/get-roles-permisions?RoleCode=${roleId}`
        );
        console.log(res, "res jrkrelklre")
        return res.data;
    } catch (error) {
        return error.response.data;
    }

}

export const list_permissions = async () => {
    // 'https://os.protoenergy.com/otogas/UserRoles/get-all-permisions' \
    try {
        const res = await axios.get("/otogas/UserRoles/get-all-permisions");
        return res.data;
    }
    catch (error) {
        return error.response.data;
    }
}


//  remove role permission
export const remove_role_permission = async (roleId, permissions) => {
//     curl -X 'POST' \
//   'https://os.protoenergy.com/otogas/UserRoles/assign-permissions-to-role?roleId=001' \
//   -H 'accept: */*' \
//   -H 'Authorization: Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJVbmlxdWVJZCI6ImU3ZTc3MDIxLTljZDEtNDkxMi04YmU1LTg0ZDM3NWUyYjE5YSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiNWNjN2UzOTItMDZiMi00ZDNlLTkwOTctYmEyZTg5ZDc5ODc0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiQmVuZWRpY3QiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdXJuYW1lIjoiS2l0aW5ndSIsInVzZXJuYW1lIjoiQm13ZW5kd2FAcHJvdG9lbmVyZ3kuY29tIiwiaWQiOiI1Y2M3ZTM5Mi0wNmIyLTRkM2UtOTA5Ny1iYTJlODlkNzk4NzQiLCJOYW1lIjoiQmVuZWRpY3QgTXdlbmR3YSBLaXRpbmd1IiwiUGF5cm9sbE51bWJlciI6IktBQkMzODI3IiwiUGhvbmVOdW1iZXIiOiIrMjU0NzE1MzU3ODY3IiwiVXNlckNvZGUiOiIwMDAwNCIsIkVtYWlsIjoiYm13ZW5kd2FAcHJvdG9lbmVyZ3kuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIkNhbiBVcGRhdGUgQ3VzdG9tZXIgRGV0YWlscyIsIkNhbiBWaWV3IEFsbCBWYXJpYW5jZXMiLCJDYW4gUGVyZm9ybSBGaW5hbmNlIEFwcHJvdmFsIiwiQ2FuIEFjdGl2YXRlIE1wZXNhIENvZGUiLCJDYW4gQWRkIEEgQ3VzdG9tZXIiLCJDYW4gVmlldyBUYW5rcyBJbiBBIFN0YXRpb24iLCJDYW4gRGVmZXIgQSBWYXJpYW5jZSIsIkNhbiBBZGQgUHJpY2UiLCJDYW4gQWRkIEEgUGF5bWVudCBNZXRob2QiLCJDYW4gQWRkIEN1c3RvbWVyIiwiQ2FuIEFzc2lnbiBBIFVzZXIgVG8gQSBSb2xlIiwiQ2FuIEFkZCBBIFRpbGwiLCJDYW4gVXBkYXRlIEEgVGlsbCIsIkNhbiBWaWV3IEJ1bGsgQWdlbnQgT3JkZXJzIiwiQ2FuIFZpZXcgRnVlbGluZyBFdmVudHMgRm9yIFZlaGljbGUiLCJDYW4gdmlldyBCdWxrIEN1c3RvbWVyIExpc3RpbmdzIiwiQ2FuIFVwZGF0ZSBBIE5venpsZSIsIkNhbiBBc3NpZ24gQSBEaXNwZW5zZXIiLCJDYW4gdmlldyBEZWxpdmVyZWQgT3JkZXJzIFN0YXRpc3RpY3MiLCJDYW4gVmlldyBDdXN0b21lciBMaXN0IiwiQ2FuIEFkZCBQcm9kdWN0IiwiQ2FuIFZpZXcgQWxsIERpc3BlbnNlcnMiLCJDYW4gdmlldyBEYWlseSBzYWxlcyBEYXRhIiwiQ2FuIFZpZXcgVXNlciBQZXJtaXNzaW9ucyIsIkNhbiBUb3AgVXAgQ3VzdG9tZXIgV2FsbGV0IiwiQ2FuIFZpZXcgQnVsayBDdXN0b21lciIsIkNhbiBEbyBPcmRlciBMb2FkaW5ncyBUbyBhIEJ1bGsgVmVoaWNsZSIsIkNhbiBWaWV3IFByb2R1Y3RzIiwiQ2FuIFNlYXJjaCBBIEJ1bGsgQ3VzdG9tZXIiLCJDYW4gQWRkIEEgQnVsayBWZWhpY2xlIiwiQ2FuIEFkZCBBIFJlY2lwaWVudCBUbyBBbiBFbWFpbCIsIkNhbiBWaWV3IEJ1bGsgRHJpdmVyIERhc2hCb2FyZCIsIkNhbiBTdG9jayBUYWtlIiwiQ2FuIENoYW5nZSBDb21wbGFpbiBTdGF0dXMiLCJDYW4gVmlldyBVc2VyIFJvbGVzIiwiQ2FuIEFkZCBBIE5ldyBCdWxrIE9yZGVyIiwiQ2FuIHZpZXcgZGVsaXZlcnkgcGxhbnMiLCJDYW4gQWRkIFBheW1lbnQgVHlwZSIsIkNhbiBWaWV3IEFsbCBOb3p6bGVzIiwiQ2FuIFVwZGF0ZSBCdWxrIEN1c3RvbWVyIEluZm9ybWF0aW9uIiwiQ2FuIFZpZXcgU2hpZnQgVmFyaWFuY2VzIiwiQ2FuIFVuYXNzaWduIGFuIE9yZGVyIEZyb20gQSBQbGFuIiwiQ2FuIFZpZXcgQnVsayBEcml2ZXIgT3JkZXJzIiwiQ2FuIFZpZXcgQWxsIFZlaGljbGVzIiwiQ2FuIFZpZXcgQWxsIEFwcHMiLCJDYW4gU2VhcmNoIEJ1bGsgVmVoaWNsZSIsIkNhbiBVcGRhdGUgQSBUYW5rIiwiQ2FuIFZpZXcgQ3VzdG9tZXIgU3RhdGVtZW50IiwiQ2FuIEFjdGl2YXRlIEEgVmVoaWNsZSIsIkNhbiBkZWxpdmVyIE9yZGVycyIsIkNhbiBWaWV3IEJ1bGsgVmVoaWNsZSBMaXN0aW5nIiwiQ2FuIEFkZCBBIFNhbGUiLCJDYW4gVmlldyBBbGwgVXNlcnMiLCJDYW4gUmVtb3ZlIEEgUmVjaXBpZW50IEZyb20gQW4gRW1haWwiLCJDYW4gVmlldyBTaGlmdCBTdGF0dXMiLCJDYW4gUmV2ZXJzZSBBIFNhbGUiLCJDYW4gVW5JbnN0YWxsIGEgVmVoaWNsZSIsIkNhbiBBc3NpZ24gVXNlciBBbiBBcHAiLCJDYW4gRXhwb3J0IEN1c3RvbWVycyIsIkNhbiBWaWV3IEFsbCBDb21wbGFpbnMiLCJDYW4gQWN0aXZhdGUgVXNlcnMiLCJDYW4gVHJhbnNmZXIgV2FsbGV0IEFtb3VudCBGcm9tIE9uZSBWZWhpY2xlIFRvIEFub3RoZXIiLCJDYW4gVmlldyBEYXNoQm9hcmQgRGF0YSIsIkNhbiBUcmFuc2ZlciBBIFZlaGljbGUiLCJDYW4gVmlldyBTYWxlcyBEYXRhIiwiQ2FuIFBlcmZvcm0gTWFuYWdlciBBcHByb3ZhbCIsIkNhbiBBZGQgQSBOb3p6bGUiLCJDYW4gVmlldyBBbGwgVGFua3MiLCJDYW4gRGVhY3RpdmF0ZSBVc2VycyIsIkNhbiB2aWV3IERlbGl2ZXJlZCBPcmRlcnMgU3RhdGlzdGljcyBNb250aGx5IiwiQ2FuIERlbGl2ZXIgQnVsayBPcmRlcnMiLCJDYW4gV3JpdGUgT2ZmIEEgVmFyaWFuY2UiLCJDYW4gQWRkIEJ1bGsgQ3VzdG9tZXJMb2NhdGlvbiIsIkNhbiB1cGRhdGUgY3JlZGl0IExpbWl0IiwiQ2FuIEdldCBBbGwgQnVsayBQcm9kdWN0cyIsIkNhbiBWaWV3IEN1c3RvbWVyQmFsYW5jZXMiLCJDYW4gVmlldyBBbGwgUm9sZXMiLCJDYW4gUmVtb3ZlIEEgUm9sZSBGcm9tIEEgVXNlciIsImNhbiB2aWV3IGN1c3RvbWVyIHZlaGljbGVzIiwiQ2FuIFZpZXcgQWxsIFBlcm1pc3Npb25zIiwiQ2FuIEFzc2lnbiBBIFJvbGUgVG8gQSBVc2VyIiwiQ2FuIEFkZCBBIENvbXBsYWluIiwiQ2FuIEFkZCBBIFZlaGljbGUiLCJDYW4gVmlldyBCdWxrIERyaXZlcnMiLCJDYW4gUmVtb3ZlIEFuIE9yZGVyIEZyb20gVGhlIFBsYW4iLCJDYW4gdmlldyBidWxrIE9yZGVycyIsIkNhbiBQbGFuIEJ1bGsgQXNzaWdubWVudHMgQ2hhbmdlcyIsIkNhbiBBZGQgQSBTdGF0aW9uIiwiQ2FuIEFkZCBBIG5ldyBQcm9kdWN0IiwiQ2FuIFZpZXcgQWxsIFNhbGVzIiwiQ2FuIFZpZXcgTXBlc2EgVHJhbnNhY3Rpb25zIiwiQ2FuIEFkZCBBIEJ1bGsgRGVsaXZlcnkgUGxhbiIsIkNhbiBSZWdpc3RlciBQREEgRGV2aWNlIiwiQ2FuIFZpZXcgU2FsZXMgSGlzdG9yeSIsIkNhbiBWaWV3IEFsbCBUaWxscyIsIkNhbiBWaWV3IEFsbCBVc2VycyBXaXRoIEFwcHMiLCJDYW4gVXBkYXRlIEJ1bGsgQ3VzdG9tZXIgU3RhdHVzIiwiQ2FuIFVwZGF0ZSBBIERpc3BlbnNlciIsIkNhbiBWaWV3IFJlcG9ydHMiLCJDYW4gdmlldyBNb250aGx5IHNhbGVzIERhdGEiLCJDYW4gUmVnaXN0ZXIgQSBVc2VyIiwiQ2FuIFZpZXcgQWxsIE5venpsZXMgSW4gQSBEaXNwZW5zZXIiLCJDYW4gVXBkYXRlIEEgVmVoaWNsZSIsIkNhbiBVcGRhdGUgQnVsayBDdXN0b21lciBMb2NhdGlvbiIsIkNhbiBBZGQgQSBSb2xlIiwiQ2FuIFNlYXJjaCBWZWhpY2xlIiwiQ2FuIEFkZCBBIERpc3BlbnNlciIsIkNhbiBBc3NpZ24gUGVybWlzc2lvbnMgVG8gQSBSb2xlIiwiQ2FuIEJsb2NrIE1wZXNhIENvZGUiLCJDYW4gVXBkYXRlIEEgU3RhdGlvbiIsIkNhbiBSZWdpc3RlciBOb25PdG9nYXMgVmVoaWNsZSIsIkNhbiBWaWV3IEVtYWlsIFJlY2lwaWVudHMiLCJDYW4gVmlldyBQYXltZW50cyIsIkNhbiB2aWV3IFdlYiBEYXNoQm9hcmQiLCJDYW4gT2ZmTG9hZCBBIEJ1bGsgVmVoaWNsZSIsIkNhbiBBc3NpZ24gQSBUaWxsIFRvIEEgRGlzcGVuc2VyIiwiQ2FuIFZpZXcgQnVsayBBZ2VudCBEYXNoQm9hcmQiLCJDYW4gQ2FuY2VsIEEgQnVsayBEZWxpdmVyeSBQbGFuIiwiQ2FuIFZpZXcgU2FsZXMgU2hpZnQgU3VtbWFyeSIsIkNhbiBWaWV3IFRhbmsgU2l6ZXMiLCJDYW4gRGVhY3RpdmF0ZSBBIFZlaGljbGUiLCJDYW4gVmlldyBBbGwgSW4gQSBEaXNwZW5zZXJzIiwiQ2FuIFJlbW92ZSBVc2VyIEZyb20gQW4gQXBwIiwiQ2FuIEV4cG9ydCBDdXN0b21lciBXYWxsZXQgQmFsYW5jZXMgZXhjZWwiLCJDYW4gQWRkIE1wZXNhIFRyYW5zYWN0aW9ucyIsIkNhbiBJbml0aWFsIFN0b2NrIFRha2UiLCJDYW4gVmlldyBBbGwgU3RhdGlvbnMiLCJDYW4gVmlldyBVc2VycyBBc3NpZ25lZCBUbyBBIFJvbGUiLCJDYW4gVmlldyBTdG9jayBUYWtlcyIsIkNhbiBBdHRhY2ggQSBOZXcgQnVsayBPcmRlciIsIkNhbiBVcGRhdGUgYSBCdWxrIFZlaGljbGUiLCJDYW4gVHJhbnNmZXIgU2FsZSBUbyBBbm90aGVyIE5venpsZSIsIkNhbiBWaWV3IEFsbCBEaXNwZW5zZXIgQXNzaWdubWVudHMiLCJDYW4gVmlldyBFbXBsb3llZSBQcmljZSIsIkNhbiBBZGQgQSBUYW5rIiwiQ2FuIFVuQXNzaWduIEEgRGlzcGVuc2VyIl0sImV4cCI6MTczOTk0Nzc5Nn0.0mYTPNr93z-_XD4YifsEpYmu1qeMdm_4KC1-8xJu2QI' \
//   -H 'Content-Type: application/json' \
//   -d '[
//   "0FC0267D-2A6D-4D67-B72A-797C569443D7"
// ]'

    try {
        const res = await axios.post(
            `/otogas/UserRoles/remove-permissions-to-role?roleId=${roleId}`,
            permissions
        );
        return res.data;
    }
    catch (error) {
        return error.response.data;
    }
}


// assign role permission
export const assign_permissions = async (roleId, permissions) => {
    try {
        const res = await axios.post(
            `/otogas/UserRoles/assign-permissions-to-role?roleId=${roleId}`,
            permissions
        );
        return res.data;
    }
    catch (error) {
        return error.response.data;
    }
}


export const get_report_recipients = async (reportId) => {
    try {
        const res = await axios.get(
            `/otogas/Setup/GetRecipients?reportCode=${reportId}`,
        );
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const add_report_recipient = async (reportId, recipient, type) => {
    console.log(reportId, recipient, type, "reportId, recipient, type");
    try {
        const res = await axios.post(`/otogas/Setup/AddRecipient?email=${recipient}&reportCode=${reportId}&type=${type}`);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const remove_report_recipient = async (reportId, email) => {
    // otogas/Setup/RemoveRecipient?email=3&reportCode=3'
    try {
        const res = await axios.post(
            `/otogas/Setup/RemoveRecipient?email=${email}&reportCode=${reportId}`,
        );
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const get_reports = async () => {
    try {
        const res = await axios.get("/otogas/Setup/Reports");
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const send_bulk_sms = async (message, sender, formData) => {
    try {
        const encodedMessage = encodeURIComponent(message);
        const encodedSender = encodeURIComponent(sender);
        
        const res = await axios.post(`/otogas/Messaging/SendBulkSms?message=${encodedMessage}&sender=${encodedSender}`, formData, {
            headers: {
                // No need to set 'Content-Type', Axios will set it automatically for FormData
            },
        });
        return res.data;
    } catch (error) {
        return error.response ? error.response.data : error.message;
    }
};


export const get_sms_sender_names = async () => {
    try {
        const res = await axios.get("/otogas/Messaging/GetSenderNames");
        // console.log(res, "res");
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}
