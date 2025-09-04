// components/Expiry.jsx
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Table, Badge, Form, Row, Col, ButtonGroup, Button, OverlayTrigger, Tooltip, Tabs, Tab } from 'react-bootstrap';
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
      return { text: 'Expires', variant: 'secondary', icon: '📄' };
    case 1:
      return { text: 'Almost Expired', variant: 'warning', icon: '🕒' };
    case 2:
      return { text: 'Active', variant: 'success', icon: '✔️' };
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
   - Renders only buttons for provided handlers
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
      {onView && (
        <Tip tip="View">
          <Button variant="outline-secondary" size={size} onClick={onView}>
            👁️
          </Button>
        </Tip>
      )}
      {onTrack && (
        <Tip tip="Add Tracking">
          <Button variant="outline-success" size={size} onClick={onTrack}>
            ➕
          </Button>
        </Tip>
      )}
      {onRenew && (
        <Tip tip="Renew Tracking">
          <Button variant="outline-primary" size={size} onClick={onRenew}>
            ♻️
          </Button>
        </Tip>
      )}
      {onRemind && (
        <Tip tip="Send Reminder">
          <Button variant="outline-info" size={size} onClick={onRemind}>
            🔔
          </Button>
        </Tip>
      )}
      {onEdit && (
        <Tip tip="Edit">
          <Button variant="outline-warning" size={size} onClick={onEdit}>
            ✏️
          </Button>
        </Tip>
      )}
      {onDelete && (
        <Tip tip="Delete">
          <Button variant="outline-danger" size={size} onClick={onDelete}>
            🗑️
          </Button>
        </Tip>
      )}
    </ButtonGroup>
  );
};

/* =======================
   Main: ExpiryTrackingList
   ======================= */
