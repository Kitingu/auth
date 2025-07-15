import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import UserContext from "../../../context/users/userContext";
import AuthContext from "../../../context/auth/authContext";
import SweetAlertWrapper from "../sweetAlert";

const AssignUserApp = ({ show, handleClose, userId }) => {
    const userContext = useContext(UserContext);
    const authContext = useContext(AuthContext);
    const { assignUserApp } = userContext;
    const { list_apps, apps } = authContext;

    const [selectedApp, setSelectedApp] = useState(null);
    const [alertMessage, setAlertMessage] = useState({ text: "", type: "" });
    const [showAlert, setShowAlert] = useState(false);
    const [confirmationData, setConfirmationData] = useState({ show: false });

    useEffect(() => {
        list_apps();
    }, []);

    const handleAssignApp = async () => {
        if (!selectedApp) {
            setAlertMessage({
                text: 'Please select an app to assign',
                type: 'warning'
            });
            setShowAlert(true);
            return;
        }

        setConfirmationData({ show: true });
    };

    const confirmAssignApplication = () => {
        assignUserApp(userId, selectedApp);
        setAlertMessage({
            text: 'The app has been assigned successfully.',
            type: 'success'
        });
        setShowAlert(true);
        setConfirmationData({ show: false });
        handleClose();
    };

    const cancelAssignApp = () => {
        setConfirmationData({ show: false });
    };

    const handleSelectApp = (selectedOption) => {
        setSelectedApp(selectedOption.value);
    };

    const handleConfirm = () => {
        setShowAlert(false);
    };

    const appOptions = apps.map((app) => ({
        value: app.appsCode,
        label: app.appsName,
    }));

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Assign App</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SweetAlertWrapper
                    show={showAlert}
                    type={alertMessage.type || "info"}
                    title="Notification"
                    message={alertMessage.text}
                    confirmBtnText="OK"
                    onConfirm={handleConfirm}
                />
                <SweetAlertWrapper
                    show={confirmationData.show}
                    type="warning"
                    title="Confirm Assignment"
                    message="Are you sure you want to assign this app?"
                    confirmBtnText="Yes"
                    cancelBtnText="No"
                    onConfirm={confirmAssignApplication}
                    onCancel={cancelAssignApp}
                />
                <Form>
                    <Form.Group controlId="formSelectApp">
                        <Form.Label>Select App</Form.Label>
                        <Select
                            options={appOptions}
                            name="app"
                            onChange={handleSelectApp}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            value={appOptions.find(
                                (option) => option.value === selectedApp,
                            )}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAssignApp}>
                    Assign App
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AssignUserApp;
