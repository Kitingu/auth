import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import UserContext from '../../../context/users/userContext';

const InfoModal = ({ show, handleClose, userId }) => {
  const userContext = useContext(UserContext);
  const { resetPassword } = userContext;

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordReset = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const isConfirmed = window.confirm("Are you sure you want to reset the password?");
    if (isConfirmed) {
      resetPassword( newPassword);
      console.log(`Resetting password for user ID: ${userId}, New Password: ${newPassword}`);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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

export default InfoModal;
