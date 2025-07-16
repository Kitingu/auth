import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import Retailers from '../retailers/retailers';
import AuthLetters from '../retailers/authLetters.jsx'
import ProtectedRoute from '../components/protectedRoute.jsx';
// render - other pages
const OtherSamplePage = Loadable(lazy(() => import('views/SamplePage')));

// ==============================|| OTHER ROUTING ||============================== //

const OtherRoutes = {
  path: '/',
  children: [
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
        }
      ]
    },
     {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: '/',
          children: [
            {
              path: 'retailers',
              element: <ProtectedRoute element={<Retailers/>} />
            }
          ]
        }
      ]
    },
     {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: '/',
          children: [
            {
              path: 'auth-letters',
              element: <ProtectedRoute element={<AuthLetters/>} />
            }
          ]
        }
      ]
    }
  ]
};

export default OtherRoutes;
