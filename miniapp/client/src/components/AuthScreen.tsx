import React from 'react';
import axios from '../services/api';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const handleAuth = async () => {
    try {
      // Здесь будет логика аутентификации через Circle
      // Например, перенаправление на OAuth-страницу Circle
      const response = await axios.get('/auth/circle');
      // После успешной аутентификации вызываем onAuthSuccess
      onAuthSuccess();
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <button onClick={handleAuth}>Войти через Circle</button>
    </div>
  );
};

export default AuthScreen;