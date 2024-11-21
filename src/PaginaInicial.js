import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from './Menu'; // Importa o componente de menu
import './PaginaInicial.css';

const PaginaInicial = ({ user, toggleDarkMode, handleLogout }) => {
  const navigate = useNavigate();
  const [frameworksAverages, setFrameworksAverages] = useState([]);

  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem('avaliacoes')) || [];

    const frameworkScores = {};

    // Itera pelos relatórios para acumular as médias dos frameworks
    storedReports.forEach((report) => {
      report.frameworks.forEach((framework) => {
        // Calcula a média dos subcritérios de cada critério
        const frameworkAverage = framework.criteria.reduce((sum, criterion) => {
          const subCriteriaAverage =
            criterion.subcriteria.reduce(
              (subSum, sub) => subSum + parseFloat(sub.score || 0),
              0
            ) / criterion.subcriteria.length;

          return sum + subCriteriaAverage;
        }, 0) / framework.criteria.length;

        if (!frameworkScores[framework.frameworkName]) {
          frameworkScores[framework.frameworkName] = { totalScore: 0, count: 0 };
        }

        frameworkScores[framework.frameworkName].totalScore += frameworkAverage;
        frameworkScores[framework.frameworkName].count += 1;
      });
    });

    // Calcula a média final de cada framework e ordena do maior para o menor
    const averages = Object.entries(frameworkScores)
      .map(([frameworkName, data]) => ({
        frameworkName,
        averageScore: (data.totalScore / data.count).toFixed(2), // Média com 2 casas decimais
      }))
      .sort((a, b) => b.averageScore - a.averageScore); // Ordena do maior para o menor

    setFrameworksAverages(averages);
  }, []);

  const handleIniciarAvaliacao = () => {
    navigate('/selecionar-frameworks'); // Direciona para a seleção de frameworks
  };

  return (
    <div className="pagina-inicial-container">
      {/* Cabeçalho com Menu */}
      <Menu toggleDarkMode={toggleDarkMode} handleLogout={handleLogout} />

      {/* Informações do usuário */}
      <div className="user-info">
        <h2>User Profile</h2>
        <div className="info-item">
          <strong>Username:</strong> {user.username}
        </div>
        <div className="info-item">
          <strong>Email:</strong> {user.email}
        </div>
        {user.isPartOfCompany && (
          <>
            <div className="info-item">
              <strong>Company:</strong> {user.companyName}
            </div>
            <div className="info-item">
              <strong>Sector:</strong> {user.sector}
            </div>
          </>
        )}
      </div>

      {/* Tabela de rankings dos frameworks */}
      <div className="frameworks-averages">
        <h2>Framework Rankings</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Framework Name</th>
              <th>e-CRF</th>
            </tr>
          </thead>
          <tbody>
            {frameworksAverages.map((framework, index) => (
              <tr key={index}>
                <td>{index + 1}°</td> {/* Exibe o ranking baseado no índice */}
                <td>{framework.frameworkName}</td>
                <td>{framework.averageScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botões de ação */}
      <div className="action-buttons">
        <button onClick={handleIniciarAvaliacao} className="btn-primary">
          Start Evaluation
        </button>
        <button onClick={() => navigate('/explicacao')} className="btn-secondary">
          How the Evaluation Works
        </button>
      </div>
    </div>
  );
};

export default PaginaInicial;
