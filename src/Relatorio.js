import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Menu from './Menu';
import './Relatorio.css';

// Registrar os componentes necessários para o gráfico de barras
ChartJS.register(CategoryScale, LinearScale, BarElement);

const Relatorio = ({ toggleDarkMode, handleLogout, user }) => {
  const location = useLocation();

  // Obter os dados dos frameworks passados via navegação
  const frameworksData = location.state?.frameworksData || [];

  if (frameworksData.length === 0) {
    return <div>Nenhum dado disponível para exibir no relatório.</div>;
  }

  // Função para calcular a nota média ponderada de um critério
  const calculateCriteriaScore = (criteria) => {
    let totalScore = 0;
    let totalWeight = 0;

    criteria.subcriteria.forEach(sub => {
      const weightValue = sub.weight === 'Alta Prioridade' ? 3 : sub.weight === 'Prioridade Média' ? 2 : 1;
      totalScore += parseInt(sub.score, 10) * weightValue;
      totalWeight += weightValue;
    });

    return (totalScore / totalWeight).toFixed(2); // Média ponderada
  };

  // Função para calcular a nota final de cada framework
  const calculateFinalScore = (framework) => {
    let totalScore = 0;
    let totalWeight = 0;

    framework.criteria.forEach(criteria => {
      const weightValue = criteria.weight === 'Alta Prioridade' ? 3 : criteria.weight === 'Prioridade Média' ? 2 : 1;
      const criteriaScore = calculateCriteriaScore(criteria);
      totalScore += criteriaScore * weightValue;
      totalWeight += weightValue;
    });

    return (totalScore / totalWeight).toFixed(2); // Nota final ponderada
  };

  // Preparar os dados para o gráfico de barras com as notas finais
  const data = {
    labels: frameworksData.map(framework => framework.frameworkName), // Nomes dos frameworks no eixo X
    datasets: [
      {
        label: 'Nota Final',
        data: frameworksData.map(framework => calculateFinalScore(framework)), // Usar a nota final de cada framework
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Opções do gráfico de barras
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

  // Função para exportar o relatório em XLSX
  const exportXLSX = () => {
    const worksheetData = [
      ['Framework', 'Critério', 'Subcritério', 'Nota', 'Peso'],
    ];

    frameworksData.forEach(framework => {
      framework.criteria.forEach(criteria => {
        criteria.subcriteria.forEach(sub => {
          worksheetData.push([framework.frameworkName, criteria.title, sub.title, sub.score, sub.weight]);
        });
      });
    });

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório');
    XLSX.writeFile(workbook, 'relatorio.xlsx');
  };

  // Função para exportar o relatório em PDF
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text('Relatório de Avaliação', 14, 16);

    const tableData = frameworksData.flatMap(framework =>
      framework.criteria.flatMap(criteria =>
        criteria.subcriteria.map(sub => [
          framework.frameworkName,
          criteria.title,
          sub.title,
          sub.score,
          sub.weight,
        ])
      )
    );

    autoTable(doc, {
      head: [['Framework', 'Critério', 'Subcritério', 'Nota', 'Peso']],
      body: tableData,
    });

    const chartCanvas = document.getElementById('barChart');
    if (chartCanvas) {
      const chartImage = chartCanvas.toDataURL('image/png');
      doc.addImage(chartImage, 'PNG', 10, 80, 180, 100);
    }

    doc.save('relatorio.pdf');
  };

  return (
    <div className="relatorio-container">
      <Menu toggleDarkMode={toggleDarkMode} handleLogout={handleLogout} user={user} />

      <div className="content">
        <h2>Relatório de Avaliação</h2>

        {/* Gráfico de Barras */}
        <div className="chart-container">
          <Bar data={data} options={options} id="barChart" />
        </div>

        {/* Tabela com os resultados dos Subcritérios */}
        <div className="tabela-relatorio">
          <h3>Notas dos Subcritérios</h3>
          <table>
            <thead>
              <tr>
                <th>Framework</th>
                <th>Critério</th>
                <th>Subcritério</th>
                <th>Nota</th>
                <th>Peso</th>
              </tr>
            </thead>
            <tbody>
              {frameworksData.map((framework) =>
                framework.criteria.map((criteria) =>
                  criteria.subcriteria.map((sub, index) => (
                    <tr key={index}>
                      <td>{framework.frameworkName}</td>
                      <td>{criteria.title}</td>
                      <td>{sub.title}</td>
                      <td>{sub.score}</td>
                      <td>{sub.weight}</td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Tabela das Notas por Critério */}
        <div className="tabela-criterios">
          <h3>Notas por Critério</h3>
          <table>
            <thead>
              <tr>
                <th>Framework</th>
                <th>Critério</th>
                <th>Nota Média</th>
                <th>Peso</th> {/* Nova coluna para o peso */}
              </tr>
            </thead>
            <tbody>
              {frameworksData.map((framework) =>
                framework.criteria.map((criteria, index) => (
                  <tr key={index}>
                    <td>{framework.frameworkName}</td>
                    <td>{criteria.title}</td>
                    <td>{calculateCriteriaScore(criteria)}</td> {/* Nota média do critério */}
                    <td>{criteria.weight}</td> {/* Exibindo o peso do critério */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Tabela das Notas Finais */}
        <div className="tabela-final">
          <h3>Notas Finais dos Frameworks</h3>
          <table>
            <thead>
              <tr>
                <th>Framework</th>
                <th>Nota Final</th>
              </tr>
            </thead>
            <tbody>
              {frameworksData.map((framework, index) => (
                <tr key={index}>
                  <td>{framework.frameworkName}</td>
                  <td className="nota-final">{calculateFinalScore(framework)}</td> {/* Nota Final em destaque */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botões de exportação */}
        <div className="export-buttons">
          <button onClick={exportXLSX}>Exportar para XLSX</button>
          <button onClick={exportPDF}>Exportar para PDF</button>
        </div>
      </div>
    </div>
  );
};

export default Relatorio;
