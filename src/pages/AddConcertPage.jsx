/* eslint-disable react-hooks/exhaustive-deps */
// src/pages/AddConcertPage.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConcert } from '../redux/slices/concertSlice';
import '../stylesheets/AddConcertPage.css';
import getConcerts from '../redux/requests/getConcerts';

const AddConcertPage = () => {
  const API_URL_BASE = import.meta.env.VITE_API_URL_BASE ||'https://book-a-concert-api.onrender.com'; 
  const initialConcertData = {
    title: '',
    organizer_id: 0,
    description: '',
    img: '',
    price: '',
    date: '',
    city: ''
  };

  const [concertData, setConcertData] = useState(initialConcertData);
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const concertStatus = useSelector((state) => state.concerts.status);
  const token = useSelector((state) => state.user.details.token);

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (token) {
      fetch(`${API_URL_BASE}/current_user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token n the Authorization header
        },
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch current_user data');
      
      })
      .then((data) => setCurrentUser(data))
      .catch((error) => console.error('Error:', error));
    }
  }, []);

  useEffect(() => {
    if (concertStatus === 'succeeded') {
      setSuccessMessage('Concert created successfully!');
      //Since the concert was created, reset the concert data to its initial state
      setConcertData(initialConcertData);
    }
  }, [concertStatus]);

  useEffect(() => {
    // Resetear el mensaje de éxito cuando el componente se monta
    setSuccessMessage('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addConcert({ ...concertData, organizer_id: currentUser.id }))
    dispatch(getConcerts());
  };

  const handleChange = (e) => {
    setConcertData({ ...concertData, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-concert-page">
      <h2>Add a New Concert</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="add-concert-form">
        <input
          type="text"
          name="title"
          value={concertData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          value={concertData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="text"
          name="img"
          value={concertData.img}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <input
          type="number"
          name="price"
          value={concertData.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          type="date"
          name="date"
          value={concertData.date}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          value={concertData.city}
          onChange={handleChange}
          placeholder="City"
        />
        <button type="submit" className="add-concert-button">Add Concert</button>
      </form>
    </div>
  );
};

export default AddConcertPage;
