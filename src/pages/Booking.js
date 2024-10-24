import React, { useState, useEffect } from 'react';
import { publicationGet, publicationPost } from '../api/api';

function Booking() {
  const [roomType, setRoomType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleBooking = () => {
    // Handle booking logic
    alert('Booking successful!');
  };

  useEffect(() => {
    getRoomType();
  }, []);

  async function getRoomType(){
    const { data, err } = await publicationGet(
      'https://localhost:7128/api/Room/roomType'
    );
  
    if(data?.status == 200){
      setRoomType(data.data);
    }
  }

  return (
    <div className="booking-container">
      <h2>Book a Room</h2>
      <div className="booking-form">
        <label htmlFor="roomType">Room Type:</label>
        <select id="roomType" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
          <option value="">Select a room</option>
          <option value="deluxe">Deluxe Room</option>
          <option value="suite">Suite</option>
          <option value="standard">Standard Room</option>
        </select>

        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button onClick={handleBooking} className="booking-button">Book Now</button>
      </div>
    </div>
  );
}

export default Booking;
