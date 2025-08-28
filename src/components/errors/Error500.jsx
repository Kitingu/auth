import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Error500 = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  requestId,           // optional: show correlation/request id
  onRetry,             // optional: handler to retry the last action
  supportEmail = 'support@protoenergy.com'
}) => {
  return (
    <div className="container py-5 text-center">
      <div className="mx-auto" style={{ maxWidth: 720 }}>
        <div className="display-4 fw-bold">😵</div>
        <h1 className="mt-3">{title}</h1>
        <p className="text-muted">{message}</p>

        <div className="d-flex justify-content-center gap-2 mt-3">
          {onRetry && (
            <Button variant="primary" onClick={onRetry}>Try again</Button>
          )}
          <Link className="btn btn-outline-secondary" to="/">Go home</Link>
          <a className="btn btn-outline-primary" href={`mailto:${supportEmail}?subject=App%20Error${requestId ? `%20(${requestId})` : ''}`}>
            Contact support
          </a>
        </div>

        <div className="mt-4 small text-muted">
          {requestId ? <>Request ID: <span className="fw-semibold">{requestId}</span> · </> : null}
          Error code: <span className="fw-semibold">500</span>
        </div>
      </div>
    </div>
  );
};

export default Error500;
