import PropTypes from 'prop-types';
import { useContext, useState, useEffect } from 'react';

// react-bootstrap
import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import SweetAlertWrapper from '../components/Layout/sweetAlert';
// api & modal
import { download_retailer_letter, download_multiple_authLetters } from '../api/otogas';
import AddRetailerModal from './addRetailer';
import ConfirmActionModal from './actionsModal';
import InitiateAuthorizationModal from './initiateAuth';
import AddRetailerOutlet from './addRetailerOutlet';

// project-imports
import MainCard from 'components/MainCard';
import DistributorContext from '../context/distributor/distributorContext';
import AuthContext from '../context/auth/authContext';

export default function Retailers({ className }) {
  const distributorContext = useContext(DistributorContext);
  const authContext = useContext(AuthContext);

  const {
    listRetailers,
    retailers,
    addRetailer,
    addRetailerOutlet,
    notification,
    clear_notification,
    initiateAuthorizationLetter,
    rejectAuthorizationLetter,
    approveAuthorizationLetter
  } = distributorContext;
  const { user } = authContext;

  const [selectedRetailerCode, setSelectedRetailerCode] = useState(null);
  const [showOutletModal, setShowOutletModal] = useState(false);
  const [showAddRetailerModal, setShowAddRetailerModal] = useState(false);
  const [search, setSearch] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ text: '', type: '' });
  const [loadingSummary, setLoadingSummary] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentAction, setCurrentAction] = useState(null); // 'initiate', 'approve', 'reject'
  const [currentRetailerCode, setCurrentRetailerCode] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);
  const [loadingDownloadRetailerCode, setLoadingDownloadRetailerCode] = useState(false);
  const [selectedRetailers, setSelectedRetailers] = useState([]);
  const [loadingMultipleDownload, setLoadingMultipleDownload] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(15); // fixed page size
  const [hasMorePages, setHasMorePages] = useState(true);

  const [showInitiateModal, setShowInitiateModal] = useState(false);
  const [initiatingRetailer, setInitiatingRetailer] = useState(null);

  // initial load
  useEffect(() => {
    listRetailers(1, pageSize, search);
  }, []);

  // debounce search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      listRetailers(1, pageSize, search);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  useEffect(() => {
    if (notification) {
      setAlertMessage({
        text: notification.text,
        type: notification.type
      });
      setShowAlert(true);
    }
  }, [notification]);

  // pagination
  useEffect(() => {
    listRetailers(pageNumber, pageSize, search).then((fetched) => {
      if (fetched.length < pageSize) {
        setHasMorePages(false);
      } else {
        setHasMorePages(true);
      }
    });
  }, [pageNumber, search]);

  const handle_downloads = async (retailerCode, func) => {
    setLoadingDownloadRetailerCode(retailerCode);
    try {
      await func();
    } catch (error) {
      console.error('Error downloading the file:', error);
    } finally {
      setLoadingDownloadRetailerCode(null);
    }
  };

  const handle_multiple_downloads = async (codes, func) => {
    setLoadingMultipleDownload(true);
    try {
      await func(codes);
    } catch (error) {
      console.error('Error downloading multiple files:', error);
      setAlertMessage({ text: 'Failed to download multiple letters.', type: 'error' });
      setShowAlert(true);
    } finally {
      setLoadingMultipleDownload(false);
    }
  };

  const handleConfirm = () => {
    setShowAlert(false);
    clear_notification()
  };

  const handleActionConfirm = async () => {
    if (!currentRetailerCode || !currentAction) return;

    setLoadingAction(true);
    try {
      const actions = {
        initiate: () => initiateAuthorizationLetter([currentRetailerCode]),
        approve: () => approveAuthorizationLetter([currentRetailerCode]),
        reject: () => rejectAuthorizationLetter([currentRetailerCode])
      };

      await actions[currentAction]?.();

      setShowConfirmModal(false);
      clear_notification()
      setCurrentAction(null);
      setCurrentRetailerCode(null);
    } catch (err) {
      console.error(`Failed to ${currentAction} retailer:`, err);
      setAlertMessage({ text: `Failed to ${currentAction} retailer.`, type: 'error' });
      setShowAlert(true);
    } finally {
      setLoadingAction(false);
    }
  };

  const toggleRetailerSelection = (code) => {
    setSelectedRetailers((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));
  };

  return (
    <Row>
      <Col sm={12}>
        <MainCard
          title="Retailers"
          subheader={<p className="mb-0">List of all registered retailers</p>}
          secondary={
            <Stack direction="horizontal" gap={2}>
              <Button variant="primary" onClick={() => setShowAddRetailerModal(true)}>
                Add Retailer
              </Button>
              {/* <Button
                variant="outline-secondary"
                onClick={() => handle_multiple_downloads(selectedRetailers, download_multiple_authLetters)}
                disabled={selectedRetailers.length === 0 || loadingMultipleDownload}
              >
                {loadingMultipleDownload ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Exporting...
                  </>
                ) : (
                  'Export Selected'
                )}
              </Button> */}
            </Stack>
          }
        >
          <SweetAlertWrapper
            show={showAlert}
            title="Notification"
            message={alertMessage.text}
            onConfirm={handleConfirm}
            confirmBtnText="OK"
            type={alertMessage.type || 'info'}
          />

          <Row className="mb-3">
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Search Retailers"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
          </Row>

          <Table responsive striped className="mb-0" style={{ overflow: 'visible' }}>
            <thead>
              <tr>
                
                <th>Retailer ID</th>
                <th>Business Name</th>
                <th>Retailer Name</th>
                <th>Retailer Email</th>
                <th>Retailer Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {retailers && retailers.length > 0 ? (
                retailers.map((retailer) => (
                  <tr key={retailer.retailerCode}>
                    <td>{retailer.retailerCode}</td>
                    <td>{retailer.bussinessName}</td>
                    <td>{retailer.bussinessOwnerName}</td>
                    <td>{retailer.email}</td>
                    <td>{retailer.phoneNumber}</td>
                    <td>
                      <DropdownButton as={ButtonGroup} title="Actions" id={`retailer-actions-${retailer.retailerCode}`} variant="secondary">
                        {/* <Dropdown.Item
                          onClick={() => handle_downloads(retailer.retailerCode, () => download_retailer_letter(retailer.retailerCode))}
                          disabled={loadingDownloadRetailerCode === retailer.retailerCode}
                        >
                          {loadingDownloadRetailerCode === retailer.retailerCode ? (
                            <span>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Downloading...
                            </span>
                          ) : (
                            'Download Letter'
                          )}
                        </Dropdown.Item> */}
                        <Dropdown.Item
                          onClick={() => {
                            setSelectedRetailerCode(retailer);
                            setShowOutletModal(true);
                          }}
                        >
                          Add Retailer Outlets
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setInitiatingRetailer(retailer.retailerCode);
                            setShowInitiateModal(true);
                          }}
                        >
                          Initiate Authorization
                        </Dropdown.Item>
                        {/* <Dropdown.Item
                          onClick={() => {
                            setCurrentRetailerCode(retailer.retailerCode);
                            setCurrentAction('approve');
                            setShowConfirmModal(true);
                          }}
                        >
                          Approve
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setCurrentRetailerCode(retailer.retailerCode);
                            setCurrentAction('reject');
                            setShowConfirmModal(true);
                          }}
                        >
                          Reject
                        </Dropdown.Item>

                        <Dropdown.Item onClick={() => console.log('View outlets for', retailer.retailerCode)}>
                          View Retailer Outlets
                        </Dropdown.Item> */}
                      </DropdownButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No retailers found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <Row className="mt-3">
            <Col className="d-flex justify-content-between">
              <Button variant="primary" disabled={pageNumber === 1} onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}>
                Previous
              </Button>

              <span>Page {pageNumber}</span>

              <Button variant="secondary" disabled={!hasMorePages} onClick={() => setPageNumber((prev) => prev + 1)}>
                Next
              </Button>
            </Col>
          </Row>
        </MainCard>
      </Col>

      {/* Modal */}
      {showAddRetailerModal && (
        <AddRetailerModal
          show={showAddRetailerModal}
          handleClose={() => setShowAddRetailerModal(false)}
          userCode={user?.userCode}
          handleSave={(retailerData) => {
            addRetailer(retailerData);
            setShowAddRetailerModal(false);
          }}
        />
      )}

      <ConfirmActionModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={handleActionConfirm}
        title={`Confirm ${currentAction}`}
        message={`Are you sure you want to ${currentAction} this retailer?`}
        loading={loadingAction}
      />

      <InitiateAuthorizationModal
        show={showInitiateModal}
        onHide={() => {
          setShowInitiateModal(false);
          setInitiatingRetailer(null);
        }}
        retailerCode={initiatingRetailer}
        onSubmit={async (outletId) => {
          try {
            await initiateAuthorizationLetter([{ retailerCode: initiatingRetailer, outletId }]);
            setShowInitiateModal(false);
            setInitiatingRetailer(null);
          } catch (err) {
            console.error('Failed to initiate:', err);
          }
        }}
      />

      <AddRetailerOutlet
        show={showOutletModal}
        handleClose={() => {
          setShowOutletModal(false);
          setSelectedRetailerCode(null);
        }}
        retailer={selectedRetailerCode}
        handleSave={async (outletData) => {
          try {
            await addRetailerOutlet({...outletData, retailerCode: selectedRetailerCode.retailerCode});
            setShowOutletModal(false);
            setSelectedRetailerCode(null);
          } catch (err) {
            console.error('Failed to add outlet:', err);
          }
        }}
      />
    </Row>
  );
}

Retailers.propTypes = {
  className: PropTypes.string
};
