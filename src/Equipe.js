import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Equipe.css';
import Menu from './Menu';  // Importa o menu para exibir na página de equipe

const Equipe = ({ user, toggleDarkMode, handleLogout }) => {
  const [equipe, setEquipe] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]); // Estado para armazenar relatórios selecionados
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar os usuários cadastrados do localStorage
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Filtrar os usuários que pertencem à mesma empresa ou setor do usuário logado
    const teamMembers = allUsers.filter(
      (u) => u.companyName === user.companyName && u.sector === user.sector && u.username !== user.username
    );
    setEquipe(teamMembers);
  }, [user]);

  const handleViewReport = (username) => {
    const storedAvaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
    const userReport = storedAvaliacoes.find((av) => av.username === username);

    if (userReport) {
      navigate('/relatorio', { state: { frameworksData: userReport.frameworks } });
    } else {
      alert("No report found for this user.");
    }
  };

  const handleDeleteReport = (username) => {
    let storedAvaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
    const updatedAvaliacoes = storedAvaliacoes.filter((av) => av.username !== username);
    localStorage.setItem('avaliacoes', JSON.stringify(updatedAvaliacoes));
    alert("Report successfully deleted!");
  };

  const handleSelectReport = (username) => {
    const storedAvaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
    const userReport = storedAvaliacoes.find((av) => av.username === username);

    if (userReport) {
      // Adiciona ou remove o relatório selecionado
      setSelectedReports((prevSelected) =>
        prevSelected.some((report) => report.username === username)
          ? prevSelected.filter((report) => report.username !== username)
          : [...prevSelected, { username, frameworksData: userReport.frameworks }]
      );
    }
  };

  const handleCompareReports = () => {
    if (selectedReports.length < 2) {
      alert("Please select at least two reports to compare.");
      return;
    }

    // Verificar se todos os relatórios selecionados avaliaram o mesmo framework
    const frameworkNames = selectedReports.map((report) =>
      report.frameworksData.map((framework) => framework.frameworkName)
    );

    // Checar se todos os relatórios selecionaram frameworks iguais
    const firstFrameworkSet = frameworkNames[0];
    const allMatch = frameworkNames.every((frameworkSet) =>
      frameworkSet.some((frameworkName) => firstFrameworkSet.includes(frameworkName))
    );

    if (!allMatch) {
      alert("Users did not evaluate the same framework. Comparison is not possible.");
    } else {
      // Se todos os frameworks coincidirem, navegue para a página de comparação
      navigate("/comparacao", { state: { selectedReports } });
    }
  };

  return (
    <div className="equipe-container">
      {/* Botão de Menu */}
      <Menu toggleDarkMode={toggleDarkMode} handleLogout={handleLogout} />

      <h2>Team of {user?.companyName}</h2>
      {equipe.length > 0 ? (
        <>
          <ul className="equipe-list">
            {equipe.map((member) => (
              <li key={member.username} className="equipe-item">
                <span className="equipe-name">
                  {member.name} ({member.username}) - {member.role}
                </span>
                <div className="equipe-buttons">
                  <button className="btn-relatorio" onClick={() => handleViewReport(member.username)}>
                    View Report
                  </button>
                  <button className="btn-delete" onClick={() => handleDeleteReport(member.username)}>
                    Delete Report
                  </button>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleSelectReport(member.username)}
                      checked={selectedReports.some((report) => report.username === member.username)}
                    />
                    Select for Comparison
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <button className="btn-comparar" onClick={handleCompareReports}>
            Compare Selected Reports
          </button>
        </>
      ) : (
        <p>No team members found.</p>
      )}
    </div>
  );
};

export default Equipe;