const ExpiryTrackingList = () => {
  const [activeTab, setActiveTab] = useState('tracked'); // 'tracked' | 'documents'

  // Selections are independent per tab
  const [selectedTracked, setSelectedTracked] = useState(new Set());
  const [selectedDocs, setSelectedDocs] = useState(new Set());

  const [showAdd, setShowAdd] = useState(false); // Add Tracking
  const [showRenew, setShowRenew] = useState(false); // Renew Tracking
  const [showAddDoc, setShowAddDoc] = useState(false); // Add Document
  const [activeDoc, setActiveDoc] = useState(null);

  const { documents = [], tracked_documents = [], listDocuments, listTrackedDocuments } = useContext(DocumentsContext);

  useEffect(() => {
    // Load both datasets on mount
    listDocuments?.();
    listTrackedDocuments?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = () => {
    listDocuments?.();
    listTrackedDocuments?.();
  };

  /* -----------------------
     Fallback sample records
     (used ONLY if context arrays are empty)
     ----------------------- */
  const sampleDocs = useMemo(
    () => [
      {
        documentCode: '0008',
        documentName: 'test',
        departmentCode: '05',
        isActive: true,
        dateCreated: '2025-09-03T12:30:11.53'
      }
    ],
    []
  );

  // const sampleTracked = useMemo(
  //   () => [
  //     {
  //       trackingCode: '00006',
  //       departmentName: 'IT',
  //       documentCode: '0008',
  //       documentName: 'test',
  //       departmentCode: '05',
  //       issueDate: '2025-09-03T06:31:01.446',
  //       expiryDate: '2025-12-03T06:31:01.446',
  //       renewalDate: null,
  //       isRenewed: false,
  //       lastReminderSent: null,
  //       notes: '',
  //       hasNotification: true,
  //       documentStatus: 2
  //     }
  //   ],
  //   []
  // );

  const trackedList = Array.isArray(tracked_documents) && tracked_documents.length > 0 ? tracked_documents : [];
  const docsList = Array.isArray(documents) && documents.length > 0 ? documents : sampleDocs;

  /* -----------------------
     Utilities: selection per tab
     ----------------------- */
  const allCheckedTracked = useMemo(
    () => trackedList.length > 0 && selectedTracked.size === trackedList.length,
    [trackedList, selectedTracked]
  );
  const allCheckedDocs = useMemo(() => docsList.length > 0 && selectedDocs.size === docsList.length, [docsList, selectedDocs]);

  const toggleAllTracked = (e) => {
    const next = new Set();
    if (e.target.checked) trackedList.forEach((d, idx) => next.add(d.trackingCode ?? d.id ?? idx));
    setSelectedTracked(next);
  };
  const toggleAllDocs = (e) => {
    const next = new Set();
    if (e.target.checked) docsList.forEach((d, idx) => next.add(d.documentCode ?? d.id ?? idx));
    setSelectedDocs(next);
  };

  const toggleOneTracked = (id) => {
    const next = new Set(selectedTracked);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedTracked(next);
  };
  const toggleOneDoc = (id) => {
    const next = new Set(selectedDocs);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedDocs(next);
  };

  /* -----------------------
     Badges
     ----------------------- */
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

      <Tabs id="documents-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'tracked')} className="mt-3">
        {/* =======================
            TAB: Tracked Documents
           ======================= */}

        {/* =======================
            TAB: Documents (All)
           ======================= */}
        <Tab eventKey="documents" title="Documents">
          <Table hover responsive className="align-middle border mt-3">
            <thead className="table-light">
              <tr>
                <th style={{ width: 36 }}>
                  <Form.Check type="checkbox" checked={allCheckedDocs} onChange={toggleAllDocs} aria-label="Select all documents" />
                </th>
                <th>Title</th>
                {/* <th>Department</th> */}
                <th>Created</th>
                <th>Active</th>
                <th style={{ width: 240 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {docsList.map((doc, idx) => {
                const id = doc.documentCode ?? doc.id ?? idx;
                const title = doc.documentName || (doc.documentCode ? `Document #${doc.documentCode}` : 'Untitled');
                const department = doc.departmentName || doc.departmentCode || '—';

                return (
                  <tr key={`doc-${id}`}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={selectedDocs.has(id)}
                        onChange={() => toggleOneDoc(id)}
                        aria-label={`Select ${title}`}
                      />
                    </td>
                    <td className="fw-semibold">{title}</td>
                    {/* <td>{department}</td> */}
                    <td>{fmt(doc.dateCreated || doc.created)}</td>
                    <td>{doc.isActive ? <Badge bg="success">Active</Badge> : <Badge bg="secondary">Inactive</Badge>}</td>
                    <td>
                      <DocumentActions
                        // onView={() => console.log('view doc', id)}
                        onTrack={() => {
                          setActiveDoc(doc);
                          setShowAdd(true);
                        }}
                        // No renew/remind for plain documents
                        // onEdit={() => console.log('edit doc', id)}
                        // onDelete={() => console.log('delete doc', id)}
                      />
                    </td>
                  </tr>
                );
              })}

              {docsList.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    No documents found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="tracked" title="Tracked Documents">
          <Table hover responsive className="align-middle border mt-3">
            <thead className="table-light">
              <tr>
                <th style={{ width: 36 }}>
                  <Form.Check type="checkbox" checked={allCheckedTracked} onChange={toggleAllTracked} aria-label="Select all tracked" />
                </th>
                <th>Title</th>
                <th>Department</th>
                <th>Issue Date</th>
                <th>Expiry</th>
                <th>Status</th>
                {/* <th>Approval</th> */}
                <th>Notification</th>
                <th style={{ width: 260 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trackedList.map((doc, idx) => {
                const id = doc.trackingCode ?? doc.id ?? idx;
                const title = doc.documentName || (doc.trackingCode ? `Document #${doc.trackingCode}` : 'Untitled');
                const department = doc.departmentName || doc.departmentCode || '—';

                return (
                  <tr key={`tracked-${id}`}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={selectedTracked.has(id)}
                        onChange={() => toggleOneTracked(id)}
                        aria-label={`Select ${title}`}
                      />
                    </td>
                    <td className="fw-semibold">{title}</td>
                    <td>{department}</td>
                    <td>{fmt(doc.issueDate || doc.created || doc.dateCreated)}</td>
                    <td>{fmt(doc.expiryDate || doc.expiry)}</td>
                    <td>{renderStatusBadge(doc)}</td>
                    {/* <td>{renderApprovalBadge(doc.approval)}</td> */}
                    <td>{doc.hasNotification ? <Badge bg="info">🔔 On</Badge> : <Badge bg="secondary">Off</Badge>}</td>
                    <td>
                      <DocumentActions
                        // onView={() => console.log('view tracked', id)}
                        onTrack={() => {
                          setActiveDoc(doc);
                          setShowAdd(true);
                        }}
                        onRenew={() => {
                          setActiveDoc(doc);
                          setShowRenew(true);
                        }}
                        // onRemind={() => console.log('remind', id)}
                        // onEdit={() => console.log('edit tracked', id)}
                        // onDelete={() => console.log('delete tracked', id)}
                      />
                    </td>
                  </tr>
                );
              })}

              {trackedList.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center text-muted py-4">
                    No tracked documents found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Tab>
      </Tabs>

      {/* Modals */}
      <RenewTrackingModal
        show={showRenew}
        onHide={() => setShowRenew(false)}
        trackingCode={activeDoc?.trackingCode} // ✅ correct prop for renew
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
        documentName={activeDoc?.documentName || activeDoc?.title || '—'} // display only
        documentCode={activeDoc?.documentCode} // sent as query param
        paramKey="documentCode" // or "documentId" if your API needs that
      />

      <AddDocumentModal show={showAddDoc} onHide={() => setShowAddDoc(false)} onSuccess={refresh} />
    </div>
  );
};

export default ExpiryTrackingList;
