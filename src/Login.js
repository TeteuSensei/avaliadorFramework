import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';  // Esta linha importa o useTranslation
import './Login.css';  // Arquivo CSS personalizado

const LoginScreen = ({ onLogin, switchToSignup }) => {
  const [identifier, setIdentifier] = useState('');  // Nome de usuário ou e-mail
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Hook para redirecionamento
  const { t } = useTranslation();  // Certifique-se de que está sendo usado corretamente
  
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
        console.log("Usuário logado:", user);
        onLogin(user);
        navigate('/');  // Redireciona para a página inicial após o login
      } else {
        alert('Senha incorreta');
      }
    } else {
      alert('Usuário não encontrado');
    }
  };

  return (
    <div className="login-container">
      <h2>{t('login.title')}</h2> {/* Usando a tradução para o título */}
      <form onSubmit={handleLogin}>
        <label>
          {t('login.identifier')}:
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            placeholder={t('login.identifier_placeholder')}
          />
        </label>
        <label>
          {t('login.password')}:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder={t('login.password_placeholder')}
          />
        </label>
        <button type="submit" className="login-btn">
          {t('login.button')}
        </button>
      </form>
      <p>
        {t('login.no_account')}{' '}
        <button onClick={switchToSignup} className="signup-link">
          {t('login.signup_link')}
        </button>
      </p>
    </div>
  );
};

export default LoginScreen;
