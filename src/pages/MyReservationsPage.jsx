import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../stylesheets/MyReservationsPage.css';

function MyReservationsPage() {
  const { name } = useSelector((state) => state.user.details);
  const myReservations = useSelector((state) => state.reservation.created);
  const concerts = useSelector((state) => state.concerts.created);

  return (
    <div className="my-reservations-page">
      <h1>MY RESERVATIONS</h1>
      {myReservations.length === 0 ? (
        <h2>The user <strong>{name}</strong> has no reservations yet</h2>
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
                  <div className='concert_title'>{reservation.concert_title}</div>
                  <div className='concert_description'>{description}</div>
                  <div className='city-date'>
                    <div>{reservation.city}</div>
                    <div>{reservation.date}</div>
                  </div>
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
