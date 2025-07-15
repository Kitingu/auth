import PropTypes from 'prop-types';
import { useState, useContext, useEffect } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';

import Alerts from '../../components/Layout/Alerts.jsx';
import { useNavigate } from 'react-router-dom';

import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

// third-party
import { useForm } from 'react-hook-form';

// project-imports
import MainCard from 'components/MainCard';
import { emailSchema, passwordSchema } from 'utils/validationSchema';

// assets
import DarkLogo from 'assets/images/proto_logo.png';

// ==============================|| AUTH LOGIN FORM ||============================== //

export default function AuthLoginForm({ className, link }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { login, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert } = alertContext;

  // Handle login feedback
  useEffect(() => {
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    if (isAuthenticated) {
      console.log(isAuthenticated)
      navigate('/'); // Redirect on success
    }
  }, [error, isAuthenticated]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login({
        username: data.email,
        password: data.password
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <MainCard className="mb-0">
      <Alerts />
      <div className="text-center">
        <a>
          <Image src={DarkLogo} alt="Logo" style={{ height: '20px', backgroundColor: '#12173E', padding: '2px' }} />
        </a>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h4 className={`text-center f-w-500 mt-4 mb-3 ${className}`}>Login</h4>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Control
            type="text"
            placeholder="Email Address"
            {...register('email')}
            isInvalid={!!errors.email}
            className={className && 'bg-transparent border-white text-white border-opacity-25'}
          />
          <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password')}
              isInvalid={!!errors.password}
              className={className && 'bg-transparent border-white text-white border-opacity-25'}
            />
            <Button onClick={togglePasswordVisibility} type="button">
              {showPassword ? <i className="ti ti-eye" /> : <i className="ti ti-eye-off" />}
            </Button>
          </InputGroup>
          <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
        </Form.Group>

        <Stack direction="horizontal" className="mt-1 justify-content-between align-items-center">
          <Form.Group controlId="customCheckc1">
            <Form.Check type="checkbox" label="Remember me?" defaultChecked className={`input-primary ${className || 'text-muted'}`} />
          </Form.Group>
          <a href="#!" className={`text-secondary f-w-400 mb-0 ${className}`}>
            Forgot Password?
          </a>
        </Stack>

        <div className="text-center mt-4">
          <Button type="submit" className="shadow px-sm-4" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </div>
      </Form>
    </MainCard>
  );
}

AuthLoginForm.propTypes = {
  className: PropTypes.string,
  link: PropTypes.string,
  resetLink: PropTypes.string
};
