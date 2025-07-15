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
import { download_retailer_letter } from '../api/otogas';
import AddRetailerModal from './addRetailer';
import ConfirmActionModal from './actionsModal';

// project-imports
import MainCard from 'components/MainCard';
import DistributorContext from '../context/distributor/distributorContext';
import AuthContext from '../context/auth/authContext';

export default function Retailers({ className }) {
  const distributorContext = useContext(DistributorContext);
  const authContext = useContext(AuthContext);

  const { listRetailers, retailers, addRetailer, notification, initiateAuthorizationLetter, rejectAuthorizationLetter, approveAuthorizationLetter } = distributorContext;
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

  // initial load
  useEffect(() => {
    listRetailers(1, 10, search);
  }, []);

  // debounce search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      listRetailers(1, 10, search);
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

  const handle_downloads = async (func) => {
    setLoadingSummary(true);
    try {
      await func();
    } catch (error) {
      console.error('Error downloading the file:', error);
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleConfirm = () => {
    setShowAlert(false);
  };

  const handleActionConfirm = () => {
    if (!currentRetailerCode) return;

    const actions = {
      initiate: () => initiateAuthorizationLetter([currentRetailerCode]),
      approve: () => approveAuthorizationLetter([currentRetailerCode]),
      reject: () => rejectAuthorizationLetter([currentRetailerCode])
    };

    actions[currentAction]?.();
    setShowConfirmModal(false);
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
              <Button variant="outline-secondary">Export</Button>
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

          <Table responsive striped className="mb-0">
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
                        <Dropdown.Item onClick={() => handle_downloads(() => download_retailer_letter(retailer.retailerCode))}>
                          Download Letter
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setSelectedRetailerCode(retailer.retailerCode);
                            setShowOutletModal(true);
                          }}
                        >
                          Add Retailer Outlets
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setCurrentRetailerCode(retailer.retailerCode);
                            setCurrentAction('initiate');
                            setShowConfirmModal(true);
                          }}
                        >
                          Initiate Authorization
                        </Dropdown.Item>
                        <Dropdown.Item
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
                        </Dropdown.Item>
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
        </MainCard>
      </Col>

      {/* Modal */}
      {showAddRetailerModal && (
        <AddRetailerModal
          show={showAddRetailerModal}
          onHide={() => setShowAddRetailerModal(false)}
          userCode={user?.userCode}
          handleSave={(retailerData) => {
            // call addRetailer from context or handle saving logic here
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
/>
    </Row>
  );
}

Retailers.propTypes = {
  className: PropTypes.string
};
