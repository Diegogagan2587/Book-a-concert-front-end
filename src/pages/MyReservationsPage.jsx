import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MyReservationsPage() {
  const [myReservations, setMyReservations] = useState([]);

  useEffect(() => {
    fetch('https://book-a-concert-api.onrender.com/current_user/reservations')
      .then(response => response.json())
      .then(data => setMyReservations(data));
  }, []);

  // console.log(myReservations);

  return (
    <div className="main-page">
      <h1>My Reservations</h1>
      <div className='header'>
        <span>User</span>
        <span>Concert</span>
        <span>Date</span>
        <span>City</span>
      </div>
      <ul className="reservations-list">
        {myReservations.map(reservation => (
          <li key={reservation.id} className="reservation-item">
            <span>{reservation.user_id}</span>___
            <span>{reservation.concert_id}</span>___
            <span>{reservation.date}</span>___
            <span>{reservation.city}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyReservationsPage;