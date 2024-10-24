import React from 'react';
import { useParams } from 'react-router-dom';

const rooms = [
  { id: 15, name: 'Deluxe Room', beds: 2, persons: 3, available: true, facilities: 'WiFi, TV, AC', image: '/images/deluxe.jpg' },
  { id: 16, name: 'Suite', beds: 3, persons: 4, available: false, facilities: 'WiFi, TV, AC, Mini Bar', image: '/images/suite.jpg' },
  { id: 17, name: 'Standard Room', beds: 1, persons: 2, available: true, facilities: 'WiFi, TV', image: '/images/standard.jpg' }
];

function RoomDetails() {
  const { id } = useParams();
  const room = rooms.find((room) => room.id === parseInt(id));

  return (
    <div className="room-details-container">
      <h2>{room.name}</h2>
      <img src={room.image} alt={room.name} className="room-details-image" />
      <p><strong>Number of Beds:</strong> {room.beds}</p>
      <p><strong>Max Persons:</strong> {room.persons}</p>
      <p><strong>Facilities:</strong> {room.facilities}</p>
      <p><strong>Availability:</strong> {room.available ? 'Available' : 'Not Available'}</p>
    </div>
  );
}

export default RoomDetails;
