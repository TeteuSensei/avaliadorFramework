import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';  // Se houver um CSS

const Menu = ({ toggleDarkMode, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();  // Para navegação

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path) => {
    setMenuOpen(false);  // Fecha o menu ao navegar
    navigate(path);  // Navega para o caminho passado
  };

  return (
    <div className="menu-container">
      <button className="menu-toggle" onClick={toggleMenu}>☰ Menu</button>
      {menuOpen && (
        <div className="menu-content">
          <button onClick={() => handleNavigation('/')}>Início</button>
          <button onClick={() => handleNavigation('/PerfilUsuario')}>Perfil</button>
          <button onClick={() => handleNavigation('/Relatorio')}>Relatorio</button>
          <button onClick={() => handleNavigation('/Equipe')}>Equipe</button>
          <button onClick={toggleDarkMode}>Modo Escuro</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Menu;
