import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { useLocation } from 'react-router-dom';
import Menu from './Menu';
import './Comparacao.css';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const Comparacao = ({ toggleDarkMode, handleLogout }) => {
  const location = useLocation();
  const { selectedReports } = location.state || {};
  const [frameworksComuns, setFrameworksComuns] = useState([]);

  useEffect(() => {
    if (selectedReports && selectedReports.length > 0) {
      const frameworksUsuario1 = selectedReports[0]?.frameworksData || [];
      const frameworksUsuario2 = selectedReports[1]?.frameworksData || [];

      const comuns = frameworksUsuario1.filter((fw1) =>
        frameworksUsuario2.some((fw2) => fw1.frameworkName.trim().toLowerCase() === fw2.frameworkName.trim().toLowerCase())
      );
      
      setFrameworksComuns(comuns);
    }
  }, [selectedReports]);

  if (!selectedReports || selectedReports.length < 2) {
    return <div>Nenhum dado suficiente para comparação.</div>;
  }

  if (frameworksComuns.length === 0) {
    return <div>Nenhum framework comum encontrado para comparação.</div>;
  }

  const calculateFinalScore = (framework) => {
    if (!framework || !framework.criteria) return 0;

    let totalScore = 0;
    let totalWeight = 0;

    framework.criteria.forEach(criteria => {
      const weightValue = criteria.weight === 'Alta Prioridade' ? 3 : criteria.weight === 'Prioridade Média' ? 2 : 1;
      let totalCriteriaScore = 0;
      let totalCriteriaWeight = 0;

      if (criteria.subcriteria && Array.isArray(criteria.subcriteria)) {
        criteria.subcriteria.forEach(sub => {
          const subWeightValue = sub.weight === 'Alta Prioridade' ? 3 : sub.weight === 'Prioridade Média' ? 2 : 1;
          totalCriteriaScore += parseInt(sub.score, 10) * subWeightValue;
          totalCriteriaWeight += subWeightValue;
        });
      }

      const averageCriteriaScore = totalCriteriaWeight > 0 ? totalCriteriaScore / totalCriteriaWeight : 0;
      totalScore += averageCriteriaScore * weightValue;
      totalWeight += weightValue;
    });

    return totalWeight > 0 ? (totalScore / totalWeight).toFixed(2) : 0;
  };

  const data = {
    labels: frameworksComuns.map(fw => fw.frameworkName),
    datasets: selectedReports.map((report, index) => ({
      label: report.username,
      data: frameworksComuns.map((fw) => {
        const userFramework = report.frameworksData.find(
          (userFw) => userFw.frameworkName.trim().toLowerCase() === fw.frameworkName.trim().toLowerCase()
        );
        return userFramework ? calculateFinalScore(userFramework) : 0;
      }),
      backgroundColor: `rgba(${index * 100}, 99, 132, 0.2)`,
      borderColor: `rgba(${index * 100}, 99, 132, 1)`,
      borderWidth: 1,
    })),
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Nota Final',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Frameworks',
        },
      },
    },
  };

  const renderSubcriteriaComparison = (framework) => {
    return framework.criteria.map((criteria, index) => (
      <tr key={index}>
        <td>{criteria.title}</td>
        {criteria.subcriteria.map((sub, subIndex) => (
          <td key={subIndex}>
            <strong>{sub.title}</strong><br />
            Nota: {sub.score}<br />
            Peso: {sub.weight}
          </td>
        ))}
      </tr>
    ));
  };

  const renderCriteriaComparison = (framework) => {
    return framework.criteria.map((criteria, index) => (
      <tr key={index}>
        <td>{criteria.title}</td>
        <td>{calculateFinalScore(criteria)}</td>
        <td>{criteria.weight}</td>
      </tr>
    ));
  };

  return (
    <div className="comparacao-container">
      <Menu toggleDarkMode={toggleDarkMode} handleLogout={handleLogout} />
      <h2>Comparação de Relatórios</h2>

      {/* Gráfico de Barras */}
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>

      {/* Tabela Comparativa de Critérios */}
      <div className="tabela-comparativa">
        <h3>Tabela Comparativa de Critérios</h3>
        <table>
          <thead>
            <tr>
              <th>Critério</th>
              {selectedReports.map(report => (
                <th key={report.username}>{report.username}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {frameworksComuns.map((framework, index) => (
              <tr key={index}>
                <td>{framework.frameworkName}</td>
                {selectedReports.map(report => {
                  const userFramework = report.frameworksData.find(
                    (userFw) => userFw.frameworkName.trim().toLowerCase() === framework.frameworkName.trim().toLowerCase()
                  );
                  return (
                    <td key={report.username}>
                      {userFramework ? renderCriteriaComparison(userFramework) : 'Sem Dados'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabela Comparativa de Subcritérios */}
      <div className="tabela-comparativa">
        <h3>Tabela Comparativa de Subcritérios</h3>
        <table>
          <thead>
            <tr>
              <th>Subcritério</th>
              {selectedReports.map(report => (
                <th key={report.username}>{report.username}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {frameworksComuns.map((framework, index) => (
              <tr key={index}>
                <td>{framework.frameworkName}</td>
                {selectedReports.map(report => {
                  const userFramework = report.frameworksData.find(
                    (userFw) => userFw.frameworkName.trim().toLowerCase() === framework.frameworkName.trim().toLowerCase()
                  );
                  return (
                    <td key={report.username}>
                      {userFramework ? renderSubcriteriaComparison(userFramework) : 'Sem Dados'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comparacao;
