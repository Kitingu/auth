import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

const AddRetailerModal = ({ show, handleClose, handleSave, userCode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    handleSave({ ...data, userCode });
    reset();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Retailer</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Business Owner Name</Form.Label>
            <Form.Control type="text" {...register('bussinessOwnerName', { required: true })} isInvalid={!!errors.bussinessOwnerName} />
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Business Name</Form.Label>
            <Form.Control type="text" {...register('bussinessName', { required: true })} isInvalid={!!errors.bussinessName} />
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Identification Number</Form.Label>
            <Form.Control type="text" {...register('indetificationNumber', { required: true })} isInvalid={!!errors.indetificationNumber} />
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>KRA PIN</Form.Label>
            <Form.Control type="text" {...register('kra_Pin', { required: true })} isInvalid={!!errors.kra_Pin} />
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contact Person</Form.Label>
            <Form.Control type="text" {...register('contactPerson', { required: true })} isInvalid={!!errors.contactPerson} />
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" {...register('phoneNumber', { required: true })} isInvalid={!!errors.phoneNumber} />
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" {...register('email', { required: true })} isInvalid={!!errors.email} />
            <Form.Control.Feedback type="invalid">Valid email is required</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Retailer
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

AddRetailerModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  userCode: PropTypes.string.isRequired
};

export default AddRetailerModal;
