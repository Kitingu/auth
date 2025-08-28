import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const AddRetailerModal = ({ show, handleClose, mode, initialData, onSubmitForm, userCode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch
  } = useForm({
    defaultValues: {
      retailerCode: '',
      bussinessOwnerName: '',
      bussinessName: '',
      indetificationNumber: '',
      kra_Pin: '',
      contactPerson: '',
      phoneNumber: '',
      email: '',
      userCode: userCode || '',
      isActive: true
    }
  });

  // prefill on update
  useEffect(() => {
    if (mode === 'update' && initialData) {
      reset({
        retailerCode: initialData.retailerCode ?? '',
        bussinessOwnerName: initialData.bussinessOwnerName ?? '',
        bussinessName: initialData.bussinessName ?? '',
        indetificationNumber: initialData.indetificationNumber ?? '',
        kra_Pin: initialData.kra_Pin ?? '',
        contactPerson: initialData.contactPerson ?? '',
        phoneNumber: initialData.phoneNumber ?? '',
        email: initialData.email ?? '',
        userCode: initialData.userCode ?? userCode ?? '',
        isActive: typeof initialData.isActive === 'boolean' ? initialData.isActive : true
      });
    } else {
      reset((curr) => ({
        ...curr,
        userCode: userCode || ''
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, mode, initialData, userCode]);

  const onSubmit = async (data) => {
    // keep exact API field names (including spellings)
    const payload = {
      retailerCode: data.retailerCode,
      bussinessOwnerName: data.bussinessOwnerName,
      bussinessName: data.bussinessName,
      indetificationNumber: data.indetificationNumber,
      kra_Pin: data.kra_Pin,
      contactPerson: data.contactPerson,
      phoneNumber: data.phoneNumber,
      email: data.email,
      userCode: data.userCode || userCode || '',
      isActive: !!data.isActive
    };

    await onSubmitForm(payload, mode);
    reset();
    handleClose();
  };

  const isUpdate = mode === 'update';
  const isActive = watch('isActive');

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{isUpdate ? 'Update Retailer' : 'Add New Retailer'}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Modal.Body>
          {/* <Form.Group className="mb-3">
            <Form.Label>Retailer Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. RET-0001"
              {...register('retailerCode')}
              isInvalid={!!errors.retailerCode}
              disabled={isUpdate}
            />
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group> */}

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
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...register('email', {
                validate: (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Invalid email format'
              })}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email?.message || 'Valid email is required'}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Identification Number</Form.Label>
            <Form.Control type="text" {...register('indetificationNumber', {})} isInvalid={!!errors.indetificationNumber} />
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>KRA PIN</Form.Label>
            <Form.Control type="text" {...register('kra_Pin', {})} isInvalid={!!errors.kra_Pin} />
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contact Person</Form.Label>
            <Form.Control type="text" {...register('contactPerson', { required: true })} isInvalid={!!errors.contactPerson} />
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" {...register('phoneNumber', { required: true, minLength: 7 })} isInvalid={!!errors.phoneNumber} />
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>User Code</Form.Label>
            <Form.Control type="text" {...register('userCode', { required: true })} isInvalid={!!errors.userCode} disabled />
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2" controlId="isActiveCheck">
            <Form.Check
              type="switch"
              label={isActive ? 'Active' : 'Inactive'}
              {...register('isActive')}
              onChange={(e) => setValue('isActive', e.target.checked)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isUpdate ? (isSubmitting ? 'Updating…' : 'Update Retailer') : isSubmitting ? 'Saving…' : 'Save Retailer'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

AddRetailerModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['create', 'update']).isRequired,
  initialData: PropTypes.shape({
    retailerCode: PropTypes.string,
    bussinessOwnerName: PropTypes.string,
    bussinessName: PropTypes.string,
    indetificationNumber: PropTypes.string,
    kra_Pin: PropTypes.string,
    contactPerson: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    userCode: PropTypes.string,
    isActive: PropTypes.bool
  }),
  onSubmitForm: PropTypes.func.isRequired,
  userCode: PropTypes.string
};

AddRetailerModal.defaultProps = {
  initialData: null,
  userCode: ''
};

export default AddRetailerModal;
