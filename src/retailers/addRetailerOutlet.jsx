import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const AddRetailerOutletModal = ({ show, handleClose, handleSave, retailer }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  console.log(retailer)

  useEffect(() => {
    if (retailer?.retailerCode) {
      setValue("retailerCode", retailer.bussinessName);
    }
  }, [retailer?.retailerCode, setValue]);

  const onSubmit = (data) => {
    handleSave(data);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Retailer Outlet</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group controlId="retailerCode" className="mb-3">
            <Form.Label>Retailer </Form.Label>
            <Form.Control
              {...register("retailerCode", { required: true })}
              readOnly
            />
          </Form.Group>

          <Form.Group controlId="outletName" className="mb-3">
            <Form.Label>Outlet Name</Form.Label>
            <Form.Control
              {...register("outletName", { required: true })}
              placeholder="Enter outlet name"
            />
            {errors.outletName && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group controlId="outletLocation" className="mb-3">
            <Form.Label>Outlet Location</Form.Label>
            <Form.Control
              {...register("outletLocation", { required: true })}
              placeholder="Enter location"
            />
            {errors.outletLocation && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group controlId="latitude" className="mb-3">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="number"
              step="any"
              {...register("latitude", { required: true })}
              placeholder="Enter latitude"
            />
            {errors.latitude && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group controlId="longitude" className="mb-3">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="number"
              step="any"
              {...register("longitude", { required: true })}
              placeholder="Enter longitude"
            />
            {errors.longitude && <small className="text-danger">Required</small>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" type="submit">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddRetailerOutletModal;
