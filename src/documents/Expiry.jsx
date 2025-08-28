// components/Expiry.jsx
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Table, Badge, Form, Row, Col, ButtonGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import DocumentsContext from '../context/documents/documentsContext';
import AddTrackingModal from './addTracking';
import RenewTrackingModal from './renewTracking';
import AddDocumentModal from './addDocument';

/* =======================
   Helpers (dates & status)
   ======================= */
const fmt = (d) => (d ? new Date(d).toLocaleString() : '—');

const mapDocStatusNumber = (n) => {
  switch (n) {
    case 0:
      return { text: 'Draft', variant: 'secondary', icon: '📄' };
    case 1:
      return { text: 'Under Review', variant: 'warning', icon: '🕒' };
    case 2:
      return { text: 'Approved', variant: 'success', icon: '✔️' };
    default:
      return null;
  }
};

const getComputedStatus = ({ expiryDate, isRenewed }) => {
  if (isRenewed) return { text: 'Renewed', variant: 'success', icon: '✔️' };

  const now = new Date();
  const exp = expiryDate ? new Date(expiryDate) : null;

  if (!exp || Number.isNaN(exp.getTime())) {
    return { text: 'Draft', variant: 'secondary', icon: '📄' };
  }
  if (exp < now) return { text: 'Expired', variant: 'danger', icon: '⚠️' };

  const daysLeft = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
  if (daysLeft <= 30) return { text: `Due Soon (${daysLeft}d)`, variant: 'warning', icon: '🕒' };

  return { text: 'Active', variant: 'primary', icon: '🟢' };
};

/* =======================
   Tiny Tooltip wrapper
   ======================= */
const Tip = ({ tip, children }) => (
  <OverlayTrigger placement="top" overlay={<Tooltip>{tip}</Tooltip>}>
    <span>{children}</span>
  </OverlayTrigger>
);

/* =======================
   Row Actions
   ======================= */
const DocumentActions = ({
  onView,
  onTrack, // Add Tracking to Document
  onRenew, // Renew Tracking
  onRemind,
  onEdit,
  onDelete,
  size = 'sm'
}) => {
  return (
    <ButtonGroup aria-label="Document actions">
      <Tip tip="View">
        <Button variant="outline-secondary" size={size} onClick={onView}>
          👁️
        </Button>
      </Tip>
      <Tip tip="Add Tracking">
        <Button variant="outline-success" size={size} onClick={onTrack}>
          ➕
        </Button>
      </Tip>
      <Tip tip="Renew Tracking">
        <Button variant="outline-primary" size={size} onClick={onRenew}>
          ♻️
        </Button>
      </Tip>
      <Tip tip="Send Reminder">
        <Button variant="outline-info" size={size} onClick={onRemind}>
          🔔
        </Button>
      </Tip>
      <Tip tip="Edit">
        <Button variant="outline-warning" size={size} onClick={onEdit}>
          ✏️
        </Button>
      </Tip>
      <Tip tip="Delete">
        <Button variant="outline-danger" size={size} onClick={onDelete}>
          🗑️
        </Button>
      </Tip>
    </ButtonGroup>
  );
};

/* =======================
   Main: ExpiryTrackingList
   ======================= */
