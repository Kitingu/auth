import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import Retailers from '../retailers/retailers';
import AuthLetters from '../retailers/authLetters.jsx';
import ProtectedRoute from '../components/protectedRoute.jsx';

// Pages
const OtherSamplePage = Loadable(lazy(() => import('views/SamplePage')));
const VerifyLetter = Loadable(lazy(() => import('../retailers/validate.jsx'))); // your verify component

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
          path: 'auth-letters',
          element: <ProtectedRoute element={<AuthLetters />} />
        }
      ]
    }
  ]
};

export default OtherRoutes;
