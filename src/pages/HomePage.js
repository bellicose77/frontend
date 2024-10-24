import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';
import image6 from '../assets/image6.jpg';
import image7 from '../assets/image7.jpg';
import image8 from '../assets/image8.jpg';
import image9 from '../assets/image9.jpg';
import { publicationGet } from '../api/api';

function App() {
    const [slideIndex, setSlideIndex] = useState(0); // Initial slide index
    const [rooms, setRooms] = useState();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const navigate = useNavigate();

    const slides = [
        { src: image1, alt: 'Room 1' },
        { src: image2, alt: 'Room 2' },
        { src: image3, alt: 'Room 3' },
    ];

    // Change slide automatically every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
        setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [slides.length]);

    const currentSlide = (index) => {
        setSlideIndex(index);
    };

    useEffect(() => {
        getRooms();
    }, []);

    async function getRooms(){
      const { data, err } = await publicationGet(
        'https://localhost:7128/api/Room'
      );
      
      if(data?.status == 200){
          var rooms = data.data;
          rooms.forEach(element => {
            if (element.image == 'image4')
              element.image = image4;
            if (element.image == 'image5')
              element.image = image5;
            if (element.image == 'image6')
              element.image = image6;
            if (element.image == 'image7')
              element.image = image7;
            if (element.image == 'image8')
              element.image = image8;
            if (element.image == 'image9')
              element.image = image9;
          });
          setRooms(rooms);
      }
    }

    const viewDetails = (roomId) => {
        navigate('/room/' + roomId);
    };

    const bookRoom = () => {
        if (isLoggedIn){
            navigate('/booking');
        }
        else {
            navigate('/login')
        }
    };

  return (
    <div className="app-container">
        <div className="image-slider">
            {slides.map((slide, index) => (
            <div
                className={`slides ${index === slideIndex ? 'active' : ''}`}
                key={index}
            >
                <img src={slide.src} alt={slide.alt} />
            </div>
            ))}

            {/* Dots for navigation */}
            <div className="dots">
                {slides.map((_, index) => (
                    <span
                    key={index}
                    className={`dot ${index === slideIndex ? 'active' : ''}`}
                    onClick={() => currentSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
      <h2>Available Rooms</h2>
      <div className="rooms-container">
      {rooms && rooms.map((room) => (
        <div className="room-card" key={room.id}>
          <h2 className="room-type">{room.roomType}</h2>
          <div className="room-image-container">
            <img src={room.image} alt={room.roomType} className="room-image" />
          </div>
          <p className="room-price">৳ {room.pricePerNight}</p>
          <p className="price-description">From/Per Night</p>
          <p className="room-description">{room.description}</p>
          <div className="room-buttons">
            <button className="btn view-details-btn" onClick={() => viewDetails(room.id)}>View Details</button>
            <button className="btn book-now-btn" onClick={bookRoom}>Book Now</button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default App;
