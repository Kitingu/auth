import React, { useState } from 'react';
import SweetAlertWrapper from "../sweetAlert";

const ConfirmationDialog = ({
    show,
    title,
    message,
    onConfirm,
    onCancel,
    confirmBtnText = 'Yes',
    cancelBtnText = 'No',
    type = 'warning'
}) => {
    return (
        <SweetAlertWrapper
            show={show}
            title={title}
            message={message}
            onConfirm={onConfirm}
            onCancel={onCancel}
            confirmBtnText={confirmBtnText}
            cancelBtnText={cancelBtnText}
            type={type}
        />
    );
};
export default ConfirmationDialog;