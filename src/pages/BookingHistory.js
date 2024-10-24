// BookingHistory.js
import React, { useState } from 'react';

function BookingHistory() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      bookingDate: '2024-01-12',
      fromDate: '2024-12-01',
      toDate: '2024-12-05',
      roomType: 'Deluxe Suite',
      paymentStatus: 'Paid',
    },
    {
      id: 2,
      bookingDate: '2024-02-20',
      fromDate: '2024-10-05',
      toDate: '2024-10-10',
      roomType: 'Standard Room',
      paymentStatus: 'Pending',
    },
    {
      id: 3,
      bookingDate: '2024-03-18',
      fromDate: '2024-09-10',
      toDate: '2024-09-15',
      roomType: 'Executive Suite',
      paymentStatus: 'Paid',
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

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
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
            <p><strong>From:</strong> {booking.fromDate}</p>
            <p><strong>To:</strong> {booking.toDate}</p>
            <p><strong>Room Type:</strong> {booking.roomType}</p>
            <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>
            {isFutureBooking(booking.fromDate) && (
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
