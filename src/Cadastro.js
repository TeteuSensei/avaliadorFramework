import React, { useState } from 'react';
import './Cadastro.css'; // Certifique-se de que o CSS tenha os estilos corretos

const CadastroScreen = ({ onSignup, switchToLogin }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPartOfCompany, setIsPartOfCompany] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [sector, setSector] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (name && username && email && password) {
      const newUser = {
        name,
        username,
        email,
        password,
        isPartOfCompany,
        companyName: isPartOfCompany ? companyName : '',
        sector: isPartOfCompany ? sector : '',
        role: 'usuario', // Papel padrão
      };

      // Salvar o novo usuário no localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      console.log('Usuário cadastrado:', newUser);

      // Chamando a função onSignup para definir o estado de login
      onSignup(newUser);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={isPartOfCompany}
            onChange={(e) => setIsPartOfCompany(e.target.checked)}
          />
          Part of a company/sector?
        </label>
        {isPartOfCompany && (
          <>
            <label>
              Company Name:
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required={isPartOfCompany}
              />
            </label>
            <label>
              Sector:
              <input
                type="text"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                required={isPartOfCompany}
              />
            </label>
          </>
        )}
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{' '}
        <button onClick={switchToLogin}>Log in</button>
      </p>
    </div>
  );
};

export default CadastroScreen;
