import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // If using React Router
import SweetAlertWrapper from "../../components/Layout/sweetAlert";
import { Spinner } from 'react-bootstrap'; // Assuming you're using Bootstrap
import AuthContext from '../../context/auth/authContext';

const ChangePassword = () => {
    const [step, setStep] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [countdown, setCountdown] = useState(120);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ text: "", type: "" });

    const authContext = useContext(AuthContext);
    const { sendOtp, changePassword: changePasswordAPI, notification, clear_notifications } = authContext;

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    useEffect(() => {
        let timer;
        if (step === 2 && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [step, countdown]);

    useEffect(() => {
        if (notification) {
            setAlertMessage({
                text: notification.text,
                type: notification.type,
            });
            setShowAlert(true);
        }
    }, [notification]);

    const handleConfirm = () => {
        setShowAlert(false);
        clear_notifications();
    };

    const handlePhoneNumberSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await sendOtp(data.phoneNumber);
            if (response && response.responseCode === 1) {
                setPhoneNumber(data.phoneNumber);
                setStep(2);
            } else {
                setResponseMessage(response.responseMessage || 'Failed to send OTP. Please try again.');
            }
        } catch (error) {
            setResponseMessage('Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (data) => {
        setLoading(true);
        setResponseMessage('');
        try {
            const response = await changePasswordAPI(data);
            if (response && response.responseCode === 1) {
                setResponseMessage('Password changed successfully.');
            } else if (response.responseCode === 2) {
                setResponseMessage(response.responseMessage || 'Warning: Please check the details.');
            } else {
                setResponseMessage(response.responseMessage || 'Password change failed. Please try again.');
            }
        } catch (error) {
            setResponseMessage('Password change failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    const newPassword = watch('newPassword');

    return (
        
        <div className='container mt-4'>
            <SweetAlertWrapper
                show={showAlert}
                title="Notification"
                message={alertMessage.text}
                onConfirm={handleConfirm}
                confirmBtnText="OK"
                type={alertMessage.type || "info"}
            />

            <div className="card shadow-sm p-4 mb-4" style={{ maxWidth: '400px', margin: 'auto' }}>
                {step === 1 && (
                    <form onSubmit={handleSubmit(handlePhoneNumberSubmit)}>
                        <h4 className="mb-3">Step 1: Verify Phone Number</h4>
                        <div className="form-group mb-3">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                id="phoneNumber"
                                type="text"
                                {...register('phoneNumber', { required: 'Phone number is required' })}
                                className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                            />
                            {errors.phoneNumber && (
                                <div className="invalid-feedback">{errors.phoneNumber.message}</div>
                            )}
                        </div>

                        <div className="d-flex justify-content-between mt-2">
                            <button type="button" className="btn btn-link" onClick={handleBackToLogin}>
                                Back to Login
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : 'Next'}
                            </button>
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <h4 className="mb-3">Step 2: Reset Password</h4>
                        <div className="form-group mb-3">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                id="phoneNumber"
                                type="text"
                                value={phoneNumber}
                                readOnly
                                className="form-control"
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="otp">OTP</label>
                            <input
                                id="otp"
                                type="text"
                                {...register('otp', { required: 'OTP is required' })}
                                className={`form-control ${errors.otp ? 'is-invalid' : ''}`}
                            />
                            {errors.otp && <div className="invalid-feedback">{errors.otp.message}</div>}
                            {countdown > 0 && (
                                <small className="text-muted">
                                    Time remaining: {Math.floor(countdown / 60)}:{('0' + (countdown % 60)).slice(-2)} minutes
                                </small>
                            )}
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                id="newPassword"
                                type="password"
                                {...register('newPassword', {
                                    required: 'New password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters',
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: 'Password must be at most 100 characters',
                                    },
                                    validate: {
                                        hasUpperCase: value => /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
                                        hasLowerCase: value => /[a-z]/.test(value) || 'Password must contain at least one lowercase letter',
                                        hasNumber: value => /\d/.test(value) || 'Password must contain at least one digit',
                                        hasSpecialCharacter: value => /[^A-Za-z0-9]/.test(value) || 'Password must contain at least one non-alphanumeric character',
                                    },
                                })}
                                className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                            />
                            {errors.newPassword && (
                                <div className="invalid-feedback">{errors.newPassword.message}</div>
                            )}
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                {...register('confirmPassword', {
                                    required: 'Confirm password is required',
                                    validate: (value) => value === newPassword || 'Passwords do not match',
                                })}
                                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            />
                            {errors.confirmPassword && (
                                <div className="invalid-feedback">{errors.confirmPassword.message}</div>
                            )}
                        </div>

                        <div className="d-flex justify-content-between mt-2">
                            <button type="button" className="btn btn-link" onClick={handleBackToLogin}>
                                Back to Login
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : 'Reset Password'}
                            </button>
                        </div>


                    </form>
                )}

                {responseMessage && (
                    <div className={`alert mt-3 ${responseMessage.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
                        {responseMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChangePassword;
