import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaInicial from './PaginaInicial';
import Avaliacao from './Avaliacao';
import Relatorio from './Relatorio';
import Comparacao from './Comparacao';
import CadastroScreen from './Cadastro';
import LoginScreen from './Login';
import Equipe from './Equipe';
import SelecionarFrameworks from './SelecionarFrameworks';
import PerfilUsuario from './PerfilUsuario';
import Explicacao from './Explicacao';
import AdminPanel from './AdminPanel'; // Importando o painel administrativo

import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [frameworks, setFrameworks] = useState([]); // Frameworks selecionados

  // Função de signup
  const handleSignup = (newUser) => {
    setUser(newUser);
    setIsLoggedIn(true);
  };

  const handleLogin = (existingUser) => {
    const loggedInUser = { ...existingUser, role: 'gestor' };
    console.log("Logged in as:", loggedInUser);
    setUser(loggedInUser);
    setIsLoggedIn(true);
  };

  // Função de logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  // Alternar entre login e signup
  const switchToSignup = () => {
    setShowSignup(true);
  };

  const switchToLogin = () => {
    setShowSignup(false);
  };

  // Alternar modo escuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <Router>
      <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
        <Routes>
          {/* Rota inicial - verifica se o usuário está logado */}
          <Route
            path="/"
            element={
              !isLoggedIn ? (
                showSignup ? (
                  <CadastroScreen onSignup={handleSignup} switchToLogin={switchToLogin} />
                ) : (
                  <LoginScreen onLogin={handleLogin} switchToSignup={switchToSignup} />
                )
              ) : (
                <PaginaInicial
                  user={user}
                  toggleDarkMode={toggleDarkMode}
                  handleLogout={handleLogout}
                />
              )
            }
          />

          {/* Rota para selecionar frameworks */}
          <Route
            path="/selecionar-frameworks"
            element={<SelecionarFrameworks setFrameworks={setFrameworks} />}
          />

          {/* Rota para avaliação */}
          <Route
            path="/avaliacao"
            element={<Avaliacao user={user} frameworks={frameworks} />}
          />

          {/* Rota para relatório */}
          <Route path="/relatorio" element={<Relatorio />} />

          {/* Rota para comparação */}
          <Route path="/comparacao" element={<Comparacao />} />

          {/* Rota para equipe */}
          <Route path="/equipe" element={<Equipe user={user} />} />

          {/* Rota para perfil do usuário */}
          <Route path="/PerfilUsuario" element={<PerfilUsuario user={user} />} />

          {/* Rota para explicação */}
          <Route path="/explicacao" element={<Explicacao toggleDarkMode={toggleDarkMode} handleLogout={handleLogout} />} />
        
          {/* Rota para o painel administrativo */}
          <Route path="/admin" element={<AdminPanel />} /> 
          
                  
        </Routes>
      </div>
    </Router>
  );
};

export default App;
