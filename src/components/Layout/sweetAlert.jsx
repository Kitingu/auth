import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

const SweetAlertWrapper = ({ 
    show, 
    title, 
    message, 
    onConfirm, 
    onCancel, 
    confirmBtnText = "OK", 
    cancelBtnText = "Cancel", 
    showCancelButton = false,
    confirmBtnBsStyle = "primary",
    cancelBtnBsStyle = "secondary",
    type = "info",
    children
}) => {
    return (
        <SweetAlert
            show={show}
            title={title}
            type={type}
            onConfirm={onConfirm}
            onCancel={onCancel}
            showCancel={showCancelButton}
            confirmBtnText={confirmBtnText}
            cancelBtnText={cancelBtnText}
            confirmBtnBsStyle={confirmBtnBsStyle}
            cancelBtnBsStyle={cancelBtnBsStyle}
        >
            {message}
            {children}
        </SweetAlert>
    );
};

export default SweetAlertWrapper;
