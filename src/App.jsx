// src/App.jsx
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import ConcertDetailsPage from './pages/ConcertDetailsPage';
import ReserveConcertPage from './pages/ReserveConcertPage'; 
import Authentication from './components/Authentication';
import NavigationPanel from './components/NavigationPanel';

function App() {
  const user = useSelector((state) => state.user.details);

  return (
    <Router>
      <div className='App'>
        <NavigationPanel />
        {!user && <Authentication />}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/concerts/:id" element={<ConcertDetailsPage />} />
          <Route path="/reserve" element={<ReserveConcertPage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
