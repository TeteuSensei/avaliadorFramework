import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Avaliacao = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Estado para armazenar a lista de frameworks a serem avaliados
  const { frameworks } = location.state || { frameworks: [] };

  // Inicializa o estado dos frameworks fora de qualquer condicional
  const [frameworksData, setFrameworks] = useState(
    frameworks.map((framework) => ({
      frameworkName: framework,
      criteria: [
        {
          id: 1,
          title: 'Custo',
          weight: 'Prioridade Média', // Peso padrão do critério
          subcriteria: [
            { title: 'Implementação', score: '', weight: 'Prioridade Média' },
            { title: 'Licença', score: '', weight: 'Prioridade Média' },
            { title: 'Treinamento', score: '', weight: 'Prioridade Média' },
            { title: 'Manutenção', score: '', weight: 'Prioridade Média' },
            { title: 'Consultoria', score: '', weight: 'Prioridade Média' },
          ],
        },
        {
          id: 2,
          title: 'Segurança da Informação',
          weight: 'Prioridade Média', // Peso padrão do critério
          subcriteria: [
            { title: 'Proteção de Dados', score: '', weight: 'Prioridade Média' },
            { title: 'Detecção de Intrusões', score: '', weight: 'Prioridade Média' },
            { title: 'Resposta a Incidentes', score: '', weight: 'Prioridade Média' },
            { title: 'Recuperação', score: '', weight: 'Prioridade Média' },
          ],
        },
      ],
    }))
  );

  // Função para atualizar a pontuação de cada subcritério
  const handleScoreChange = (frameworkIndex, criteriaId, subIndex, score) => {
    setFrameworks((prevFrameworks) =>
      prevFrameworks.map((framework, idx) =>
        idx === frameworkIndex
          ? {
              ...framework,
              criteria: framework.criteria.map((criteria) =>
                criteria.id === criteriaId
                  ? {
                      ...criteria,
                      subcriteria: criteria.subcriteria.map((sub, i) =>
                        i === subIndex ? { ...sub, score } : sub
                      ),
                    }
                  : criteria
              ),
            }
          : framework
      )
    );
  };

  // Função para atualizar o peso de cada subcritério
  const handleWeightChange = (frameworkIndex, criteriaId, subIndex, weight) => {
    setFrameworks((prevFrameworks) =>
      prevFrameworks.map((framework, idx) =>
        idx === frameworkIndex
          ? {
              ...framework,
              criteria: framework.criteria.map((criteria) =>
                criteria.id === criteriaId
                  ? {
                      ...criteria,
                      subcriteria: criteria.subcriteria.map((sub, i) =>
                        i === subIndex ? { ...sub, weight } : sub
                      ),
                    }
                  : criteria
              ),
            }
          : framework
      )
    );
  };

  // Função para atualizar o peso de cada critério
  const handleCriteriaWeightChange = (frameworkIndex, criteriaId, weight) => {
    setFrameworks((prevFrameworks) =>
      prevFrameworks.map((framework, idx) =>
        idx === frameworkIndex
          ? {
              ...framework,
              criteria: framework.criteria.map((criteria) =>
                criteria.id === criteriaId ? { ...criteria, weight } : criteria
              ),
            }
          : framework
      )
    );
  };

  // Função para validar a avaliação antes de submeter
  const validateForm = () => {
    for (const framework of frameworksData) {
      for (const criteria of framework.criteria) {
        if (!criteria.weight) {
          alert(`Por favor, selecione o peso para o critério: ${criteria.title}`);
          return false;
        }
        for (const sub of criteria.subcriteria) {
          if (!sub.score || !sub.weight) {
            alert(`Por favor, preencha todos os campos para ${framework.frameworkName}.`);
            return false;
          }
        }
      }
    }
    return true;
  };

  // Função para manipular a submissão do formulário de avaliação
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const storedAvaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
      storedAvaliacoes.push({ username: user.username, frameworks: frameworksData });
      localStorage.setItem('avaliacoes', JSON.stringify(storedAvaliacoes));

      // Redireciona para a página de Relatório
      navigate('/relatorio', { state: { frameworksData } });
    }
  };

  // Verifica se a lista de frameworks está vazia após a inicialização do estado
  if (!frameworks.length) {
    return <div>Nenhum framework foi selecionado para avaliação.</div>;
  }

  return (
    <div className="avaliacao-container">
      <h2>Avaliação de Frameworks</h2>
      <form onSubmit={handleSubmit}>
        {frameworksData.map((framework, frameworkIndex) => (
          <div key={frameworkIndex} className="framework-container">
            <h3>Avaliação para {framework.frameworkName}</h3>

            {framework.criteria.map((criteria) => (
              <div key={criteria.id} className="criteria-container">
                <h4>{criteria.title}</h4>
                <div className="criteria-weight">
                  <label>
                    Peso do Critério:
                    <select
                      value={criteria.weight}
                      onChange={(e) =>
                        handleCriteriaWeightChange(frameworkIndex, criteria.id, e.target.value)
                      }
                    >
                      <option value="">Selecione...</option>
                      <option value="Baixa Prioridade">Baixa Prioridade</option>
                      <option value="Prioridade Média">Prioridade Média</option>
                      <option value="Alta Prioridade">Alta Prioridade</option>
                    </select>
                  </label>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Subcritérios</th>
                      <th>1 - Pouco Importante</th>
                      <th>2 - Moderadamente Importante</th>
                      <th>3 - Importante</th>
                      <th>4 - Muito Importante</th>
                      <th>5 - Extremamente Importante</th>
                      <th>Peso do Subcritério</th>
                    </tr>
                  </thead>
                  <tbody>
                    {criteria.subcriteria.map((sub, subIndex) => (
                      <tr key={subIndex}>
                        <td>{sub.title}</td>
                        {[1, 2, 3, 4, 5].map((value) => (
                          <td key={value}>
                            <input
                              type="radio"
                              name={`framework-${frameworkIndex}-criteria-${criteria.id}-sub-${subIndex}`}
                              value={value}
                              checked={sub.score === value.toString()}
                              onChange={(e) =>
                                handleScoreChange(frameworkIndex, criteria.id, subIndex, e.target.value)
                              }
                            />
                          </td>
                        ))}
                        <td>
                          <select
                            value={sub.weight}
                            onChange={(e) => handleWeightChange(frameworkIndex, criteria.id, subIndex, e.target.value)}
                          >
                            <option value="">Selecione...</option>
                            <option value="Baixa Prioridade">Baixa Prioridade</option>
                            <option value="Prioridade Média">Prioridade Média</option>
                            <option value="Alta Prioridade">Alta Prioridade</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Enviar Avaliações</button>
      </form>
    </div>
  );
};

export default Avaliacao;
