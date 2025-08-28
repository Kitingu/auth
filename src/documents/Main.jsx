import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import DashboardHeader from './Dashboard';
import StatsCards from './StatsCard';
import ExpiryTrackingList from './Expiry';

function App() {
  return (
    <Container className="py-4">
      {/* <DashboardHeader /> */}
      {/* <StatsCards /> */}
      <ExpiryTrackingList />
    </Container>
  );
}

export default App;
