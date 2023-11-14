import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteConcert } from '../redux/slices/concertSlice';

const DeleteConcertPage = () => {
  const [userConcerts, setUserConcerts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const concertStatus = useSelector((state) => state.concerts.status);

  useEffect(() => {
    fetch('https://book-a-concert-api.onrender.com/current_user/concerts')
      .then(res => res.json())
      .then(data => setUserConcerts(data));
  }, []);

  useEffect(() => {
    if (concertStatus === 'delete_succeeded') {
      setSuccessMessage('Concert deleted successfully!');
    }
  }, [concertStatus]);

  const handleDelete = (concertId) => {
    dispatch(deleteConcert(concertId));
  };

  return (
    <div>
      <h2>Delete Your Concerts</h2>
      {successMessage && <p>{successMessage}</p>}
      <ul>
        {userConcerts.map(concert => (
          <li key={concert.id}>
            {concert.title} - <button onClick={() => handleDelete(concert.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteConcertPage;
