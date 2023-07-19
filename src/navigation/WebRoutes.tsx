import { Routes,Route } from 'react-router-dom';

// components
import BookingForm from '../screens/Sales/BookingForm';

const WebRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BookingForm/>} />
    </Routes>
  );
}

export default WebRoutes