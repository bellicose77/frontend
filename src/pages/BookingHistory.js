// BookingHistory.js
import React, { useState, useEffect } from 'react';
import { publicationGet, publicationPost } from '../api/api';
import { useSelector, useDispatch } from 'react-redux';

function BookingHistory() {
  const [bookings, setBookings] = useState();
  const [roomTypes, setRoomTypes] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.userEmail);

  useEffect(()=>{
    fetchAllBooking();
    getRooms();
  }, [userEmail]);

  async function fetchAllBooking(){
    const { data, err } = await publicationGet(
      'https://localhost:7128/api/Booking/'+userEmail
    );
    
    if(data?.status == 200){
      setBookings(data.data);
    }
  }

  async function getRooms(){
    const { data, err } = await publicationGet(
      'https://localhost:7128/api/Room'
    );
    
    if(data?.status == 200){
      setRoomTypes(data.data);
    }
  }

  function getRoomType(id){
    var roomType = roomTypes.find(item => item.id == id);
    return roomType ? roomType.roomType : null;
  }

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setShowPopup(true);
  };

  const confirmCancelBooking = () => {
    setBookings(bookings.filter((b) => b.id !== selectedBooking.id));
    setShowPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const isFutureBooking = (fromDate) => {
    const today = new Date();
    const from = new Date(fromDate);
    return from > today;
  };

  return (
    <div className="booking-history-container">
      <h2>Your Booking History</h2>
      <div className="bookings-list">
        {bookings && bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <p><strong>Booking Date:</strong> {booking.createdAt}</p>
            <p><strong>From:</strong> {booking.checkInDate}</p>
            <p><strong>To:</strong> {booking.checkOutDate}</p>
            <p><strong>Room Type:</strong> {getRoomType(booking.roomId)}</p>
            <p><strong>Payment Status:</strong> {booking.paymentStatus ?? 'Not Paid'}</p>
            {isFutureBooking(booking.checkInDate) && (
              <button onClick={() => handleCancelClick(booking)} className="cancel-btn">
                Cancel Booking
              </button>
            )}
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <p>Are you sure you want to cancel your booking?</p>
            <button onClick={confirmCancelBooking} className="confirm-btn">Yes, Cancel</button>
            <button onClick={closePopup} className="cancel-popup-btn">No, Go Back</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingHistory;
