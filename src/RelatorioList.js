import React, { useState, useEffect } from 'react';
import './RelatorioList.css';

const RelatorioList = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const storedReports = JSON.parse(localStorage.getItem('avaliacoes')) || [];

    setUsers(storedUsers);

    // Processar os relatórios para incluir pontuações calculadas
    const formattedReports = storedReports.flatMap((report) =>
      report.frameworks.map((framework) => ({
        username: report.username,
        frameworkName: framework.frameworkName || 'N/A',
        score: calculateFrameworkScore(framework.criteria),
        date: report.date || 'N/A',
      }))
    );

    setReports(formattedReports);
  }, []);

  // Função para calcular a pontuação média de um framework com base nos critérios
  const calculateFrameworkScore = (criteria) => {
    if (!criteria || criteria.length === 0) return 'N/A';

    const totalScore = criteria.reduce((acc, criterion) => {
      const criterionScore = calculateCriterionScore(criterion.subcriteria);
      return acc + criterionScore;
    }, 0);

    return (totalScore / criteria.length).toFixed(2);
  };

  // Função para calcular a pontuação média de um critério com base nos subcritérios
  const calculateCriterionScore = (subcriteria) => {
    if (!subcriteria || subcriteria.length === 0) return 0;

    const totalScore = subcriteria.reduce((acc, subcriterion) => {
      return acc + parseFloat(subcriterion.score || 0);
    }, 0);

    return totalScore / subcriteria.length;
  };

  // Renderização dos Relatórios Gerais
  const renderGeneralReports = () => (
    <div>
      <h3>Relatórios Gerais</h3>
      <table>
        <thead>
          <tr>
            <th>Avaliador</th>
            <th>Framework</th>
            <th>Pontuação</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td>{report.username}</td>
              <td>{report.frameworkName}</td>
              <td>{report.score}</td>
              <td>{report.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Renderização dos Relatórios por Usuário
  const renderUserReports = () => (
    <div>
      <h3>Relatórios por Usuário</h3>
      <label>Selecione o Usuário:</label>
      <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
        <option value="">Todos os Usuários</option>
        {users.map((user, index) => (
          <option key={index} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <th>Framework</th>
            <th>Pontuação</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {reports
            .filter((report) => selectedUser === '' || report.username === selectedUser)
            .map((report, index) => (
              <tr key={index}>
                <td>{report.frameworkName}</td>
                <td>{report.score}</td>
                <td>{report.date}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="relatorio-list-container">
      <h2>Relatórios</h2>
      <div className="tabs">
        <button
          className={activeTab === 'general' ? 'active' : ''}
          onClick={() => setActiveTab('general')}
        >
          Relatórios Gerais
        </button>
        <button
          className={activeTab === 'user' ? 'active' : ''}
          onClick={() => setActiveTab('user')}
        >
          Relatórios por Usuário
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'general' && renderGeneralReports()}
        {activeTab === 'user' && renderUserReports()}
      </div>
    </div>
  );
};

export default RelatorioList;
