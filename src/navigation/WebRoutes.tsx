import { Route, Routes } from 'react-router-dom';
// components
import BookingApproval from 'screens/Sales/BookingApproval/BookingApproval';
import BookingPreview from 'screens/Sales/BookingApproval/BookingPreview';

import BookingForm from '../screens/Sales/BookingChart/BookingForm';

const WebRoutes = () => {
  return (
    <Routes>
      <Route element={<BookingForm />} path="/bookingChart" />
      <Route element={<BookingApproval />} path="/bookingApproval" />
      <Route element={<BookingPreview />} path="/bookingPreview" />
    </Routes>
  );
};

export default WebRoutes;
