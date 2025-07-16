import { useEffect, useState, useContext } from 'react';
import { Row, Col, Tabs, Tab, Table, Spinner, Button, Stack } from 'react-bootstrap';
import MainCard from 'components/MainCard';
import DistributorContext from '../context/distributor/distributorContext';
import SweetAlertWrapper from '../components/Layout/sweetAlert';
import ConfirmActionModal from './actionsModal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { download_retailer_letter, download_multiple_authLetters } from '../api/otogas';

export default function LettersStatus() {
  const [activeTab, setActiveTab] = useState(0); // 0 = pending, 1 = approved, 2 = rejected
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentLetterId, setCurrentLetterId] = useState(null);
  const [currentAction, setCurrentAction] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(null);

  const distributorContext = useContext(DistributorContext);
  const { listAuthLetters, auth_letters, notification, approveAuthorizationLetter, rejectAuthorizationLetter } = distributorContext;

  useEffect(() => {
    setPageNumber(1);
  }, [activeTab]);

  useEffect(() => {
    listAuthLetters(pageNumber, pageSize, activeTab);
  }, [activeTab, pageNumber]);

  const formatDate = (dateStr) => (dateStr ? new Date(dateStr).toLocaleString() : '—');

  const handleConfirmAction = async () => {
    if (!currentLetterId || !currentAction) return;

    setLoadingAction(true);
    try {
      const actionMap = {
        approve: () => approveAuthorizationLetter([currentLetterId]),
        reject: () => rejectAuthorizationLetter([currentLetterId])
      };

      await actionMap[currentAction]?.();

      setShowConfirmModal(false);
      setCurrentAction(null);
      setCurrentLetterId(null);
      listAuthLetters(pageNumber, pageSize, activeTab);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDownload = async (letterId) => {
    setLoadingDownload(letterId);
    try {
      await download_retailer_letter(letterId);
    } catch (err) {
      console.error('Download failed', err);
    } finally {
      setLoadingDownload(null);
    }
  };

  const handleBulkDownload = async () => {
    try {
      const approvedIds = auth_letters.filter((l) => l.status === 'approved').map((l) => l.id);
      await download_multiple_authLetters(approvedIds);
    } catch (err) {
      console.error('Bulk download failed', err);
    }
  };

  const renderTableRows = () => {
    if (!auth_letters) {
      return (
        <tr>
          <td colSpan="9" className="text-center">
            <Spinner animation="border" size="sm" className="me-2" />
            Loading...
          </td>
        </tr>
      );
    }

    if (auth_letters.length === 0) {
      return (
        <tr>
          <td colSpan="9" className="text-center">
            No letters found.
          </td>
        </tr>
      );
    }

    return auth_letters.map((letter) => (
      <tr key={letter.id}>
        <td>{letter.retailerCode}</td>
        <td>{letter.businessName || '—'}</td>
        <td>{letter.businessOwnerName || '—'}</td>
        <td>{letter.phoneNumber || '—'}</td>
        <td>{letter.email || '—'}</td>
        <td>{letter.initiatedByUserCode}</td>
        <td>{formatDate(letter.initiatedAt)}</td>
        <td>{formatDate(letter.approvedAt)}</td>
        <td>
          <DropdownButton as={ButtonGroup} title="Actions" id={`letter-actions-${letter.id}`} variant="secondary" size="sm">
            {activeTab === 0 && (
              <>
                <Dropdown.Item
                  onClick={() => {
                    setCurrentLetterId(letter.id);
                    setCurrentAction('approve');
                    setShowConfirmModal(true);
                  }}
                >
                  Approve
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setCurrentLetterId(letter.id);
                    setCurrentAction('reject');
                    setShowConfirmModal(true);
                  }}
                >
                  Reject
                </Dropdown.Item>
              </>
            )}

            {activeTab === 1 && (
              <Dropdown.Item onClick={() => handleDownload(letter.id)} disabled={loadingDownload === letter.id}>
                {loadingDownload === letter.id ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Downloading...
                  </>
                ) : (
                  'Download Letter'
                )}
              </Dropdown.Item>
            )}

            {activeTab === 2 && <Dropdown.Item disabled>Rejected</Dropdown.Item>}
          </DropdownButton>
        </td>
      </tr>
    ));
  };

  return (
    <Row>
      <Col sm={12}>
        <MainCard
          title="Authorization Letters"
          subheader="Filter by status"
          secondary={
            activeTab === 1 && (
              <Stack direction="horizontal" gap={2}>
                <Button variant="outline-secondary" onClick={handleBulkDownload}>
                  Export All Approved
                </Button>
              </Stack>
            )
          }
        >
          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(parseInt(k))} className="mb-3">
            <Tab eventKey={0} title="Pending" />
            <Tab eventKey={1} title="Approved" />
            <Tab eventKey={2} title="Rejected" />
          </Tabs>

          <Table responsive bordered striped>
            <thead>
              <tr>
                <th>Retailer Code</th>
                <th>Business Name</th>
                <th>Owner</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Initiated By</th>
                <th>Initiated At</th>
                <th>Approved At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <Button variant="primary" disabled={pageNumber === 1} onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}>
              Previous
            </Button>
            <span>
              Page {pageNumber} of {totalPages}
            </span>
            <Button variant="secondary" disabled={pageNumber >= totalPages} onClick={() => setPageNumber((prev) => prev + 1)}>
              Next
            </Button>
          </div>

          <ConfirmActionModal
            show={showConfirmModal}
            onHide={() => setShowConfirmModal(false)}
            onConfirm={handleConfirmAction}
            title={`Confirm ${currentAction}`}
            message={`Are you sure you want to ${currentAction} this letter?`}
            loading={loadingAction}
          />
        </MainCard>
      </Col>
    </Row>
  );
}
