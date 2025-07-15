import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import UserContext from "../../../context/users/userContext";
import SweetAlertWrapper from "../sweetAlert";

const ChangeUserStatus = ({ show, handleClose, userId, action }) => {
    const userContext = useContext(UserContext);
    const { activateUser, deactivateUser, notification, clear_notifications } =
        userContext;

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        if (notification) {
            setAlertMessage({
                text: notification.text,
                type: notification.type,
            });
            setShowAlert(true);
        }
    }, [notification]);

    const handleSubmit = () => {
        if (action === "activate") {
            activateUser(userId);
        } else {
            deactivateUser(userId);
        }
    };

    const handleConfirm = () => {
        setShowAlert(false);
        clear_notifications();
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Change User Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SweetAlertWrapper
                    show={showAlert}
                    title="Notification"
                    type={alertMessage.type || "info"}
                    message={alertMessage.text}
                    confirmBtnText="OK"
                    onConfirm={handleConfirm}
                />
                Are you sure you want to {action} the user?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Proceed
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default ChangeUserStatus;
