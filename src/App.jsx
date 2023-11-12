// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import MainPage from './pages/MainPage';
import ConcertDetailsPage from './pages/ConcertDetailsPage';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Router>
      <div className='App'>
        <button onClick={() => setShowLogin(true)}>Login</button>
        <button onClick={() => setShowLogin(false)}>Signup</button>
        {showLogin ? <Login /> : <Signup />}

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/concerts/:id" element={<ConcertDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
