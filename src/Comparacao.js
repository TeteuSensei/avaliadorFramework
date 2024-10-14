import React, { useEffect, useState } from 'react'; 
import { Bar } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js'; 
import { useLocation } from 'react-router-dom'; 
import Menu from './Menu'; 
import './Comparacao.css'; 

// Registrando componentes do gráfico com ChartJS
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

  // Função para calcular a nota final de um framework
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

  // Função para calcular a nota de um critério
  const calculateCriteriaScore = (criteria) => {
    if (!criteria || !criteria.subcriteria) return 0;

    let totalScore = 0;
    let totalWeight = 0;

    criteria.subcriteria.forEach(sub => {
      const subWeightValue = sub.weight === 'Alta Prioridade' ? 3 : sub.weight === 'Prioridade Média' ? 2 : 1;
      totalScore += parseInt(sub.score, 10) * subWeightValue;
      totalWeight += subWeightValue;
    });

    return totalWeight > 0 ? (totalScore / totalWeight).toFixed(2) : 0;
  };

  // Função para calcular a média das notas finais de um framework para todos os avaliadores
  const calcularMediaNotaFramework = (frameworkName) => {
    let totalNota = 0;
    let numAvaliadores = 0;

    selectedReports.forEach((report) => {
      const userFramework = report.frameworksData.find(
        (fw) => fw.frameworkName.trim().toLowerCase() === frameworkName.trim().toLowerCase()
      );

      if (userFramework) {
        totalNota += parseFloat(calculateFinalScore(userFramework)); // Soma a nota final do framework
        numAvaliadores += 1; // Conta o número de avaliadores que avaliaram esse framework
      }
    });

    return numAvaliadores > 0 ? (totalNota / numAvaliadores).toFixed(2) : 'Sem Dados';
  };

  // Função para renderizar a nova tabela de médias
  const renderTabelaMediaFrameworks = () => {
    return (
      <div className="tabela-media-frameworks">
        <h3>Média das Notas dos Frameworks</h3>
        <table>
          <thead>
            <tr>
              <th>Framework</th>
              <th>Média das Notas</th>
            </tr>
          </thead>
          <tbody>
            {frameworksComuns.map((framework, index) => (
              <tr key={index}>
                <td>{framework.frameworkName}</td>
                <td>{calcularMediaNotaFramework(framework.frameworkName)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Preparando os dados para o gráfico de barras
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

  // Configurações do gráfico de barras
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

  // Função para renderizar a comparação de critérios
  const renderCriteriaComparison = (framework) => {
    return framework.criteria.map((criteria, index) => (
      <tr key={index}>
        <td>{criteria.title}</td>
        <td>{calculateCriteriaScore(criteria)}</td> {/* Nota calculada do critério */}
        <td>{criteria.weight}</td> {/* Exibe o peso do critério */}
      </tr>
    ));
  };

  // Função para renderizar a comparação de subcritérios
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

  return (
    <div className="comparacao-container">
      {/* Menu de navegação */}
      <Menu toggleDarkMode={toggleDarkMode} handleLogout={handleLogout} />
      
      <h2>Comparação de Relatórios</h2>

      {/* Gráfico de Barras */}
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>

    {/* Tabela Comparativa de Critérios */}
    <div className="tabela-comparativa">
        <h3>Tabela Comparativa de Critérios</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Framework</th>
              <th>Critério</th>
              {selectedReports.map((report) => (
                <th key={report.username}>{report.username}</th> 
              ))}
            </tr>
          </thead>
          <tbody>
            {frameworksComuns.map((framework, frameworkIndex) => (
              <React.Fragment key={frameworkIndex}>
                {framework.criteria.map((criteria, criteriaIndex) => (
                  <tr key={criteriaIndex}>
                    {/* Primeira linha do framework, mesclando a célula com rowSpan */}
                    {criteriaIndex === 0 && (
                      <td rowSpan={framework.criteria.length}>{framework.frameworkName}</td>
                    )}
                    <td>{criteria.title}</td> {/* Exibe o nome do critério */}
                    
                    {selectedReports.map((report, reportIndex) => {
                      const userFramework = report.frameworksData.find(
                        (userFw) =>
                          userFw.frameworkName.trim().toLowerCase() === framework.frameworkName.trim().toLowerCase()
                      );

                      if (userFramework) {
                        const userCriteria = userFramework.criteria.find(
                          (c) => c.title === criteria.title
                        );
                        
                        return (
                          <td key={reportIndex}>
                            Nota: {userCriteria ? calculateCriteriaScore(userCriteria) : 'Sem Dados'}<br />
                            Peso: {userCriteria ? userCriteria.weight : 'Sem Dados'}
                          </td>
                        );
                      } else {
                        return <td key={reportIndex}>Sem Dados</td>;
                      }
                    })}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tabela-comparativa">
    <h3>Tabela Comparativa de Subcritérios</h3>
    <table>
      <thead>
        <tr>
          <th>Framework</th>
          <th>Critério</th>
          <th>Subcritério</th>
          {selectedReports.map((report) => (
            <th key={report.username}>{report.username}</th> // Colunas para cada avaliador
          ))}
        </tr>
      </thead>
      <tbody>
        {frameworksComuns.map((framework, frameworkIndex) => (
          <React.Fragment key={frameworkIndex}>
            {/* Itera sobre os critérios de cada framework */}
            {framework.criteria.map((criteria, criteriaIndex) => (
              <React.Fragment key={criteriaIndex}>
                {/* Primeira linha para o critério, que será mesclado em várias linhas */}
                {criteria.subcriteria.map((subcriteria, subIndex) => (
                  <tr key={subIndex}>
                    {/* Mesclando a célula de Framework e Critério */}
                    {subIndex === 0 && (
                      <td rowSpan={criteria.subcriteria.length}>{framework.frameworkName}</td>
                    )}
                    {subIndex === 0 && (
                      <td rowSpan={criteria.subcriteria.length}>{criteria.title}</td>
                    )}

                    <td>{subcriteria.title}</td> {/* Subcritério */}

                    {/* Exibindo a nota e o peso de cada avaliador para o subcritério */}
                    {selectedReports.map((report, reportIndex) => {
                      const userFramework = report.frameworksData.find(
                        (userFw) =>
                          userFw.frameworkName.trim().toLowerCase() === framework.frameworkName.trim().toLowerCase()
                      );

                      if (userFramework) {
                        const userCriteria = userFramework.criteria.find(
                          (c) => c.title === criteria.title
                        );
                        const userSubcriteria = userCriteria.subcriteria.find(
                          (sub) => sub.title === subcriteria.title
                        );

                        return (
                          <td key={reportIndex}>
                            Nota: {userSubcriteria ? userSubcriteria.score : 'Sem Dados'}<br />
                            Peso: {userSubcriteria ? userSubcriteria.weight : 'Sem Dados'}
                          </td>
                        );
                      } else {
                        return <td key={reportIndex}>Sem Dados</td>;
                      }
                    })}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>


      <div className="tabela-media-frameworks">
        <h3>Média das Notas dos Frameworks</h3>
        <table>
          <thead>
            <tr>
              <th>Framework</th>
              {selectedReports.map((report) => (
                <th key={report.username}>{report.username}</th> // Coluna para cada avaliador
              ))}
              <th>Média das Notas</th> {/* Coluna para a média das notas */}
            </tr>
          </thead>
          <tbody>
            {frameworksComuns.map((framework, index) => (
              <tr key={index}>
                <td>{framework.frameworkName}</td>
                {selectedReports.map((report) => {
                  const userFramework = report.frameworksData.find(
                    (userFw) =>
                      userFw.frameworkName.trim().toLowerCase() ===
                      framework.frameworkName.trim().toLowerCase()
                  );
                  return (
                    <td key={report.username}>
                      {userFramework ? calculateFinalScore(userFramework) : 'Sem Dados'} {/* Nota de cada avaliador */}
                    </td>
                  );
                })}

                {/* Cálculo da média das notas para o framework atual */}
                <td>
                  {(
                    selectedReports.reduce((total, report) => {
                      const userFramework = report.frameworksData.find(
                        (userFw) =>
                          userFw.frameworkName.trim().toLowerCase() ===
                          framework.frameworkName.trim().toLowerCase()
                      );
                      return userFramework
                        ? total + parseFloat(calculateFinalScore(userFramework))
                        : total;
                    }, 0) / selectedReports.filter((report) => {
                      const userFramework = report.frameworksData.find(
                        (userFw) =>
                          userFw.frameworkName.trim().toLowerCase() ===
                          framework.frameworkName.trim().toLowerCase()
                      );
                      return userFramework !== undefined;
                    }).length
                  ).toFixed(2)} {/* Cálculo da média ignorando "Sem Dados" */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Comparacao;
