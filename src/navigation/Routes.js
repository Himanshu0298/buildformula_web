import React from 'react'
import { Route } from 'react-router-dom';

// components
import BookingForm from '../screens/Sales/BookingForm';

const Routes = () => {
  return (
    <Routes>
      <Route path="/" Component={BookingForm} />
    </Routes>
  );
}

export default Routes