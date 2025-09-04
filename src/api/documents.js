import axios from "./index";


export const list_departments = async () => {
    // curl -X 'GET' \
    //   'https://os.protoenergy.com/api/Documents/list-all-departments' \

    try {
        const response = await axios.get('/api/Documents/list-all-departments');
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
};

// curl -X 'POST' \
//   'https://os.protoenergy.com/api/Documents/assign-user-to-department' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "userCode": "string",
//   "departmentCode": "string"
// }'

export const assign_user_to_department = async (userCode, departmentCode) => {
    try {
        const response = await axios.post('/api/Documents/assign-user-to-department', {
            userCode,
            departmentCode
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};


// curl -X 'POST' \
//   'https://os.protoenergy.com/api/Documents/add-document-definition' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '"string"'


export const add_document_definition = async (definition) => {
    try {
        const response = await axios.post('/api/Documents/add-document-definition', definition);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// curl -X 'GET' \
//   'https://os.protoenergy.com/api/Documents/get-docs-per-user-department' \
//   -H 'accept: */*'

export const get_docs_per_user_department = async () => {
    try {
        const response = await axios.get('/api/Documents/get-docs-per-user-department');
        console.log(response, "bfierbferjbfejrufgbvrjefvb")
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};




// curl -X 'POST' \
//   'https://os.protoenergy.com/api/Documents/add-tracking-document' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "documentCode": "string",
//   "issueDate": "2025-08-20T20:32:13.839Z",
//   "expiryDate": "2025-08-20T20:32:13.839Z"
// }'


export const add_tracking_document = async (documentCode, issueDate, expiryDate) => {
    try {
        const response = await axios.post('/api/Documents/add-tracking-document', {
            documentCode,
            issueDate,
            expiryDate
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}


// curl -X 'POST' \
//   'https://os.protoenergy.com/api/Documents/renew-tracking-document?trackingCode=02' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "expiryDate": "2025-08-20T20:33:18.020Z",
//   "renewalDate": "2025-08-20T20:33:18.020Z",
//   "documentStatus": 1,
//   "hasNotification": true
// }'

export const renew_tracking_document = async (trackingCode, expiryDate, renewalDate, documentStatus, hasNotification) => {
    try {
        const response = await axios.post(`/api/Documents/renew-tracking-document?trackingCode=${trackingCode}`, {
            expiryDate,
            renewalDate,
            documentStatus,
            hasNotification
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// curl -X 'GET' \
//   'https://os.protoenergy.com/api/Documents/get-all-tracked-documents' \
//   -H 'accept: */*'


export const get_all_tracked_documents = async () => {
    try {
        const response = await axios.get('/api/Documents/get-all-tracked-documents');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}



// curl -X 'GET' \
//   'https://os.protoenergy.com/api/Documents/get-tracked-document?trackingCode=01' \
//   -H 'accept: */*'

export const get_tracked_document = async (trackingCode) => {
    try {
        const response = await axios.get(`/api/Documents/get-tracked-document?trackingCode=${trackingCode}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// curl -X 'GET' \
//   'https://os.protoenergy.com/api/Documents/get-tracked-documents-by-department' \
//   -H 'accept: */*'


export const get_tracked_documents_by_department = async () => {
    try {
        const response = await axios.get('/api/Documents/get-tracked-documents-by-department');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}



//     curl -X 'POST' \
//   'https://os.protoenergy.com/api/Documents/add-department' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '""'

export const add_department = async (departmentName) => {
    try {
        const response = await axios.post('/api/Documents/add-department', departmentName);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}