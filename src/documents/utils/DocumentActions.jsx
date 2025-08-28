// components/DocumentActions.jsx
import React from 'react';
import { ButtonGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const Tip = ({ tip, children }) => (
  <OverlayTrigger placement="top" overlay={<Tooltip>{tip}</Tooltip>}>
    <span>{children}</span>
  </OverlayTrigger>
);

const DocumentActions = ({
  onView,
  onRenew,
  onRemind,
  onEdit,
  onDelete,
  size = "sm",
}) => {
  return (
    <ButtonGroup aria-label="Document actions">
      <Tip tip="View">
        <Button variant="outline-secondary" size={size} onClick={onView}>👁️</Button>
      </Tip>
      <Tip tip="Renew">
        <Button variant="outline-success" size={size} onClick={onRenew}>♻️</Button>
      </Tip>
      <Tip tip="Send Reminder">
        <Button variant="outline-info" size={size} onClick={onRemind}>🔔</Button>
      </Tip>
      <Tip tip="Edit">
        <Button variant="outline-primary" size={size} onClick={onEdit}>✏️</Button>
      </Tip>
      <Tip tip="Delete">
        <Button variant="outline-danger" size={size} onClick={onDelete}>🗑️</Button>
      </Tip>
    </ButtonGroup>
  );
};

export default DocumentActions;
