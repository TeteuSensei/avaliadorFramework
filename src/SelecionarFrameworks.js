import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelecionarFrameworks.css';

const SelecionarFrameworks = ({ setFrameworks }) => {
  const [numFrameworks, setNumFrameworks] = useState(1);
  const [frameworkNames, setFrameworkNames] = useState(['']);
  const navigate = useNavigate();

  const handleNumFrameworksChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumFrameworks(num);
    setFrameworkNames(Array(num).fill(''));
  };

  const handleFrameworkNameChange = (index, value) => {
    const updatedFrameworkNames = [...frameworkNames];
    updatedFrameworkNames[index] = value;
    setFrameworkNames(updatedFrameworkNames);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar se todos os frameworks têm nomes preenchidos
    if (frameworkNames.some(name => name.trim() === '')) {
      alert('Por favor, preencha todos os nomes de frameworks.');
      return;
    }

    // Armazenar os frameworks no estado do componente pai
    setFrameworks(frameworkNames);

    // Navegar para a página de avaliação com os frameworks
    navigate('/avaliacao', { state: { frameworks: frameworkNames } });
  };

  return (
    <div className="selecionar-frameworks-container">
      <h2>Quantos frameworks deseja avaliar?</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Número de frameworks:
          <input
            type="number"
            value={numFrameworks}
            onChange={handleNumFrameworksChange}
            min="1"
          />
        </label>
        {frameworkNames.map((name, index) => (
          <label key={index}>
            Nome do Framework {index + 1}:
            <input
              type="text"
              value={name}
              onChange={(e) => handleFrameworkNameChange(index, e.target.value)}
              placeholder={`Nome do Framework ${index + 1}`}
              required
            />
          </label>
        ))}
        <button type="submit">Iniciar Avaliação</button>
      </form>
    </div>
  );
};

export default SelecionarFrameworks;
