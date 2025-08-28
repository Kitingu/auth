// components/AddTrackingModal.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';

const ADD_TRACKING_URL = 'https://os.protoenergy.com/api/Documents/add-tracking-document';

const toLocalInput = (isoOrNull) => {
  if (!isoOrNull) return '';
  const d = new Date(isoOrNull);
  if (isNaN(d)) return '';
  const pad = (n) => `${n}`.padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const toIso = (local) => (local ? new Date(local).toISOString() : null);

/**
 * Accepts BOTH legacy and new prop names for backward compatibility:
 * - documentCode (new)
 * - initialDocumentCode (legacy)
 * Also optional aliases if your data comes under different keys:
 * - documentId, trackingCode
 */
const AddTrackingModal = ({
  show,
  onHide,
  onSuccess,
  documentName = '',
  documentCode = '',
  initialDocumentCode = '',  // legacy support
  documentId = '',           // alias
  trackingCode = '',         // alias
  paramKey = 'documentCode',
  authToken
}) => {
  const [issueDate, setIssueDate] = useState(toLocalInput(new Date().toISOString()));
  const [expiryDate, setExpiryDate] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState(null);

  // Compute a single value to send as the query param (string)
  const docParamValue = useMemo(() => {
    const v =
      documentCode ||
      initialDocumentCode || // legacy
      documentId ||
      trackingCode ||
      '';
    return v != null ? String(v).trim() : '';
  }, [documentCode, initialDocumentCode, documentId, trackingCode]);

  useEffect(() => {
    if (show) {
      setIssueDate(toLocalInput(new Date().toISOString()));
      setExpiryDate('');
      setErr(null);
    }
  }, [show]);

  const token = useMemo(
    () => authToken || localStorage.getItem('authToken') || localStorage.getItem('token'),
    [authToken]
  );

  const canSubmit = Boolean(issueDate && expiryDate && docParamValue);

  const handleSubmit = async () => {
    setErr(null);
    if (!canSubmit) {
      setErr('Missing required fields.');
      return;
    }

    const body = {
      issueDate: toIso(issueDate),
      expiryDate: toIso(expiryDate),
    };

    if (new Date(body.expiryDate) <= new Date(body.issueDate)) {
      setErr('Expiry date must be after Issue date.');
      return;
    }

    try {
      setSubmitting(true);

      const url = `${ADD_TRACKING_URL}?${encodeURIComponent(paramKey)}=${encodeURIComponent(docParamValue)}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(txt || `Request failed (${res.status})`);
      }

      onHide?.();
      onSuccess?.();
    } catch (e) {
      setErr(e.message || 'Failed to add tracking');
    } finally {
      setSubmitting(false);
    }
  };

  const disabledHint = !docParamValue
    ? `Missing ${paramKey} (document identifier).`
    : !issueDate
    ? 'Missing issue date.'
    : !expiryDate
    ? 'Missing expiry date.'
    : '';

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Tracking to Document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {err && <Alert variant="danger" className="mb-3">{err}</Alert>}

        {/* Read-only document info */}
        <Form.Group className="mb-3">
          <Form.Label>Document</Form.Label>
          <Form.Control
            plaintext
            readOnly
            value={documentName || docParamValue || '—'}
          />
          <Form.Text className="text-muted">
            {paramKey} is passed via URL parameter.
          </Form.Text>
        </Form.Group>

        <Form>
          <Form.Group className="mb-3" controlId="issueDate">
            <Form.Label>Issue Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-0" controlId="expiryDate">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </Form.Group>
        </Form>

        {!canSubmit && (
          <div className="small text-muted mt-2">{disabledHint}</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={onHide} disabled={submitting}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit} disabled={!canSubmit || submitting}>
          {submitting ? <Spinner size="sm" animation="border" /> : 'Add Tracking'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTrackingModal;
