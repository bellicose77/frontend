import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function NavBar() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {isLoggedIn && (
          <>
            <Link to="/booking">Book a Room</Link>
            <Link to="/bookinghistory">Booking History</Link>
            {/* <Link to="/rooms">Room Details</Link> */}
          </>
        )}
      </div>
      <div className="navbar-login">
        {isLoggedIn ? (
          <Link to="/logout" onClick={handleLogout}>Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
