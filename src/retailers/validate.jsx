import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

// ✅ Move the API function inside or import from a shared file
const verify_letter = async (id) => {
  try {
    const res = await axios.post(`https://os.protoenergy.com/api/AuthorizationLetter/verify-retailer?refno=${id}`);
    console.log(res)
    return res.data;
  } catch (error) {
    return error.response?.data || { responseCode: 0, responseMessage: 'Unknown error' };
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
        <p>Checking authorization...</p>
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
    <Container className="mt-5" style={{ maxWidth: 600 }}>
      <Card className="p-4 shadow-sm border-success">
        <h4 className="text-success mb-3">✅ Authorization Verified</h4>
        <hr />
        <p><strong>Business Name:</strong> {letter.businessName}</p>
        <p><strong>Retailer Code:</strong> {letter.retailerCode}</p>
        <p><strong>Owner:</strong> {letter.businessOwnerName}</p>
        <p><strong>Phone:</strong> {letter.phoneNumber}</p>
        <p><strong>Email:</strong> {letter.email}</p>
        <p><strong>Letter Ref No:</strong> {letter.letter_Refno}</p>
        <p><strong>Status:</strong> {letter.status}</p>
        <p><strong>Initiated By:</strong> {letter.initiatedByUserCode}</p>
        <p><strong>Initiated At:</strong> {new Date(letter.initiatedAt).toLocaleString()}</p>
        {letter.approvedAt && (
          <>
            <p><strong>Approved By:</strong> {letter.approvedByUserCode}</p>
            <p><strong>Approved At:</strong> {new Date(letter.approvedAt).toLocaleString()}</p>
          </>
        )}
        {letter.expiryDate && (
          <p><strong>Expires On:</strong> {new Date(letter.expiryDate).toLocaleDateString()}</p>
        )}
      </Card>
    </Container>
  );
};

export default VerifyLetter;
