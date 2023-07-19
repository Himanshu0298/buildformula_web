import React from 'react'
import { Routes,Route } from 'react-router-dom';

// components
import BookingForm from '../screens/Sales/BookingForm';

const WebRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={BookingForm} />
    </Routes>
  );
}

export default WebRoutes