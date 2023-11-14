// src/pages/AddConcertPage.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConcert } from '../redux/slices/concertSlice';

const AddConcertPage = () => {
  const initialConcertData = {
    title: '',
    organizer_id: 0,
    description: '',
    img: '',
    price: 0,
    date: '',
    city: ''
  };

  const [concertData, setConcertData] = useState(initialConcertData);
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const concertStatus = useSelector((state) => state.concerts.status);

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    fetch('https://book-a-concert-api.onrender.com/current_user')
      .then((res) => res.json())
      .then((data) => setCurrentUser(data));
  }, []);

  useEffect(() => {
    if (concertStatus === 'succeeded') {
      setSuccessMessage('Concert created successfully!');
      setConcertData(initialConcertData);
    }
  }, [concertStatus]);

  useEffect(() => {
    // Resetear el mensaje de éxito cuando el componente se monta
    setSuccessMessage('');
  }, []); // Aquí faltaba cerrar la función useEffect

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addConcert({ ...concertData, organizer_id: currentUser.id }));
  };

  const handleChange = (e) => {
    setConcertData({ ...concertData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Add a New Concert</h2>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add Concert</button>
      </form>
    </div>
  );
};

export default AddConcertPage;
