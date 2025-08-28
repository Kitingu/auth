import { useContext, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

// project-imports
import router from 'routes';
import UserState from './context/users/userState.jsx';
import DistributorState from './context/distributor/distributorState.jsx';
import AlertState from './context/alerts/alertState.jsx';
import AuthContext from './context/auth/authContext.jsx';
import DocumentsState from './context/documents/documentsState.jsx';
// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

function App() {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext || {};

  let token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      loadUser();
    }
  }, [token]);

  return (

      <UserState>
        <DistributorState>
          <DocumentsState>
          <AlertState>
            <RouterProvider router={router} />
          </AlertState>
          </DocumentsState>
        </DistributorState>
      </UserState>

  );
}

export default App;
