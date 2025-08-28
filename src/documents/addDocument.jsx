// components/AddDocumentModal.jsx
import React, { useMemo, useState,useContext, useEffect } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import DocumentsContext from '../context/documents/documentsContext';

const AddDocumentModal = ({ show, onHide, onSuccess }) => {
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState(null);

  const documentContext = useContext(DocumentsContext)
  const {addDocumentDefinition} = documentContext

  useEffect(() => {
    if (show) {
      setName('');
      setErr(null);
    }
  }, [show]);



  const canSubmit = name.trim().length > 0;

  const handleSubmit = async () => {
    setErr(null);
    if (!canSubmit) return;
    try {
      setSubmitting(true);

      addDocumentDefinition(name)
      
      onHide?.();
      onSuccess?.();
    } catch (e) {
      setErr(e.message || 'Failed to create document');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {err && <Alert variant="danger" className="mb-3">{err}</Alert>}
        <Form>
          <Form.Group controlId="docName">
            <Form.Label>Document Name</Form.Label>
            <Form.Control
              placeholder="e.g. Employee Handbook 2025"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              required
            />
            <Form.Text className="text-muted">
              This modal only collects the document name.
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={onHide} disabled={submitting}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit || submitting}>
          {submitting ? <Spinner size="sm" animation="border" /> : 'Create'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDocumentModal;
