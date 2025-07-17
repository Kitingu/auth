import { useState, useContext, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

import DistributorsContext from '../context/distributor/distributorContext';

export default function InitiateAuthorizationModal({ show, onHide, retailerCode, onSubmit }) {
  const [selectedOutletId, setSelectedOutletId] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const distributorContext = useContext(DistributorsContext);
  const { getRetailerOutlets, retailer_outlets } = distributorContext;

  useEffect(() => {
    if (show && retailerCode) {
      setLoading(true);
      getRetailerOutlets(retailerCode)
        .then(() => setLoading(false))
        .catch((err) => {
          console.error('Failed to fetch outlets:', err);
          setLoading(false);
        });
    }
  }, [show, retailerCode]); // <- include `show` in dependencies

  const handleSubmit = async () => {
    if (!selectedOutletId) return;
    setSubmitting(true);
    await onSubmit(selectedOutletId);
    setSubmitting(false);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Outlet to Initiate Authorization</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : !retailer_outlets || retailer_outlets.length === 0 ? (
          <p>No outlets found for this retailer.</p>
        ) : (
          <Form.Group>
            <Form.Select
              value={selectedOutletId}
              onChange={(e) => setSelectedOutletId(e.target.value)}
            >
              <option value="">-- Select an outlet --</option>
              {retailer_outlets.map((outlet) => (
                <option key={outlet.id} value={outlet.id}>
                  {outlet.outletName} ({outlet.outletLocation})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={submitting}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!selectedOutletId || submitting}>
          {submitting ? 'Submitting...' : 'Initiate'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

InitiateAuthorizationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  retailerCode: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};
