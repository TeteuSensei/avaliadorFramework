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
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Usuário ou E-mail:
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            placeholder="Digite seu usuário ou e-mail"
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Digite sua senha"
          />
        </label>
        <button type="submit" className="login-btn">Entrar</button>
      </form>
      <p>
        Não tem uma conta?{' '}
        <button onClick={switchToSignup} className="signup-link">
          Cadastre-se aqui
        </button>
      </p>
    </div>
  );
};

export default LoginScreen;
