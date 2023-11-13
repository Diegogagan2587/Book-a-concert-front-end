// src/pages/MainPage.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    fetch('https://book-a-concert-api.onrender.com/concerts')
      .then(response => response.json())
      .then(data => setConcerts(data));
  }, []);

  return (
    <div className="main-page">
      <h1>Available Concerts</h1>
      <ul className="concert-list">
        {concerts.map((concert) => (
          <li key={concert.id}>
            <Link to={`/concerts/${concert.id}`}>
              <div className="concert-item">
                <img src={concert.img} alt={concert.title} />
                <h2>{concert.title}</h2>
                <p>{concert.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainPage;
