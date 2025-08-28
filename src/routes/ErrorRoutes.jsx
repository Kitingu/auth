import React from 'react';
import Error403 from '../components/errors/Error403'
import Error404 from '../components/errors/Error404';
import Error500 from '../components/errors/Error500';

// If your app uses a main layout, you can nest under it by adding `element: <MainLayout />`
// and moving these into `children`. This flat version works fine too.
const ErrorRoutes = {
  path: '/',
  children: [
    { path: '403', element: <Error403 /> },
    { path: '500', element: <Error500 /> },
    // Catch-all 404 must be last among siblings
    { path: '*', element: <Error404 /> }
  ]
};

export default ErrorRoutes;
