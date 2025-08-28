import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const AddDistributorOutletModal = ({ show, handleClose, handleSave, distributor }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (distributor?.distributorCode) {
      setValue('distributorCode', distributor.distributorCode);
    }
  }, [distributor?.distributorCode, setValue]);

  const onSubmit = (data) => {
    handleSave(data);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Distributor Outlet</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          {/* Hidden distributorCode */}
          <input
            type="hidden"
            value={distributor?.distributorCode || ''}
            readOnly
            {...register('distributorCode', { required: true })}
          />

          <Form.Group controlId="distributorAreaCode" className="mb-3">
            <Form.Label>Distributor Area Code</Form.Label>
            <Form.Control
              {...register('distributorAreaCode', { required: true })}
              placeholder="Enter distributor area code"
            />
            {errors.distributorAreaCode && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group controlId="outLetName" className="mb-3">
            <Form.Label>Outlet Name</Form.Label>
            <Form.Control {...register('outLetName', { required: true })} placeholder="Enter outlet name" />
            {errors.outLetName && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group controlId="outLetLocation" className="mb-3">
            <Form.Label>Outlet Location</Form.Label>
            <Form.Control {...register('outLetLocation', { required: true })} placeholder="Enter location" />
            {errors.outLetLocation && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group controlId="contactPerson" className="mb-3">
            <Form.Label>Contact Person</Form.Label>
            <Form.Control {...register('contactPerson', { required: true })} placeholder="Enter contact person" />
            {errors.contactPerson && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group controlId="phoneNumber" className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" {...register('phoneNumber', { required: true })} placeholder="Enter phone number" />
            {errors.phoneNumber && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" {...register('email', { required: true })} placeholder="Enter email" />
            {errors.email && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group controlId="latitude" className="mb-3">
            <Form.Label>Latitude</Form.Label>
            <Form.Control type="number" step="any" {...register('latitude', { required: true })} placeholder="Enter latitude" />
            {errors.latitude && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group controlId="longitude" className="mb-3">
            <Form.Label>Longitude</Form.Label>
            <Form.Control type="number" step="any" {...register('longitude', { required: true })} placeholder="Enter longitude" />
            {errors.longitude && <small className="text-danger">Required</small>}
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddDistributorOutletModal;
