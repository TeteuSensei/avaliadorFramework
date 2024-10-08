import React, { useState } from 'react';
import './Cadastro.css';  // Certifique-se de que o CSS tenha os estilos corretos

const CadastroScreen = ({ onSignup, switchToLogin }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPartOfCompany, setIsPartOfCompany] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [sector, setSector] = useState('');
  const [role, setRole] = useState('usuario'); // Perfil padrão: Usuário

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
        role, // Perfil (gestor ou usuário)
      };
  
      // Salvar o novo usuário no localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
  
      // Verificando se o papel foi salvo corretamente
      console.log("Usuário cadastrado:", newUser);
  
      // Chamando a função onSignup para definir o estado de login
      onSignup(newUser);
    }
  };
  
  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSignup}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Nome de Usuário:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Senha:
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
          Faz parte de uma empresa/setor?
        </label>
        {isPartOfCompany && (
          <>
            <label>
              Nome da Empresa:
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required={isPartOfCompany}
              />
            </label>
            <label>
              Setor:
              <input
                type="text"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                required={isPartOfCompany}
              />
            </label>
          </>
        )}
        <div className="perfil-section">
          <p>Selecione o Perfil:</p>
          <label>
            <input
              type="radio"
              value="usuario"
              checked={role === 'usuario'}
              onChange={(e) => setRole(e.target.value)}
            />
            Usuário
          </label>
          <label>
            <input
              type="radio"
              value="gestor"
              checked={role === 'gestor'}
              onChange={(e) => setRole(e.target.value)}
            />
            Gestor
          </label>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <p>
        Já tem uma conta?{' '}
        <button onClick={switchToLogin}>Fazer login</button>
      </p>
    </div>
  );
};

export default CadastroScreen;
