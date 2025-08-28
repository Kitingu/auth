// Docs.jsx (DocumentCard) — keep name the same
import React, { useMemo } from 'react';
import { Badge, Card, Row, Col, Stack } from 'react-bootstrap';

// Small helpers
const fmt = (d) => (d ? new Date(d).toLocaleString() : '—');

const getStatusInfo = ({ expiryDate, isRenewed }) => {
  if (isRenewed) {
    return { text: '✅ Renewed', variant: 'success', icon: '✔️' };
  }
  const now = new Date();
  const exp = expiryDate ? new Date(expiryDate) : null;

  if (!exp || Number.isNaN(exp.getTime())) {
    return { text: '📄 Draft', variant: 'secondary', icon: '📄' };
  }

  if (exp < now) {
    return { text: 'Expired', variant: 'danger', icon: '⚠️' };
  }

  const daysLeft = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
  if (daysLeft <= 30) {
    return { text: `Due Soon (${daysLeft}d)`, variant: 'warning', icon: '🕒' };
  }

  return { text: 'Active', variant: 'primary', icon: '🟢' };
};

// Optional: map numeric documentStatus if your backend uses it (fallback to computed)
const mapDocStatusNumber = (n) => {
  switch (n) {
    case 0: return { text: 'Draft', variant: 'secondary', icon: '📄' };
    case 1: return { text: 'Under Review', variant: 'warning', icon: '🕒' };
    case 2: return { text: 'Approved', variant: 'success', icon: '✔️' };
    default: return null;
  }
};

const DocumentCard = (props) => {
  // Accept either the old prop shape or new API shape and normalize
  const normalized = useMemo(() => {
    const {
      // Old shape
      title,
      department,
      created,
      expiryDate,
      status,
      approval,
      // New shape
      trackingCode,
      departmentCode,
      issueDate,
      renewalDate,
      isRenewed,
      hasNotification,
      documentStatus,
      notes
    } = props;

    // Prefer explicit strings if provided (old API), else use new API fields
    const displayTitle =
      title ||
      (trackingCode ? `Document #${trackingCode}` : 'Untitled Document');

    const displayDept = department || departmentCode || '—';
    const createdAt = created || issueDate || null;
    const expiresAt = expiryDate || props.expiry || null;

    // If a string status is passed (old code), respect it; else compute from dates / numeric status
    let statusInfo =
      (typeof status === 'string' && {
        text: status,
        variant:
          status === 'Expired'
            ? 'danger'
            : status === 'Under Review'
            ? 'warning'
            : status === 'Draft'
            ? 'secondary'
            : status === 'Approved'
            ? 'success'
            : 'primary',
        icon:
          status === 'Expired'
            ? '⚠️'
            : status === 'Under Review'
            ? '🕒'
            : status === 'Draft'
            ? '📄'
            : status === 'Approved'
            ? '✔️'
            : '🟢',
      }) ||
      mapDocStatusNumber(documentStatus) ||
      getStatusInfo({ expiryDate: expiresAt, isRenewed });

    // Optional “approval” secondary badge (old API); ignore if not provided
    let approvalInfo =
      typeof props.approval === 'string'
        ? {
            text: props.approval,
            variant:
              props.approval === 'Approved'
                ? 'success'
                : props.approval === 'Under Review'
                ? 'warning'
                : props.approval === 'Draft'
                ? 'secondary'
                : 'light',
            icon:
              props.approval === 'Approved'
                ? '✔️'
                : props.approval === 'Under Review'
                ? '🕒'
                : '📄',
          }
        : null;

    return {
      displayTitle,
      displayDept,
      createdAt,
      expiresAt,
      renewalDate,
      isRenewed: !!isRenewed,
      hasNotification: !!hasNotification,
      statusInfo,
      approvalInfo,
      notes: notes || '',
    };
  }, [props]);

  const {
    displayTitle,
    displayDept,
    createdAt,
    expiresAt,
    renewalDate,
    hasNotification,
    statusInfo,
    approvalInfo,
    notes,
  } = normalized;

  return (
    <Card className="mb-2 shadow-sm border-0">
      <Card.Body>
        <Row className="align-items-center">
          <Col md={7}>
            <Stack gap={1}>
              <div className="d-flex align-items-center flex-wrap gap-2">
                <h5 className="mb-0">{displayTitle}</h5>
                <Badge bg="light" text="dark">{displayDept}</Badge>
                {hasNotification && <Badge bg="info">🔔 Notification</Badge>}
              </div>
              <div className="text-muted small">
                <span className="me-3">Created: {fmt(createdAt)}</span>
                <span>Expires: {fmt(expiresAt)}</span>
                {renewalDate && <span className="ms-3">Renewal: {fmt(renewalDate)}</span>}
              </div>
              {notes && <div className="small">{notes}</div>}
            </Stack>
          </Col>

          <Col md={5} className="text-md-end mt-3 mt-md-0">
            <Stack className="align-items-md-end" gap={2}>
              <Badge bg={statusInfo.variant} className="px-3 py-2">
                <span className="me-1">{statusInfo.icon}</span>
                {statusInfo.text}
              </Badge>
              {approvalInfo && (
                <Badge bg={approvalInfo.variant} className="px-3 py-2">
                  <span className="me-1">{approvalInfo.icon}</span>
                  {approvalInfo.text}
                </Badge>
              )}
            </Stack>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DocumentCard;
 