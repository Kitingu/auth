// src/users/AssignDepartmentModal.jsx
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Modal, Button, Form, Alert, Spinner, InputGroup } from 'react-bootstrap';

import UserContext from '../context/users/userContext';
import DocumentsContext from '../context/documents/documentsContext';

const AssignDepartmentModal = ({ show, onHide, user, onSuccess }) => {
  // ===== Contexts =====
  const { fetchUsers } = useContext(UserContext) ?? {};
  const { departments = [], listDepartments, assignDepartmentToUser } = useContext(DocumentsContext) ?? {};

  // Keep a stable ref to listDepartments so its changing identity doesn’t retrigger effects
  const listRef = useRef(listDepartments);
  useEffect(() => {
    listRef.current = listDepartments;
  }, [listDepartments]);

  // ===== Local state =====
  const [loadingDepts, setLoadingDepts] = useState(false);
  const [deptErr, setDeptErr] = useState(null);

  const [selectedCode, setSelectedCode] = useState(''); // store as STRING
  const [manualCode, setManualCode] = useState(''); // STRING fallback

  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState(null);

  // ===== Initialize when modal opens (once per open) =====
  useEffect(() => {
    if (!show) return;

    setErr(null);
    setDeptErr(null);
    setManualCode('');

    // Initialize selection from user only on open
    const initial = user?.departmentCode != null ? String(user.departmentCode) : '';
    setSelectedCode(initial);

    // Load department list (await if it returns a promise)
    let active = true;
    (async () => {
      if (!listRef.current) return;
      setLoadingDepts(true);
      try {
        const maybe = listRef.current();
        if (maybe && typeof maybe.then === 'function') await maybe;
        if (!active) return;
        setDeptErr(null);
      } catch (e) {
        if (!active) return;
        setDeptErr(e?.message || 'Failed to load departments');
      } finally {
        if (!active) return;
        setLoadingDepts(false);
      }
    })();

    return () => {
      /* clean up this open cycle */
    };
    // ⛔️ Only depend on `show` and the specific code we derive from user
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, user?.departmentCode]);

  // ===== Validation =====
  const canSubmit = !!user && ((!deptErr && selectedCode) || (deptErr && manualCode.trim().length > 0));

  // ===== Submit =====
  const handleSubmit = async () => {
    setErr(null);
    if (!canSubmit) return;

    const departmentCode = !deptErr ? selectedCode : manualCode.trim();

    const userCode = String(user?.userCode ?? user?.code ?? user?.id ?? user?.userId ?? '');

    if (!userCode) {
      setErr('User code is missing.');
      return;
    }
    if (!assignDepartmentToUser) {
      setErr('assignDepartmentToUser action is not available.');
      return;
    }

    try {
      setSubmitting(true);
      const result = await assignDepartmentToUser(userCode, departmentCode);
      if (result && result.error) throw new Error(result.error);

      await fetchUsers?.();
      onHide?.();
      onSuccess?.();
    } catch (e) {
      setErr(e?.message || 'Failed to assign department');
    } finally {
      setSubmitting(false);
    }
  };

  // Helpers to normalize codes and labels from various shapes
  const toCode = (d) => String(d?.departmentCode ?? d?.code ?? d?.id ?? '');
  const toLabel = (d) => d?.departmentName ?? d?.name ?? d?.code ?? d?.departmentCode ?? '—';

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Assign Department</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {user && (
          <div className="mb-3 small text-muted">
            Assign department for <strong>{user.name || user.email || user.id}</strong>
          </div>
        )}

        {err && (
          <Alert variant="danger" className="mb-3">
            {err}
          </Alert>
        )}

        {!deptErr && (
          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select
              disabled={loadingDepts}
              value={selectedCode} // controlled; will persist
              onChange={(e) => setSelectedCode(e.target.value)} // store as string
            >
              <option value="">-- Select department --</option>
              {departments.map((d) => {
                const code = toCode(d);
                const label = toLabel(d);
                return (
                  <option key={code} value={code}>
                    {label}
                  </option>
                );
              })}
            </Form.Select>
            {loadingDepts && <div className="small text-muted mt-1">Loading departments…</div>}
          </Form.Group>
        )}

        {deptErr && (
          <>
            <Alert variant="warning" className="mb-2">
              Couldn’t load department list. Enter a department code manually.
            </Alert>
            <Form.Group className="mb-3">
              <Form.Label>Department Code</Form.Label>
              <InputGroup>
                <Form.Control placeholder="e.g. 13" value={manualCode} onChange={(e) => setManualCode(e.target.value)} />
              </InputGroup>
            </Form.Group>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={onHide} disabled={submitting}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit || submitting}>
          {submitting ? <Spinner size="sm" animation="border" /> : 'Assign'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignDepartmentModal;
