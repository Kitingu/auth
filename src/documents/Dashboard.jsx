import React from 'react';
import { Nav } from 'react-bootstrap';

const DashboardHeader = () => {
  return (
    <div className="mb-4 border-bottom pb-2">
      <h2>Document Management System</h2>
      {/* <p className="text-muted">Manage departments, users, and document workflows</p> */}
      <Nav variant="tabs" defaultActiveKey="dashboard">
        <Nav.Item>
          <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="departments">Departments</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="documents">Documents</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default DashboardHeader;
