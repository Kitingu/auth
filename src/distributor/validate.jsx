import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Spinner, Alert, Badge, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import logo from '../../src/assets/images/proto_logo.png';

const verify_letter = async (id) => {
  try {
    const res = await axios.post(`https://os.protoenergy.com/api/AuthorizationLetter/verify-retailer?refno=${id}`);
    return res.data;
  } catch (error) {
    return (
      error.response?.data || {
        responseCode: 0,
        responseMessage: 'Unknown error occurred while verifying letter.'
      }
    );
  }
};

const getStatusVariant = (status) => {
  switch (status) {
    case 'Approved':
      return 'success';
    case 'Pending':
      return 'warning';
    case 'Revoked':
      return 'danger';
    case 'Expired':
      return 'secondary';
    default:
      return 'dark';
  }
};

const VerifyLetter = () => {
  const { id } = useParams();
  const [letter, setLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchLetter = async () => {
      setLoading(true);
      const result = await verify_letter(id);
      if (result.responseCode === 1) {
        setLetter(result.responseObject);
      } else {
        setErrorMsg(result.responseMessage || 'Authorization letter not found.');
      }
      setLoading(false);
    };
    fetchLetter();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-3">Verifying authorization...</p>
      </Container>
    );
  }

  if (errorMsg) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{errorMsg}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5" style={{ maxWidth: 650 }}>
      <Card className="p-4 shadow border-success">
        {/* <div
          style={{
            backgroundColor: '#12173E', // Proto Blue
            padding: '4px 8px', // smaller padding for tight fit
            borderRadius: '8px',
            display: 'inline-block',
            marginBottom: '15px'
          }}
        >
          <Image
            src={logo}
            fluid
            className="logo logo-lg"
            alt="Proto Energy Logo"
            style={{
              height: '40px', // smaller and cleaner
              width: 'auto',
              display: 'block'
            }}
          />
        </div> */}

        <h3 className="mb-4 text-uppercase">PROTO ENERGY</h3>
        <hr />

        <Row className="mb-2">
          <Col sm={5}>
            <strong>Business Name:</strong>
          </Col>
          <Col sm={7}>{letter.businessName}</Col>
        </Row>

        {/* <Row className="mb-2">
          <Col sm={5}>
            <strong>Owner:</strong>
          </Col>
          <Col sm={7}>{letter.businessOwnerName}</Col>
        </Row> */}

        {/* <Row className="mb-2">
          <Col sm={5}>
            <strong>Phone:</strong>
          </Col>
          <Col sm={7}>{letter.phoneNumber}</Col>
        </Row> */}

        {/* <Row className="mb-2">
          <Col sm={5}>
            <strong>Email:</strong>
          </Col>
          <Col sm={7}>{letter.email}</Col>
        </Row> */}

        <Row className="mb-2">
          <Col sm={5}>
            <strong>Letter Ref No:</strong>
          </Col>
          <Col sm={7}>{letter.letter_Refno}</Col>
        </Row>

        <Row className="mb-2">
          <Col sm={5}>
            <strong>Status:</strong>
          </Col>
          <Col sm={7}>
            <Badge bg={getStatusVariant(letter.status)} className="px-3 py-1 fs-6">
              {{
                Approved: 'Valid',
                Revoked: 'Revoked',
                Expired: 'Expired'
              }[letter.status] || letter.status}
            </Badge>
          </Col>
        </Row>

        {/* <Row className="mb-2">
          <Col sm={5}>
            <strong>Initiated At:</strong>
          </Col>
          <Col sm={7}>{new Date(letter.initiatedAt).toLocaleString()}</Col>
        </Row> */}

        {letter.approvedAt && (
          <Row className="mb-2">
            <Col sm={5}>
              <strong>Approved At:</strong>
            </Col>
            <Col sm={7}>{new Date(letter.approvedAt).toLocaleString()}</Col>
          </Row>
        )}

        {letter.expiryDate && (
          <Row className="mb-2">
            <Col sm={5}>
              <strong>Expires On:</strong>
            </Col>
            <Col sm={7}>{new Date(letter.expiryDate).toLocaleDateString()}</Col>
          </Row>
        )}
      </Card>
    </Container>
  );
};

export default VerifyLetter;
