// src/users/UsersPage.jsx
import React, {
  useEffect,
  useMemo,
  useContext,
  useRef,
  useState,
  useCallback
} from 'react';
import {
  Table,
  Row,
  Col,
  Badge,
  Form,
  Button,
  Spinner,
  Alert,
  OverlayTrigger,
  Tooltip,
  ButtonGroup,
  InputGroup
} from 'react-bootstrap';
import AddUserModal from './AddUserModal';
// ⬇️ Make sure the import path/case matches your file
import AssignDepartmentModal from './assignDepartmentModal';
// ⬇️ Update this path to wherever your Pagination component lives

import UserContext from '../context/users/userContext';
import Pagination from '../components/Layout/Pagination';

const Tip = ({ tip, children }) => (
  <OverlayTrigger placement="top" overlay={<Tooltip>{tip}</Tooltip>}>
    <span>{children}</span>
  </OverlayTrigger>
);

const UsersPage = () => {
  const userCtx = useContext(UserContext) ?? {};
  const {
    users: usersState,
    fetchUsers,
    loading: ctxLoading,
    error: ctxError
  } = userCtx;

  // Local fallbacks if context doesn't expose loading/error
  const [localLoading, setLocalLoading] = useState(false);
  const [localErr, setLocalErr] = useState(null);

  // --- Search + Pagination state ---
  const [query, setQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Keep a stable ref to fetchUsers to avoid effect loops
  const fetchRef = useRef(fetchUsers);
  useEffect(() => {
    fetchRef.current = fetchUsers;
  }, [fetchUsers]);

  // Initial load (once)
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        if (ctxLoading === undefined) setLocalLoading(true);
        await fetchRef.current?.();
        if (!active) return;
        if (ctxError === undefined) setLocalErr(null);
      } catch (e) {
        if (!active) return;
        if (ctxError === undefined) setLocalErr(e?.message || 'Failed to load users');
      } finally {
        if (!active) return;
        if (ctxLoading === undefined) setLocalLoading(false);
      }
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = useCallback(async () => {
    try {
      if (ctxLoading === undefined) setLocalLoading(true);
      await fetchRef.current?.();
      if (ctxError === undefined) setLocalErr(null);
    } catch (e) {
      if (ctxError === undefined) setLocalErr(e?.message || 'Failed to load users');
    } finally {
      if (ctxLoading === undefined) setLocalLoading(false);
    }
  }, [ctxLoading, ctxError]);

  // Normalize users to an array
  const users = useMemo(
    () => (Array.isArray(usersState) ? usersState : usersState?.items ?? []),
    [usersState]
  );

  const loading = ctxLoading ?? localLoading;
  const err = ctxError ?? localErr;

  // --- Client-side filtering (search over name/email/departments) ---
  const normalizedQuery = query.trim().toLowerCase();
  const filteredUsers = useMemo(() => {
    if (!normalizedQuery) return users;

    const contains = (s) => (s ?? '').toString().toLowerCase().includes(normalizedQuery);

    return users.filter((u) => {
      const name = u.name || `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim();
      const email = u.email || '';

      // Dept(s) could be array or single fields
      const deptList = Array.isArray(u.departments)
        ? u.departments.map((d) => d?.name ?? d?.code ?? '').filter(Boolean)
        : u.departmentName
        ? [u.departmentName]
        : u.departmentCode
        ? [u.departmentCode]
        : [];

      return (
        contains(name) ||
        contains(email) ||
        deptList.some((d) => contains(d))
      );
    });
  }, [users, normalizedQuery]);

  // Reset to page 1 whenever the query or itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [normalizedQuery, itemsPerPage]);

  // --- Client-side pagination (because API isn’t paginated) ---
  const totalItems = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const pageUsers = filteredUsers.slice(startIndex, endIndex);

  // Selection + modals
  const [selected, setSelected] = useState(new Set());
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAssignDept, setShowAssignDept] = useState(false);
  const [activeUser, setActiveUser] = useState(null);

  const allChecked = useMemo(
    () => pageUsers.length > 0 && pageUsers.every((u) => selected.has(u.id ?? u.userId ?? u.email)),
    [pageUsers, selected]
  );

  const toggleAll = (e) => {
    const next = new Set(selected);
    if (e.target.checked) {
      pageUsers.forEach((u) => next.add(u.id ?? u.userId ?? u.email));
    } else {
      pageUsers.forEach((u) => next.delete(u.id ?? u.userId ?? u.email));
    }
    setSelected(next);
  };

  const toggleOne = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  return (
    <div className="mt-4">
      <Row className="align-items-end g-2">
        <Col md={6}>
          <h4 className="mb-1">Users</h4>
          <p className="text-muted mb-3">Manage users and their department assignments</p>
        </Col>
        <Col md={6} className="text-end">
          <div className="d-flex justify-content-end gap-2">
            <InputGroup style={{ maxWidth: 360 }}>
              <Form.Control
                size="sm"
                placeholder="Search by name, email, or department…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => setQuery('')}
                >
                  Clear
                </Button>
              )}
            </InputGroup>

            <Form.Select
              size="sm"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              style={{ width: 110 }}
              aria-label="Items per page"
            >
              <option value={10}>10 / page</option>
              <option value={25}>25 / page</option>
              <option value={50}>50 / page</option>
              <option value={100}>100 / page</option>
            </Form.Select>

            <Button size="sm" variant="primary" onClick={() => setShowAddUser(true)}>
              ➕ Add User
            </Button>
          </div>
        </Col>
      </Row>

      {err && <Alert variant="danger" className="mt-3">{String(err)}</Alert>}

      {loading ? (
        <div className="d-flex align-items-center gap-2 mt-3">
          <Spinner animation="border" size="sm" />
          <span>Loading users…</span>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="small text-muted">
              Showing <strong>{totalItems ? startIndex + 1 : 0}</strong>–<strong>{endIndex}</strong> of{' '}
              <strong>{totalItems}</strong> users
              {normalizedQuery && (
                <> (filtered by “<em>{normalizedQuery}</em>”)</>
              )}
            </div>
          </div>

          <Table hover responsive className="align-middle border mt-2">
            <thead className="table-light">
              <tr>
                <th style={{ width: 36 }}>
                  <Form.Check
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    aria-label="Select all on page"
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Departments</th>
                <th>Status</th>
                <th style={{ width: 220 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageUsers.map((u, idx) => {
                const id = u.id ?? u.userId ?? u.email ?? `${idx}-${startIndex}`;
                const name = u.name || `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim() || '—';
                const email = u.email || '—';
                const depts = Array.isArray(u.departments)
                  ? u.departments.map((d) => d?.name ?? d?.code).filter(Boolean)
                  : u.departmentName
                  ? [u.departmentName]
                  : u.departmentCode
                  ? [u.departmentCode]
                  : [];

                return (
                  <tr key={id}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={selected.has(id)}
                        onChange={() => toggleOne(id)}
                        aria-label={`Select ${name}`}
                      />
                    </td>
                    <td className="fw-semibold">{name}</td>
                    <td>{email}</td>
                    <td>
                      {depts.length > 0 ? (
                        depts.map((d, i) => (
                          <Badge key={`${id}-${d}-${i}`} bg="light" text="dark" className="me-1">
                            {d}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td>
                      {(u.isActive ?? true) ? (
                        <Badge bg="success">Active</Badge>
                      ) : (
                        <Badge bg="secondary">Inactive</Badge>
                      )}
                    </td>
                    <td>
                      <ButtonGroup>
                        <Tip tip="Assign Department">
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => {
                              setActiveUser(u);
                              setShowAssignDept(true);
                            }}
                          >
                            🏷️ Assign Dept
                          </Button>
                        </Tip>
                      </ButtonGroup>
                    </td>
                  </tr>
                );
              })}

              {pageUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    {normalizedQuery ? 'No results for your search.' : 'No users found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center mt-2">
            <div className="small text-muted">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </>
      )}

      {/* Modals */}
      <AddUserModal
        show={showAddUser}
        onHide={() => setShowAddUser(false)}
        onSuccess={refresh}
      />

      <AssignDepartmentModal
        show={showAssignDept}
        onHide={() => setShowAssignDept(false)}
        user={activeUser}
        onSuccess={refresh}
      />
    </div>
  );
};

export default UsersPage;
