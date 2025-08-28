import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const StatsCards = () => {
  return (
    <Row className="my-4">
      <Col md={3}>
        <Card>
          <Card.Body>
            <Card.Title>Total Documents</Card.Title>
            <h3>847</h3>
            <small className="text-success">+23 today</small>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card bg="danger" text="white">
          <Card.Body>
            <Card.Title>Expiring Soon</Card.Title>
            <h3>8</h3>
            <small className="text-light">+3 this week</small>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card>
          <Card.Body>
            <Card.Title>Active Users</Card.Title>
            <h3>156</h3>
            <small className="text-success">+8 this week</small>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card>
          <Card.Body>
            <Card.Title>Departments</Card.Title>
            <h3>12</h3>
            <small className="text-success">+2 this month</small>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default StatsCards;
