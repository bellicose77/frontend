import React, {useState, useEffect} from 'react';
import '../css/RoomDetails.css';
import { useParams } from 'react-router-dom';
import { publicationGet, publicationPost } from '../api/api';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';
import image6 from '../assets/image6.jpg';
import image7 from '../assets/image7.jpg';
import image8 from '../assets/image8.jpg';
import image9 from '../assets/image9.jpg';

const RoomDetails = () => {
  const { id } = useParams();
  const [roomInfo, setRoomInfo] = useState();
  const [amenities, setAmenities] = useState();
  const [roomImage, setRoomImage] = useState();

  useEffect(() => {
    fetchRoomInfo();
  }, [id])

  async function fetchRoomInfo(){
    const {data, err} = await publicationGet('https://localhost:7128/api/Room/' + id);

    if (data?.status == 200) {
      var roomProperties = data.data;
      setRoomInfo(roomProperties);

      var amenities= [
        { name: 'Wi-Fi', icon: '📶', value:  roomProperties.wifi ? 'Free' : 'Not Available'},
        { name: 'TV', icon: '📺', value:  roomProperties.tv},
        { name: 'Bed', icon: '🍸', value: roomProperties.bed },
        { name: 'Person', icon: '🔒', value: roomProperties.capacity },
        { name: 'Air Conditioning', icon: '❄️', value: roomProperties.airConditioning ? 'Yes' : 'No' },
        { name: 'Room Service', icon: '🍽️', value: roomProperties.roomService ?? 'Not available' },
        { name: 'Laundry', icon: '🧺', value: roomProperties.laundry ? 'Available' : 'Available on charge' },
        { name: 'Coffee Maker', icon: '☕', value: roomProperties.coffeeMaker ? 'Yes' : 'No' },
      ]
      setAmenities(amenities);

      var image;
      if (roomProperties.image == 'image4')
        image = image4;
      if (roomProperties.image == 'image5')
        image = image5;
      if (roomProperties.image == 'image6')
        image = image6;
      if (roomProperties.image == 'image7')
        image = image7;
      if (roomProperties.image == 'image8')
        image = image8;
      if (roomProperties.image == 'image9')
        image = image9;

      setRoomImage(image);
    }
  };

  return (
    <>
    {roomInfo &&
    <div className="room-details-container">
      <div className="room-image-container">
        <img src={roomImage} alt={roomInfo.roomType} className="room-image-main" />
        <div className="room-image-overlay">
          <h1>{roomInfo.roomType}</h1>
        </div>
      </div>
      
      <div className="room-info">
        <span className="room-title">{roomInfo.roomType}</span>
        <span className="room-price">{roomInfo.pricePerNight} / Night</span>
      </div>

      <div className="room-amenities">
        <h3>Amenities</h3>
        <div className="amenities-grid">
          {amenities.map((amenity, index) => (
            <div key={index} className="amenity-item">
              <span className="amenity-icon">{amenity.icon}</span>
              <span className="amenity-name">{amenity.name}</span>
              <span className="amenity-value">{amenity.value}</span>
            </div>
          ))
          }
        </div>
      </div>

      <div className="room-description">
        <h3>Description</h3>
        <p>{roomInfo.description}</p>
      </div>

      <div className="room-reviews">
        <h3>Reviews</h3>
        <p>No reviews yet. Be the first to leave a review!</p>

        <form className="review-form">
          <textarea placeholder="Write your review here..." rows="4"></textarea>
          <button type="submit" className="submit-review-button">Submit Review</button>
        </form>
      </div>
    </div>
    }
    </>
  );
};

export default RoomDetails;
