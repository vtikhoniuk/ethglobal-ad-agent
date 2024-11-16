import React from 'react';

interface LoginProps {
  onLoginSuccess: (userData: { token: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const handleLogin = async () => {
    const userData = {
      token: 'user_jwt_token', // TODO Replace with real token after authentication
    };
    onLoginSuccess(userData);
  };

  return (
    <div>
      <h2>Login to Continue</h2>
      <button onClick={handleLogin}>Login with Circle</button>
    </div>
  );
};

export default Login;