import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
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

    useEffect(async () => {
        debugger;
        const { data, err } = await publicationGet(
            'https://localhost:7128/api/Room'
          );
    
        if(data.status == 200){
            setRooms(data.data);
        }
    }, []);

    const viewDetails = async (roomId) => {
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
            <button className="btn view-details-btn" to={`/room/${room.id}`}>View Details</button>
            <button className="btn book-now-btn" onClick={bookRoom}>Book Now</button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default App;
