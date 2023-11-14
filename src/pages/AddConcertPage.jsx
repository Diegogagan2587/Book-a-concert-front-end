// src/pages/AddConcertPage.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConcert } from '../redux/slices/concertSlice';

const AddConcertPage = () => {
  const [concertData, setConcertData] = useState({
    title: '',
    organizer_id: 0,
    description: '',
    img: '',
    price: 0,
    date: '',
    city: ''
  });
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    fetch('https://book-a-concert-api.onrender.com/current_user')

      .then((res) => res.json())
      .then((data) => setCurrentUser(data));
  }, []);
  console.log("This is the current user id: " + currentUser.id);

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
