// components/RenewTrackingModal.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';

const RENEW_BASE = 'https://os.protoenergy.com/api/Documents/renew-tracking-document';

const toLocalInput = (isoOrNull) => {
  if (!isoOrNull) return '';
  const d = new Date(isoOrNull);
  if (isNaN(d)) return '';
  const pad = (n) => `${n}`.padStart(2, '0');
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
};

const toIso = (local) => (local ? new Date(local).toISOString() : null);

const RenewTrackingModal = ({
  show,
  onHide,
  trackingCode, // required by API (query param)
  initialExpiryDate = '',
  initialRenewalDate = '',
  initialDocumentStatus = 1, // 0 Draft, 1 Under Review, 2 Approved
  initialHasNotification = true,
  authToken,
  onSuccess
}) => {
  const [expiryDate, setExpiryDate] = useState(toLocalInput(initialExpiryDate));
  const [renewalDate, setRenewalDate] = useState(toLocalInput(initialRenewalDate || new Date().toISOString()));
  const [documentStatus, setDocumentStatus] = useState(initialDocumentStatus);
  const [hasNotification, setHasNotification] = useState(initialHasNotification);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (show) {
      setExpiryDate(toLocalInput(initialExpiryDate));
      setRenewalDate(toLocalInput(initialRenewalDate || new Date().toISOString()));
      setDocumentStatus(initialDocumentStatus);
      setHasNotification(initialHasNotification);
      setErr(null);
    }
  }, [show, initialExpiryDate, initialRenewalDate, initialDocumentStatus, initialHasNotification]);

  const token = useMemo(() => authToken || localStorage.getItem('authToken') || localStorage.getItem('token'), [authToken]);

  const canSubmit = trackingCode && expiryDate && renewalDate;

  const handleSubmit = async () => {
    setErr(null);
    if (!canSubmit) return;

    const body = {
      expiryDate: toIso(expiryDate),
      renewalDate: toIso(renewalDate),
      documentStatus: Number(documentStatus),
      hasNotification: !!hasNotification
    };

    if (new Date(body.renewalDate) < new Date()) {
      // optional guard: renewal should be now/forward (adjust if you allow backdating)
    }

    try {
      setSubmitting(true);

      const url = `${RENEW_BASE}?trackingCode=${encodeURIComponent(trackingCode)}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(txt || `Request failed (${res.status})`);
      }

      onHide?.();
      onSuccess?.(); // e.g., refresh list
    } catch (e) {
      setErr(e.message || 'Failed to renew tracking');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Renew Tracking Document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {err && (
          <Alert variant="danger" className="mb-3">
            {err}
          </Alert>
        )}

        <Form>
          <Form.Group className="mb-2">
            <Form.Label className="fw-semibold">Tracking Code</Form.Label>
            <Form.Control value={trackingCode || ''} disabled />
            <Form.Text className="text-muted">Sent as query parameter.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="renewExpiry">
            <Form.Label>New Expiry Date</Form.Label>
            <Form.Control type="datetime-local" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="renewDate">
            <Form.Label>Renewal Date</Form.Label>
            <Form.Control type="datetime-local" value={renewalDate} onChange={(e) => setRenewalDate(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="status">
            <Form.Label>Document Status</Form.Label>
            <Form.Select value={documentStatus} onChange={(e) => setDocumentStatus(e.target.value)}>
              <option value={0}>Draft</option>
              <option value={1}>Under Review</option>
              <option value={2}>Approved</option>
            </Form.Select>
          </Form.Group>

          <Form.Check
            type="switch"
            id="notifSwitch"
            label="Enable Notifications"
            checked={hasNotification}
            onChange={(e) => setHasNotification(e.target.checked)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={onHide} disabled={submitting}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit || submitting}>
          {submitting ? <Spinner size="sm" animation="border" /> : 'Renew'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RenewTrackingModal;
