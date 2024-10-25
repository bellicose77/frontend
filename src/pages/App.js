
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import RoomDetails from './RoomDetails';
import Login from './Login';
import Booking from './Booking';
import NavBar from './NavBar';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import BookingHistory from './BookingHistory';

import { store } from "../reducers/index";
import { Provider,useDispatch } from "react-redux";

function App() {
  return (
    <Provider store={store}>
    <Router>
      <div>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/room/:id"
            element={<RoomDetails/>}
          />
          <Route
            path="/booking"
            element={<Booking/>}
          />
          <Route
            path="/bookinghistory"
            element={<BookingHistory/>}
          />
          <Route
            path="/dashboard"
            element={<Dashboard/>}
          />
        </Routes>
      </div>
    </Router></Provider>
  );
}

export default App;
