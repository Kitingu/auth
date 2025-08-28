import { useEffect, useState, useContext } from 'react';
import { Row, Col, Tabs, Tab, Table, Spinner, Button, Stack, Form } from 'react-bootstrap';
import MainCard from 'components/MainCard';
import DistributorContext from '../context/distributor/distributorContext';
import ConfirmActionModal from './actionsModal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { download_retailer_letter, download_multiple_dist_authLetters } from '../api/otogas';
import Pagination from '../components/Layout/Pagination.jsx';

export default function DistributorLettersStatus() {
  const [activeTab, setActiveTab] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Number of items per page
  const [totalPages, setTotalPages] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentLetterId, setCurrentLetterId] = useState(null);
  const [currentAction, setCurrentAction] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(null);
  const [selectedApprovedIds, setSelectedApprovedIds] = useState([]);
  const [exporting, setExporting] = useState(false);
  const distributorContext = useContext(DistributorContext);
  const {
    listDistributorLetters,
    distributor_auth_letters,
    approveDistributorAuthorizationLetter,
    rejectDistributorAuthorizationLetter,
    clear_notification,
    auth_letters_total_pages,
    auth_letters_count
  } = distributorContext;

  useEffect(() => {
    setPageNumber(1);
    setSelectedApprovedIds([]);
  }, [activeTab]);

  useEffect(() => {
    listDistributorLetters(pageNumber, pageSize, activeTab);
  }, [activeTab, pageNumber]);

  const formatDate = (dateStr) => (dateStr ? new Date(dateStr).toLocaleString() : '—');

  const handleCheckboxChange = (id) => {
    setSelectedApprovedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleDownload = async (letterId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }
    try {
        // download_distributor_letter
        //     const url = `api/AuthorizationLetter/download-authorisation-letter/${distributorCode}`;
      const response = await fetch(`https://os.protoenergy.com/api/AuthorizationLetter/download-authorisation-letter/${letterId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const contentDisposition = response.headers.get('content-disposition');

      // Check if the header exists before attempting to match
      let filename = `AuthorizationLetter-${letterId}.pdf`; // Default filename
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1];
        }
      }

      const fileBlob = await response.blob();
      const url = window.URL.createObjectURL(fileBlob);

      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      const approvedIds = distributor_auth_letters.map((l) => l.id);
      setSelectedApprovedIds(approvedIds);
    } else {
      setSelectedApprovedIds([]);
    }
  };

  const handleBulkDownload = async () => {
    if (selectedApprovedIds.length === 0) return;

    setExporting(true);
    try {
      await download_multiple_dist_authLetters(selectedApprovedIds);
    } catch (err) {
      console.error('Bulk download failed', err);
    } finally {
      setExporting(false);
    }
  };

  const handleConfirmAction = async () => {
    if (!currentLetterId || !currentAction) return;
    setLoadingAction(true);
    try {
      const actionMap = {
        approve: () => approveDistributorAuthorizationLetter([currentLetterId]),
        reject: () => rejectDistributorAuthorizationLetter([currentLetterId])
      };
      await actionMap[currentAction]?.();
      clear_notification();
      setShowConfirmModal(false);
      setCurrentAction(null);
      setCurrentLetterId(null);
      listDistributorLetters(pageNumber, pageSize, activeTab);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAction(false);
    }
  };

  const renderTableRows = () => {
    if (!distributor_auth_letters) {
      return (
        <tr>
          <td colSpan="10" className="text-center">
            <Spinner animation="border" size="sm" className="me-2" />
            Loading...
          </td>
        </tr>
      );
    }

    if (distributor_auth_letters.length === 0) {
      return (
        <tr>
          <td colSpan="10" className="text-center">
            No letters found.
          </td>
        </tr>
      );
    }

    return distributor_auth_letters.map((letter) => (
      <tr key={letter.id}>
        {activeTab === 1 && (
          <td>
            <Form.Check
              type="checkbox"
              checked={selectedApprovedIds.includes(letter.id)}
              onChange={() => handleCheckboxChange(letter.id)}
            />
          </td>
        )}
        <td>{letter.retailerCode}</td>
        <td>{letter.businessName || '—'}</td>
        <td>{letter.businessOwnerName || '—'}</td>
        <td>{letter.phoneNumber || '—'}</td>
        <td>{letter.email || '—'}</td>
        <td>{letter.initiatedByUserCode}</td>
        <td>{formatDate(letter.initiatedAt)}</td>
        <td>{formatDate(letter.approvedAt)}</td>
        <td>
          <DropdownButton as={ButtonGroup} title="Actions" variant="secondary" size="sm">
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
                {loadingDownload === letter.id ? 'Downloading...' : 'Download'}
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
                <Button variant="outline-secondary" onClick={handleBulkDownload} disabled={selectedApprovedIds.length === 0 || exporting}>
                  {exporting ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                      Exporting...
                    </>
                  ) : (
                    'Export Selected'
                  )}
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
                {activeTab === 1 && (
                  <th>
                    <Form.Check
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={distributor_auth_letters.length > 0 && selectedApprovedIds.length === distributor_auth_letters.length}
                    />
                  </th>
                )}
                <th>Distributor Code</th>
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

          <Pagination
            currentPage={pageNumber}
            totalPages={auth_letters_total_pages}
            setCurrentPage={setPageNumber}
            itemsPerPage={pageSize}
            totalItems={auth_letters_count}
          />

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
