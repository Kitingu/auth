// src/users/AddUserModal.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form, Alert, Spinner, Row, Col } from 'react-bootstrap';
import UserContext from '../context/users/userContext';

const emailOk = (e) => /\S+@\S+\.\S+/.test(e || '');

const AddUserModal = ({ show, onHide, onSuccess }) => {
  const userContext = useContext(UserContext);
  const register = userContext?.register; // action from your context

  // Form state (matches API keys)
  const [firstName, setFirstName] = useState('');
  const [middName, setMiddName] = useState(''); // API uses "middName"
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [payrollNumber, setPayrollNumber] = useState('');
  const [accessAppsInput, setAccessAppsInput] = useState('0'); // comma-separated IDs, defaults to "0"

  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (show) {
      setFirstName('');
      setMiddName('');
      setLastName('');
      setEmail('');
      setPhoneNumber('');
      setPayrollNumber('');
      setAccessAppsInput('0');
      setErr(null);
    }
  }, [show]);

  const canSubmit =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    emailOk(email);

  const parseAccessApps = (txt) =>
    (txt || '')
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => Number.isFinite(n));

  const handleSubmit = async () => {
    setErr(null);
    if (!canSubmit) return;

    if (!register) {
      setErr('User registration is unavailable (missing context action).');
      return;
    }

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      middName: middName.trim(), // keep exact API spelling
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      payrollNumber: payrollNumber.trim(),
      accessApps: parseAccessApps(accessAppsInput)
    };

    try {
      setSubmitting(true);
      const res = await register(payload);
      // If your context throws on error, the catch will handle it.
      // If it returns a result with an error, handle here:
      if (res && res.error) {
        throw new Error(res.error || 'Failed to create user');
      }
      onHide?.();
      onSuccess?.();
    } catch (e) {
      setErr(e?.message || 'Failed to create user');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {err && <Alert variant="danger" className="mb-3">{err}</Alert>}

        <Form>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name*</Form.Label>
                <Form.Control
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  autoFocus
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="middName">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  value={middName}
                  onChange={(e) => setMiddName(e.target.value)}
                />
         
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name*</Form.Label>
                <Form.Control
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-3 mt-1">
            <Col md={6}>
              <Form.Group controlId="email">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="e.g. jane.doe@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={email.length > 0 && !emailOk(email)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter a valid email address.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  placeholder="+2547XXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-3 mt-1">
            <Col md={6}>
              <Form.Group controlId="payrollNumber">
                <Form.Label>Payroll Number</Form.Label>
                <Form.Control
                  placeholder="e.g. KABC3827"
                  value={payrollNumber}
                  onChange={(e) => setPayrollNumber(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="accessApps">
                <Form.Label>Access Apps (IDs, comma-separated)</Form.Label>
                <Form.Control
                  placeholder="e.g. 0, 2, 5"
                  value={accessAppsInput}
                  onChange={(e) => setAccessAppsInput(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Will be sent as an array of numbers.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={onHide} disabled={submitting}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
        >
          {submitting ? <Spinner size="sm" animation="border" /> : 'Create'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUserModal;
