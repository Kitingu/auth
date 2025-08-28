import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Error403 = ({ supportEmail = 'support@protoenergy.com' }) => {
  const navigate = useNavigate();

  return (
    <div className="container py-5 text-center">
      <div className="mx-auto" style={{ maxWidth: 720 }}>
        <div className="display-4 fw-bold">403</div>
        <h1 className="mt-2">Access denied</h1>
        <p className="text-muted mb-4">
          You don’t have permission to view this resource. If you think this is a mistake,
          contact an admin or request access.
        </p>

        <div className="d-flex justify-content-center gap-2">
          <Button variant="primary" onClick={() => navigate(-1)}>Go back</Button>
          <Link className="btn btn-outline-secondary" to="/">Go home</Link>
          <a className="btn btn-outline-primary" href={`mailto:${supportEmail}?subject=Access%20Request`}>
            Request access
          </a>
        </div>

        <div className="mt-4 small text-muted">
          Error code: <span className="fw-semibold">403</span>
        </div>
      </div>
    </div>
  );
};

export default Error403;