const ExpiryTrackingList = () => {
  const [selected, setSelected] = useState(new Set());
  const [page] = useState(1);
  const [pageSize] = useState(10);

  const [showAdd, setShowAdd] = useState(false); // Add Tracking
  const [showRenew, setShowRenew] = useState(false); // Renew Tracking
  const [showAddDoc, setShowAddDoc] = useState(false); // Add Document
  const [activeDoc, setActiveDoc] = useState(null);

  const { documents = [], listTrackedDocuments } = useContext(DocumentsContext);

  useEffect(() => {
    // If your action supports paging, pass (page, pageSize)
    listTrackedDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = () => listTrackedDocuments();

  const allChecked = useMemo(() => documents.length > 0 && selected.size === documents.length, [documents, selected]);

  const toggleAll = (e) => {
    const next = new Set();
    if (e.target.checked) documents.forEach((d) => next.add(d.trackingCode ?? d.id));
    setSelected(next);
  };

  const toggleOne = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const renderStatusBadge = (doc) => {
    const s =
      mapDocStatusNumber(doc.documentStatus) ||
      getComputedStatus({
        expiryDate: doc.expiryDate || doc.expiry,
        isRenewed: doc.isRenewed
      });
    return (
      <Badge bg={s.variant} className="px-2 py-1">
        <span className="me-1">{s.icon}</span>
        {s.text}
      </Badge>
    );
  };

  const renderApprovalBadge = (approval) => {
    if (!approval) return null;
    const map = {
      Active: { variant: 'success', icon: '✔️' },
      'Almost Expiring': { variant: 'warning', icon: '🕒' },
      Expired: { variant: 'secondary', icon: '📄' }
    };
    const m = map[approval] || { variant: 'light', icon: '•' };
    return (
      <Badge bg={m.variant} className="px-2 py-1">
        <span className="me-1">{m.icon}</span>
        {approval}
      </Badge>
    );
  };

  return (
    <div className="mt-4">
      <Row className="align-items-end">
        <Col>
          <h4 className="mb-1">Document Expiry Tracking</h4>
          <p className="text-muted mb-3">Monitor document expiration dates and renewal status</p>
        </Col>
        <Col className="text-end">
          <button className="btn btn-primary btn-sm" onClick={() => setShowAddDoc(true)}>
            ➕ Add Document
          </button>
        </Col>
      </Row>

      <Table hover responsive className="align-middle border mt-3">
        <thead className="table-light">
          <tr>
            <th style={{ width: 36 }}>
              <Form.Check type="checkbox" checked={allChecked} onChange={toggleAll} aria-label="Select all" />
            </th>
            <th> Title</th>
            <th>Department</th>
            <th>Issue Date</th>
            <th>Expiry</th>
            <th>Status</th>
            <th>Approval</th>
            <th>Notification</th>
            <th style={{ width: 260 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, idx) => {
            const id = doc.trackingCode ?? doc.id ?? idx;
            const title = doc.documentName || (doc.trackingCode ? `Document #${doc.trackingCode}` : 'Untitled');
            const department = doc.department || doc.departmentCode || '—';

            return (
              <tr key={id}>
                <td>
                  <Form.Check type="checkbox" checked={selected.has(id)} onChange={() => toggleOne(id)} aria-label={`Select ${title}`} />
                </td>
                <td className="fw-semibold">
                  {title}
                  
                </td>
                <td>{department}</td>
                <td>{fmt(doc.issueDate || doc.created)}</td>
                <td>{fmt(doc.expiryDate || doc.expiry)}</td>
                <td>{renderStatusBadge(doc)}</td>
                <td>{renderApprovalBadge(doc.approval)}</td>
                <td>{doc.hasNotification ? <Badge bg="info">🔔 On</Badge> : <Badge bg="secondary">Off</Badge>}</td>
                <td>
                  <DocumentActions
                    onView={() => console.log('view', id)}
                    onTrack={() => {
                      setActiveDoc(doc);
                      setShowAdd(true);
                    }}
                    onRenew={() => {
                      setActiveDoc(doc);
                      setShowRenew(true);
                    }}
                    onRemind={() => console.log('remind', id)}
                    onEdit={() => console.log('edit', id)}
                    onDelete={() => console.log('delete', id)}
                  />
                </td>
              </tr>
            );
          })}

          {documents.length === 0 && (
            <tr>
              <td colSpan={9} className="text-center text-muted py-4">
                No documents found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modals */}
 

      <RenewTrackingModal
        show={showRenew}
        onHide={() => setShowRenew(false)}
        trackingCode={activeDoc?.documentCode}
        initialExpiryDate={activeDoc?.expiryDate}
        initialRenewalDate={activeDoc?.renewalDate}
        initialDocumentStatus={activeDoc?.documentStatus ?? 1}
        initialHasNotification={activeDoc?.hasNotification ?? true}
        onSuccess={refresh}
      />

      <AddTrackingModal
        show={showAdd}
        onHide={() => setShowAdd(false)}
        onSuccess={refresh}
        documentName={activeDoc?.title || "test anma"} // display only
        documentCode={activeDoc?.documentCode} // sent as query param
        paramKey="documentCode" // or "documentId" if your API needs that
      />

      <AddDocumentModal
       show={showAddDoc}
       onHide={() => setShowAddDoc(false)}
       onSuccess={refresh}
       />

    </div>
  );
};

export default ExpiryTrackingList;
