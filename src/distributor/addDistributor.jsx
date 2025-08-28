import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const AddDistributorModal = ({ show, handleClose, handleSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    handleSave(data);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Enter Business Information</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group controlId="businessName" className="mb-3">
            <Form.Label>Business Name</Form.Label>
            <Form.Control
              {...register("businessName", { required: true })}
              placeholder="Enter business name"
            />
            {errors.businessName && (
              <small className="text-danger">Required</small>
            )}
          </Form.Group>

          <Form.Group controlId="businessOwnerName" className="mb-3">
            <Form.Label>Business Owner Name</Form.Label>
            <Form.Control
              {...register("businessOwnerName", { required: true })}
              placeholder="Enter business owner name"
            />
            {errors.businessOwnerName && (
              <small className="text-danger">Required</small>
            )}
          </Form.Group>

          <Form.Group controlId="identificationNumber" className="mb-3">
            <Form.Label>Identification Number</Form.Label>
            <Form.Control
              {...register("identificationNumber")}
              placeholder="Enter identification number"
            />
          </Form.Group>

          <Form.Group controlId="kraPin" className="mb-3">
            <Form.Label>KRA PIN</Form.Label>
            <Form.Control
              {...register("kraPin")}
              placeholder="Enter KRA PIN"
            />
          </Form.Group>

          <Form.Group controlId="contactPerson" className="mb-3">
            <Form.Label>Contact Person</Form.Label>
            <Form.Control
              {...register("contactPerson", { required: true })}
              placeholder="Enter contact person"
            />
            {errors.contactPerson && (
              <small className="text-danger">Required</small>
            )}
          </Form.Group>

          <Form.Group controlId="phoneNumber" className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              {...register("phoneNumber", { required: true })}
              placeholder="Enter phone number"
            />
            {errors.phoneNumber && (
              <small className="text-danger">Required</small>
            )}
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...register("email")}
              placeholder="Enter email"
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddDistributorModal;
