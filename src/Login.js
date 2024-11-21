import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Arquivo CSS personalizado

const LoginScreen = ({ onLogin, switchToSignup }) => {
  const [identifier, setIdentifier] = useState('');  // Nome de usuário ou e-mail
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Hook para redirecionamento

  const handleLogin = (e) => {
    e.preventDefault();

    // Recupera os usuários armazenados no localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Procura o usuário pelo nome de usuário ou e-mail
    const user = storedUsers.find(
      (u) => u.username === identifier || u.email === identifier
    );

    if (user) {
      if (user.password === password) {
        console.log("User logged in:", user);
        onLogin(user);
        navigate('/');  // Redireciona para a página inicial após o login
      } else {
        alert('Incorrect password');
      }
    } else {
      alert('User not found');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2> {/* Título da tela de login */}
      <form onSubmit={handleLogin}>
        <label>
          Username or Email:
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            placeholder="Enter your username or email"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </label>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
      <p>
        Don’t have an account?{' '}
        <button onClick={switchToSignup} className="signup-link">
          Sign up here
        </button>
      </p>
    </div>
  );
};

export default LoginScreen;
