import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteConcert } from '../redux/slices/concertSlice';
import '../stylesheets/DeleteConcertPage.css';
import getConcerts from '../redux/requests/getConcerts';

const DeleteConcertPage = () => {
  const [userConcerts, setUserConcerts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const concertStatus = useSelector((state) => state.concerts.status);
  const API_URL_BASE = import.meta.env.VITE_API_URL_BASE ||'https://book-a-concert-api.onrender.com'; 

  useEffect(() => {
    fetch(`${API_URL_BASE}/current_user/concerts`)
      .then(res => {
        res.json();
      })
      .then(data => setUserConcerts(data))
  }, []);

  useEffect(() => {
    if (concertStatus === 'delete_succeeded') {
      setSuccessMessage('Concert deleted successfully!');
    }
  }, [concertStatus]);

    const handleDelete = async (concertId) => {
    await dispatch(deleteConcert(concertId));
  
    // After the deletion is successful, update the userConcerts state
    const updatedUserConcerts = userConcerts.filter(concert => concert.id !== concertId);
    setUserConcerts(updatedUserConcerts);

    // Dispatch getConcerts to fetch the updated list
    dispatch(getConcerts());
  };
  

  return (
    <div className="delete-concert-page">
      <h2>Delete Your Concerts</h2>
      {successMessage && <p>{successMessage}</p>}
      <ul>
        {userConcerts.map(concert => (
          <li key={concert.id}>
            <span>{concert.title}</span>
            <button onClick={() => handleDelete(concert.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteConcertPage;
