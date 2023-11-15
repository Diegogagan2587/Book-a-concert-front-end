import { useState, useEffect } from 'react';
import '../stylesheets/MyReservationsPage.css';

function MyReservationsPage() {
  const [myReservations, setMyReservations] = useState([]);
  const [current_user, setCurrentUser] = useState([]);
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    fetch('https://book-a-concert-api.onrender.com/current_user/reservations')
      .then(response => response.json())
      .then(data => setMyReservations(data));
  }, []);

  useEffect(() => {
    fetch('https://book-a-concert-api.onrender.com/current_user')
      .then(response => response.json())
      .then(data => setCurrentUser(data));
  }, []);

  useEffect(() => {
    fetch('https://book-a-concert-api.onrender.com/concerts')
      .then(response => response.json())
      .then(data => setConcerts(data));
  }, []);

  return (
    <div className="my-reservations-page">
      <h1>My Reservations</h1>
      {myReservations.length === 0 ? (
        <h2>The user <strong>{current_user.name}</strong> has no reservations yet</h2>
      ) : (
        <ul>
          {myReservations.map(reservation => {
            const concert = concerts.find(concert => concert.id === reservation.concert_id);
            const img = concert ? concert.img : 'Image not available';
            const description = concert ? concert.description : 'Description not available';

            return (
              <li key={reservation.id} >
                <div className='img-container'>
                  <img src={img} alt="Concert Image" />
                </div>
                <div className='bottom'>
                  <div>{reservation.concert_title}</div>
                  <div>{description}</div>
                  <div>{reservation.city}</div>
                  <div>{reservation.date}</div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default MyReservationsPage;
