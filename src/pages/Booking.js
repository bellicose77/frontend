import React, { useState, useEffect } from 'react';
import { publicationGet, publicationPost } from '../api/api';
import { useSelector, useDispatch } from 'react-redux';

function Booking() {
  const [roomType, setRoomType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(); // Default to the first room
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.userEmail);

  const handleRoomSelection = (event) => {
    const roomId = event.target.value;
    const selected = roomType.find(room => room === roomId);
    setSelectedRoom(selected);
  };

  const handleBooking = async () => {
    const { data, err } = await publicationPost(
      'https://localhost:7128/api/Booking',
      {
          roomType: selectedRoom,
          checkInDate: startDate,
          checkOutDate: endDate,
          userEmail: userEmail
      }
    );

    if(data?.status == 200){
      alert('Booking successful!');
    }
    
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
        <select id="roomType" onChange={handleRoomSelection} value={selectedRoom}>
          {roomType && roomType.map(room => (
          <option key={room} value={room}>
            {room}
          </option>
        ))}
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
