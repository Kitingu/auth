import React, { useContext, useEffect, useState } from 'react';
import { Table, Badge, Button, Spinner, Row, Col, Stack, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DistributorContext from '../context/distributor/distributorContext';
import BusinessInfoModal from './addDistributor';
import SweetAlertWrapper from '../components/Layout/sweetAlert';
import MainCard from 'components/MainCard';
import AddDistributorOutletModal from './addOutlet';
import InitiateDistributorAuthorizationModal from './initiate';
import ViewDistributor from './viewDistributor';

const ListDistributors = () => {
  const navigate = useNavigate();

  const {
    distributors = [],
    listDistributors,
    initateDistributorAuthLetter,
    addDistributor,
    addDistributorOutlet,
    loading,
    notification,
    clear_notification
  } = useContext(DistributorContext);

  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ text: '', type: '' });

  // Placeholder states for potential modals
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedDistributor, setSelectedDistributor] = useState(null);
  const [showOutletModal, setShowOutletModal] = useState(false);
  const [showInitiateModal, setShowInitiateModal] = useState(false);

  useEffect(() => {
    listDistributors(page, pageSize);
  }, [page, pageSize]);

  useEffect(() => {
    if (notification) {
      setAlertMessage({
        text: notification.text,
        type: notification.type
      });
      setShowAlert(true);
    }
  }, [notification]);

  const handleSave = (data) => {
    addDistributor(data);
  };

  const handleConfirm = () => {
    setShowAlert(false);
    clear_notification();
    listDistributors(page, pageSize);
  };

  // inside ListDistributors component
  const handleSaveOutlet = async (payload) => {
    addDistributorOutlet(payload);
  };

  const handleInitiateAuth = async (payload) => {
    console.log('Initiating authorization for:', payload);
    initateDistributorAuthLetter(
      [
        {
          retailerCode: selectedDistributor.distributorCode,
          outletId: payload,
        }
      ]
    );
  };

  return (
    <Row>
      <Col sm={12}>
        <MainCard
          title="Distributors"
          subheader={<p className="mb-0">List of all registered Distributors</p>}
          secondary={
            <Stack direction="horizontal" gap={2}>
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Distributor
              </Button>
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

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status" />
            </div>
          ) : (
            <div className="table-responsive">
              <Table responsive striped className="mb-0" style={{ overflow: 'visible' }}>
                <thead>
                  <tr>
                    <th>#</th>
                    {/* <th>Distributor Code</th> */}
                    <th>Business Name</th>
                    <th>Owner</th>
                    <th>Area Code</th>
                    <th>ID Number</th>
                    <th>KRA PIN</th>
                    <th>Contact</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Date Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {distributors.map((d, index) => (
                    <tr key={d.id}>
                      <td>{index + 1}</td>
                      {/* <td>{d.distributorCode}</td> */}
                      <td>{d.businessName}</td>
                      <td>{d.businessOwnerName}</td>
                      <td>{d.areaCode}</td>
                      <td>{d.identificationNumber}</td>
                      <td>{d.kraPin}</td>
                      <td>{d.contactPerson}</td>
                      <td>{d.phoneNumber}</td>
                      <td>{d.email}</td>
                      <td>
                        <Badge bg={d.isActive ? 'success' : 'secondary'}>{d.isActive ? 'Active' : 'Inactive'}</Badge>
                      </td>
                      <td>{new Date(d.createdAt).toLocaleDateString()}</td>
                      <td>
                        <DropdownButton
                          as={ButtonGroup}
                          title="Actions"
                          id={`distributor-actions-${d.distributorCode}`}
                          variant="secondary"
                        >
                          <Dropdown.Item
                            onClick={() => {
                              setSelectedDistributor(d);
                              setShowOutletModal(true); // hook for future modal
                            }}
                          >
                            Add Retailer Outlets
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setSelectedDistributor(d);
                              setShowInitiateModal(true); // hook for future modal
                            }}
                          >
                            Initiate Authorization
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => navigate(`/distributors/view/${d.distributorCode}`)}>
                            View Distributor Details
                          </Dropdown.Item>
                        </DropdownButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          {/* Main Add Modal */}
          <BusinessInfoModal show={showModal} handleClose={() => setShowModal(false)} handleSave={handleSave} />

          { showOutletModal && selectedDistributor && (
          <AddDistributorOutletModal
            show={showOutletModal}
            onHide={() => setShowOutletModal(false)}
            distributor={selectedDistributor}
            handleSave={handleSaveOutlet}
            handleClose={() => setShowOutletModal(false)}
          />
          )}

          {showInitiateModal && selectedDistributor && (
            <InitiateDistributorAuthorizationModal
              show={showInitiateModal}
              onHide={() => setShowInitiateModal(false)}
              distributorCode={selectedDistributor.distributorCode}
              onSubmit={handleInitiateAuth}
              defaultCreditLimit={0}
            />
          )}

          {/* Future modals for outlets or authorization */}
          {/* Replace with real modal components as needed */}
          {/* {showOutletModal && <OutletModal distributor={selectedDistributor} show={showOutletModal} onHide={() => setShowOutletModal(false)} />} */}
          {/* {showInitiateModal && <InitiateModal distributor={selectedDistributor} show={showInitiateModal} onHide={() => setShowInitiateModal(false)} />} */}
        </MainCard>
      </Col>
    </Row>
  );
};

export default ListDistributors;
