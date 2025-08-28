import React, { useEffect, useContext, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
  Stack,
} from "react-bootstrap";
import DistributorContext from "../context/distributor/distributorContext";
import AuthContext from "../context/auth/authContext";
import MainCard from "components/MainCard";
import AddRetailerModal from "./addRetailer";

const ViewRetailer = () => {
  const { retailerCode } = useParams();
  const navigate = useNavigate();
  const { retailer, getRetailer, loading, error, updateRetailer } = useContext(DistributorContext);
  const { user } = useContext(AuthContext);

  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (retailerCode) {
      getRetailer(retailerCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retailerCode]);

  const initialData = useMemo(() => {
    if (!retailer) return null;

    // Map conservatively: prefer exact API fields if present, fallback to view-friendly names
    return {
      retailerCode: retailer.retailerCode ?? "",
      bussinessOwnerName: retailer.bussinessOwnerName ?? retailer.retailerOwnerName ?? retailer.ownerName ?? "",
      bussinessName: retailer.bussinessName ?? retailer.retailerName ?? "",
      indetificationNumber: retailer.indetificationNumber ?? retailer.identificationNumber ?? "",
      kra_Pin: retailer.kra_Pin ?? retailer.kraPin ?? "",
      contactPerson: retailer.contactPerson ?? "",
      phoneNumber: retailer.phoneNumber ?? "",
      email: retailer.email ?? "",
      userCode: retailer.userCode ?? user?.userCode ?? "",
      isActive: typeof retailer.isActive === "boolean" ? retailer.isActive : true
    };
  }, [retailer, user?.userCode]);

  if (loading)
    return (
      <div className="text-center mt-4">
        <Spinner animation="border" />
      </div>
    );

  if (error)
    return (
      <Alert variant="danger" className="mt-4 text-center">
        {error}
      </Alert>
    );

  if (!retailer) return null;

  return (
    <MainCard
      title="Retailer Details"
      subheader={
        <p className="mb-0">
          Details and outlets for retailer <strong>{retailer.retailerName ?? retailer.bussinessName ?? retailer.bussinessOwnerName}</strong>
        </p>
      }
      secondary={
        <Stack direction="horizontal" gap={2}>
          <Button variant="outline-secondary" onClick={() => navigate("/retailers")}>
            <i className="ph ph-arrow-left me-1" />
            Back to Retailers
          </Button>
          <Button
            variant="primary"
            onClick={() => setShowEditModal(true)}
          >
            <i className="ph ph-pencil-simple me-1" />
            Edit Retailer
          </Button>
        </Stack>
      }
    >
      <Container className="mt-3">
        {/* Retailer Info */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title className="mb-3">Retailer Information</Card.Title>
            <Row className="mb-2">
              <Col sm={4}><strong>Retailer Code:</strong></Col>
              <Col sm={8}>{retailer.retailerCode}</Col>
            </Row>

            <Row className="mb-2">
              <Col sm={4}><strong>Business Name:</strong></Col>
              <Col sm={8}>{retailer.bussinessName ?? retailer.retailerName}</Col>
            </Row>

            <Row className="mb-2">
              <Col sm={4}><strong>Business Owner Name:</strong></Col>
              <Col sm={8}>{retailer.bussinessOwnerName ?? "-"}</Col>
            </Row>

            <Row className="mb-2">
              <Col sm={4}><strong>Email:</strong></Col>
              <Col sm={8}>{retailer.email ?? "-"}</Col>
            </Row>

            <Row className="mb-2">
              <Col sm={4}><strong>Phone:</strong></Col>
              <Col sm={8}>{retailer.phoneNumber ?? "-"}</Col>
            </Row>

            <Row className="mb-2">
              <Col sm={4}><strong>Identification No.:</strong></Col>
              <Col sm={8}>{retailer.indetificationNumber ?? "-"}</Col>
            </Row>

            <Row className="mb-2">
              <Col sm={4}><strong>KRA PIN:</strong></Col>
              <Col sm={8}>{retailer.kra_Pin ?? "-"}</Col>
            </Row>

            <Row className="mb-2">
              <Col sm={4}><strong>Contact Person:</strong></Col>
              <Col sm={8}>{retailer.contactPerson ?? "-"}</Col>
            </Row>

            <Row className="mb-0">
              <Col sm={4}><strong>Status:</strong></Col>
              <Col sm={8}>
                {retailer.isActive ? (
                  <span className="badge bg-success">Active</span>
                ) : (
                  <span className="badge bg-secondary">Inactive</span>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Retail Outlets */}
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title className="mb-3">Retail Outlets</Card.Title>
            <Table bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Outlet Name</th>
                  <th>Location</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {retailer.retailOutlets?.length ? (
                  retailer.retailOutlets.map((outlet, index) => (
                    <tr key={outlet.id ?? `${outlet.outletName}-${index}`}>
                      <td>{index + 1}</td>
                      <td>{outlet.outletName}</td>
                      <td>{outlet.outletLocation}</td>
                      <td>{outlet.latitude}</td>
                      <td>{outlet.longitude}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => navigate(`/outlets/edit/${outlet.id}`)}
                        >
                          <i className="ph ph-pencil-simple me-1" />
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center">No outlets found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>

      {/* Update modal */}
      {showEditModal && initialData && (
        <AddRetailerModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          mode="update"
          initialData={initialData}
          userCode={user?.userCode}
          onSubmitForm={async (payload /* exact API shape */, _mode) => {
            // Update then refresh details
            await updateRetailer(payload);
            await getRetailer(retailerCode);
          }}
        />
      )}
    </MainCard>
  );
};

export default ViewRetailer;
