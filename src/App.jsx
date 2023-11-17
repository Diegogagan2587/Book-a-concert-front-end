// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ConcertDetailsPage from './pages/ConcertDetailsPage';
import ReserveConcertPage from './pages/ReserveConcertPage';
import Login from './components/Login';
import Signup from './components/Signup';
import NavigationPanel from './components/NavigationPanel';
import MyReservationsPage from './pages/MyReservationsPage';
import AddConcertPage from './pages/AddConcertPage';
import DeleteConcertPage from './pages/DeleteConcertPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getConcerts from './redux/requests/getConcerts';
import getReservations from './redux/requests/getReservations';
import {filteredUserReservations} from './redux/slices/reservationSlice';

const App = () => {
  const dispatch = useDispatch();
  const { logged, id } = useSelector((state) => state.user.details);

  useEffect(() => {
    dispatch(getConcerts());
    dispatch(getReservations());
  }, [dispatch]);

  useEffect(() => {
    logged && dispatch(filteredUserReservations(id));
  }, [dispatch,logged, id]);


  return (
    <Router>
      <div className="App sm:flex">
        <NavigationPanel />
        <main className="container sm:w-3/4 h-screen sm:overflow-y-auto">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/concerts/:id" element={<ConcertDetailsPage />} />
            <Route path="/reserve" element={<ReserveConcertPage />} />
            <Route path="/my-reservations" element={<MyReservationsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/add-concert" element={<AddConcertPage />} />
            <Route path="/delete-concert" element={<DeleteConcertPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
