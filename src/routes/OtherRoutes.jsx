import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import Retailers from '../retailers/retailers';
import AuthLetters from '../retailers/authLetters.jsx';
import ProtectedRoute from '../components/protectedRoute.jsx';
import VerifyLetter from '../retailers/validate.jsx';
import ViewRetailer from '../retailers/viewRetailer.jsx';
import ListDistributors from '../distributor/listDistributors.jsx';
import DocumentExpiryDash from '../documents/Main.jsx'
import DistributorLettersStatus from '../distributor/authLetters.jsx';
import UsersPage from '../users/listUsers.jsx';
// Pages
const OtherSamplePage = Loadable(lazy(() => import('views/SamplePage')));
// const VerifyLetter = Loadable(lazy(() => import('../retailers/validate.jsx'))); // your verify component

// ==============================|| OTHER ROUTING ||============================== //

const OtherRoutes = {
  path: '/',
  children: [
    // ✅ Public route at /123/verify
    {
      path: ':id/verify',
      element: <VerifyLetter />
    },

    // ✅ Dashboard-protected routes
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'other',
          children: [
            {
              path: 'sample-page',
              element: <OtherSamplePage />
            }
          ]
        },
        {
          path: 'retailers',
          element: <ProtectedRoute element={<Retailers />} />
        },
        {
          path: 'retailers/view/:retailerCode',
          element: <ViewRetailer />
        },
        {
          path: 'auth-letters',
          element: <ProtectedRoute element={<AuthLetters />} />
        },
                {
          path: 'distributor-letters',
          element: <ProtectedRoute element={<DistributorLettersStatus />} />
        },
         {
          path: 'distributors',
          element: <ProtectedRoute element={<ListDistributors />} />
        },
        {
          path: 'documents',
          element: <ProtectedRoute element={<DocumentExpiryDash />} />
        },

        // users
        {
          path: 'users',
          element:  <ProtectedRoute element={<UsersPage />} />
        },

        {
          path: 'forbidden',
          element: <OtherSamplePage />
        },
         {
          path: '404',
          element: <OtherSamplePage />
        },
         {
          path: 'error',
          element: <OtherSamplePage />
        }





      ]
    }
  ]
};

export default OtherRoutes;
