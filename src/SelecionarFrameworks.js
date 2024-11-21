import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelecionarFrameworks.css';

const SelecionarFrameworks = ({ setFrameworks }) => {
  const [numFrameworks, setNumFrameworks] = useState(1);
  const [frameworkNames, setFrameworkNames] = useState(['']);
  const navigate = useNavigate();

  // Função para alterar o número de frameworks
  const handleNumFrameworksChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumFrameworks(num);
    setFrameworkNames(Array(num).fill(''));
  };

  // Função para alterar o nome de cada framework
  const handleFrameworkNameChange = (index, value) => {
    const updatedFrameworkNames = [...frameworkNames];
    updatedFrameworkNames[index] = value;
    setFrameworkNames(updatedFrameworkNames);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar se todos os frameworks têm nomes preenchidos
    if (frameworkNames.some(name => name.trim() === '')) {
      alert('Please fill in all the framework names.');
      return;
    }

    // Armazenar os frameworks no estado do componente pai
    setFrameworks(frameworkNames);

    // Navegar para a página de avaliação com os frameworks
    navigate('/avaliacao', { state: { frameworks: frameworkNames } });
  };

  return (
    <div className="selecionar-frameworks-container">
      <h2>How many frameworks would you like to evaluate?</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Number of frameworks:
          <input
            type="number"
            value={numFrameworks}
            onChange={handleNumFrameworksChange}
            min="1"
          />
        </label>
        {frameworkNames.map((name, index) => (
          <label key={index}>
            Framework Name {index + 1}:
            <input
              type="text"
              value={name}
              onChange={(e) => handleFrameworkNameChange(index, e.target.value)}
              placeholder={`Framework Name ${index + 1}`}
              required
            />
          </label>
        ))}
        <button type="submit">Start Evaluation</button>
      </form>
    </div>
  );
};

export default SelecionarFrameworks;
