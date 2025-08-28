import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Error404 = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  const onSearch = (e) => {
    e.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <div className="container py-5 text-center">
      <div className="mx-auto" style={{ maxWidth: 720 }}>
        <div className="display-4 fw-bold">404</div>
        <h1 className="mt-2">Page not found</h1>
        <p className="text-muted mb-4">
          We couldn’t find the page you were looking for. It may have been moved or deleted.
        </p>

        <Form onSubmit={onSearch} className="mb-3">
          <InputGroup>
            <Form.Control
              placeholder="Search documents, users, departments…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <Button type="submit" variant="primary">Search</Button>
          </InputGroup>
        </Form>

        <div className="d-flex justify-content-center gap-2">
          <Button variant="outline-secondary" onClick={() => navigate(-1)}>Go back</Button>
          <Link className="btn btn-primary" to="/">Go home</Link>
        </div>

        <div className="mt-4 small text-muted">
          Error code: <span className="fw-semibold">404</span>
        </div>
      </div>
    </div>
  );
};

export default Error404;
