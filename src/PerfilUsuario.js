import React from 'react';
import Menu from './Menu'; // Importando o Menu para a página de perfil
import './PerfilUsuario.css';

const PerfilUsuario = ({ user, toggleDarkMode, handleLogout }) => {
  if (!user) {
    return <p>Nenhum usuário logado</p>;
  }

  return (
    <div className="perfil-container">
      <Menu toggleDarkMode={toggleDarkMode} handleLogout={handleLogout} />

      <h1>Perfil do Usuário</h1>

      <div className="perfil-info">
        <div className="perfil-imagem">
          <img 
            src={`https://via.placeholder.com/150?text=${user.name[0].toUpperCase()}`} 
            alt="Foto de Perfil" 
          />
        </div>

        <div className="perfil-detalhes">
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>E-mail:</strong> {user.email}</p>
          <p><strong>Função (Role):</strong> {user.role}</p>
          {user.companyName && <p><strong>Empresa:</strong> {user.companyName}</p>}
          {user.sector && <p><strong>Setor:</strong> {user.sector}</p>}
          <p><strong>Data de Cadastro:</strong> {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="perfil-acoes">
        <button className="btn-editar">Editar Perfil</button>
        <button className="btn-senha">Alterar Senha</button>
        <button className="btn-logout" onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
};

export default PerfilUsuario;
