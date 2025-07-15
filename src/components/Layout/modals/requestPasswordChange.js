import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import UserContext from '../../../context/users/userContext';

const PasswordResetModal = ({ show, handleClose, userId }) => {
  const userContext = useContext(UserContext);
  const { resetPassword } = userContext;

  const [phoneNumber, setphoneNumber] = useState('');


  const handlePasswordResetRequest = () => {
    if (phoneNumber !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const isConfirmed = window.confirm("Are you sure you want to reset the password?");
    if (isConfirmed) {
      resetPassword( phoneNumber);
      console.log(`Resetting password for user ID: ${userId}, New Password: ${phoneNumber}`);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Request password reset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="phoneNumber">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setphoneNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePasswordReset}>
          Reset Password
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PasswordResetModal;
