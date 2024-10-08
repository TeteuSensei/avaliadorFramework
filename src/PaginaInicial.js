import React from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from './Menu'; // Importa o componente de menu
import './PaginaInicial.css';

const PaginaInicial = ({ user, toggleDarkMode, handleLogout }) => {
  const navigate = useNavigate();

  const handleIniciarAvaliacao = () => {
    navigate('/selecionar-frameworks');  // Direciona para a seleção de frameworks
  };

  return (
    <div className="pagina-inicial-container">
      {/* Cabeçalho com Menu */}
      <Menu toggleDarkMode={toggleDarkMode} handleLogout={handleLogout} />
      
      {/* Informações do usuário */}
      <div className="user-info">
        <h2>Perfil do Usuário</h2>
        <div className="info-item">
          <strong>Nome de Usuário:</strong> {user.username}
        </div>
        <div className="info-item">
          <strong>E-mail:</strong> {user.email}
        </div>
        {user.isPartOfCompany && (
          <>
            <div className="info-item">
              <strong>Empresa:</strong> {user.companyName}
            </div>
            <div className="info-item">
              <strong>Setor:</strong> {user.sector}
            </div>
          </>
        )}
      </div>

      {/* Botões de ação */}
      <div className="action-buttons">
        <button onClick={handleIniciarAvaliacao} className="btn-primary">
          Iniciar Avaliação
        </button>
        <button onClick={() => navigate('/explicacao')} className="btn-secondary">
          Como Funciona a Avaliação
        </button>
      </div>
    </div>
  );
};

export default PaginaInicial;
