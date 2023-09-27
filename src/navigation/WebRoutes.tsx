import { Route, Routes } from 'react-router-dom';

// components
import BookingForm from '../screens/Sales/BookingForm';

const WebRoutes = () => {
  return (
    <Routes>
      <Route element={<BookingForm />} path="/bookingChart" />
    </Routes>
  );
};

export default WebRoutes;
