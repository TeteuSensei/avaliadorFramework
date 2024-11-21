import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';  // Certifique-se de que o CSS está configurado

const Menu = ({ toggleDarkMode, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();  // Para navegação
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Recupera o usuário logado do localStorage e define a função do usuário
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser && storedUser.role) {
      setUserRole(storedUser.role);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path) => {
    setMenuOpen(false);  // Fecha o menu ao navegar
    navigate(path);  // Navega para o caminho especificado
  };

  // Função para exibir o relatório do usuário logado
  const handleViewRelatorio = () => {
    const storedAvaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (storedUser && storedUser.username) {
      const userReport = storedAvaliacoes.find((av) => av.username === storedUser.username);
      if (userReport) {
        navigate('/relatorio', { state: { frameworksData: userReport.frameworks } });
      } else {
        alert("No report found for this user.");
      }
    } else {
      alert("User not found or not logged in.");
    }
  };

  return (
    <div className="menu-container">
      <button className="menu-toggle" onClick={toggleMenu}>☰ Menu</button>
      {menuOpen && (
        <div className="menu-content">
          <button onClick={() => handleNavigation('/')}>Home</button>
          <button onClick={() => handleNavigation('/PerfilUsuario')}>Profile</button>
          <button onClick={handleViewRelatorio}>Report</button>
          {/* Condicional para exibir "Equipe" somente se for gestor ou admin */}
          {(userRole === 'gestor' || userRole === 'admin') && (
            <button onClick={() => handleNavigation('/Equipe')}>Team</button>
          )}
          {/* Condicional para exibir "Admin Panel" somente se for admin }
          {userRole === 'admin' && (....)} */}
            
            <button onClick={() => handleNavigation('/admin')}>Admin Panel</button>
          
          <button onClick={toggleDarkMode}>Dark Mode</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Menu;
