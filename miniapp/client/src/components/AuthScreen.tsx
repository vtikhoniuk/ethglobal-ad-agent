import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../services/api';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuth = () => {
    const clientId = 'YOUR_CIRCLE_CLIENT_ID';
    const redirectUri = encodeURIComponent('http://localhost:3000/auth/callback');
    const responseType = 'code';
    const scope = 'profile payments';
    const state = 'someRandomState';

    const authUrl = `https://circle.com/oauth/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

    window.location.href = authUrl;
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');
    const state = query.get('state');

    if (code) {
      // Send code to server
      axios
        .post('/auth/circle/callback', { code, state })
        .then((response) => {
          onAuthSuccess();
          navigate('/'); // Go to main page
        })
        .catch((error) => {
          console.error('Ошибка при обмене кода на токен:', error);
        });
    }
  }, [location, navigate, onAuthSuccess]);

  return (
    <div>
      <h2>Вход</h2>
      <button onClick={handleAuth}>Войти через Circle</button>
    </div>
  );
};

export default AuthScreen;