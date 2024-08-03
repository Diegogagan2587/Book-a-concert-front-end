import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteConcert, selectConcertStatus } from '../redux/slices/concertSlice';
import { selectUserToken } from '../redux/slices/userSlice';
import '../stylesheets/DeleteConcertPage.css';
import getConcerts from '../redux/requests/getConcerts';

const DeleteConcertPage = () => {
  const [userConcerts, setUserConcerts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const concertStatus = useSelector(selectConcertStatus);
  const API_URL_BASE = import.meta.env.VITE_API_URL_BASE ||'https://book-a-concert-api.onrender.com'; 
  const token = useSelector(selectUserToken);

  useEffect(() => {
    const fetchUserConcerts = async () => {
      const response = await fetch(`${API_URL_BASE}/current_user/concerts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      const data = await response.json();
      setUserConcerts(data);
    };

    fetchUserConcerts();
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
        {userConcerts && userConcerts.length > 0 ? userConcerts.map(concert => (
          <li key={concert.id}>
            <span>{concert.title}</span>
            <button onClick={() => handleDelete(concert.id)}>Delete</button>
          </li>
        )) : (<p>No concerts to display</p> )}
      </ul>
    </div>
  );
};

export default DeleteConcertPage;
