
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardTable = () => {
    const [bookingData, setBookingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const response = await axios.get('https://localhost:7128/api/dashboard/booking-info');
                setBookingData(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching booking information');
                setLoading(false);
            }
        };

        fetchBookingData();
    }, []);

    if (loading) return <p>Loading data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Booking Information</h1>
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Guest Name</th>
                        <th>Guest Email</th>
                        <th>Guest Phone</th>
                        <th>Booking Date</th>
                        <th>Check-in Date</th>
                        <th>Check-out Date</th>
                        <th>Room Number</th>
                        <th>Room Type</th>
                    </tr>
                </thead>
                <tbody>
                    {bookingData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.guestName}</td>
                            <td>{item.guestEmail}</td>
                            <td>{item.guestPhone}</td>
                            <td>{new Date(item.bookingDate).toLocaleDateString()}</td>
                            <td>{new Date(item.checkinDate).toLocaleDateString()}</td>
                            <td>{new Date(item.checkoutDate).toLocaleDateString()}</td>
                            <td>{item.roomNumber}</td>
                            <td>{item.roomType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardTable;
