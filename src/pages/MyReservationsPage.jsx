import { useState, useEffect } from 'react';

function MyReservationsPage() {
  const [myReservations, setMyReservations] = useState([]);
  const [current_user, setCurrentUser] = useState([]);

  useEffect(() => {
    fetch('https://book-a-concert-api.onrender.com/current_user/reservations')
      .then(response => response.json())
      .then(data => setMyReservations(data));
  }, []);

  console.log(myReservations);

  useEffect(() => {
    fetch('https://book-a-concert-api.onrender.com/current_user')
      .then(response => response.json())
      .then(data => setCurrentUser(data));
  }, []);
  

  return (
    <div className="main-page">
      <h1>My Reservations</h1>
      {myReservations.length === 0 ? (
        <h2>The user <strong>{current_user.name}</strong> has no reservations yet</h2>
      ) : (
        <div className='header'>
          <span>Concert</span>
          <span>Date</span>
          <span>City</span>
        </div>
      )}
      {myReservations.length > 0 && (
        <ul className="reservations-list">
          {myReservations.map(reservation => (
            <li key={reservation.id} className="reservation-item">
              <span>{reservation.concert_title}</span>___
              <span>{reservation.date}</span>___
              <span>{reservation.city}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyReservationsPage;