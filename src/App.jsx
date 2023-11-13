// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ConcertDetailsPage from './pages/ConcertDetailsPage';
import ReserveConcertPage from './pages/ReserveConcertPage';
import Login from './components/Login';
import Signup from './components/Signup';
import NavigationPanel from './components/NavigationPanel';

function App() {
  return (
    <Router>
      <div className='App'>
        <NavigationPanel />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/concerts/:id" element={<ConcertDetailsPage />} />
          <Route path="/reserve" element={<ReserveConcertPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
