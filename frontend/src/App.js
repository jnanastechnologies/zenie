import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import api from './services/api';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('zenie_auth');
    if (data) setUser(JSON.parse(data));
  }, []);

  const handleLogin = (auth) => {
    localStorage.setItem('zenie_auth', JSON.stringify(auth));
    setUser(auth.user);
    api.setToken(auth.token);
  };

  const handleLogout = () => {
    localStorage.removeItem('zenie_auth');
    api.setToken(null);
    setUser(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Zenie — College Portal</h1>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}