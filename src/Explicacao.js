import React from 'react';
import Menu from './Menu';  // Para o menu de navegação
import './Explicacao.css';  // Para a estilização da página

const Explicacao = ({ toggleDarkMode, handleLogout }) => {
  return (
    <div className="explicacao-container">
      <Menu toggleDarkMode={toggleDarkMode} handleLogout={handleLogout} />
      
      <div className="explicacao-content">
        <h1>Como Funciona o Sistema</h1>
        
        <section className="explicacao-section">
          <h2>1. Seleção de Frameworks</h2>
          <p>
            Para começar, o usuário deve selecionar os frameworks que deseja avaliar. 
            No início, você será solicitado a digitar a quantidade de frameworks e seus respectivos nomes.
            Certifique-se de que os frameworks inseridos estejam corretos para uma avaliação precisa.
          </p>
        </section>

        <section className="explicacao-section">
          <h2>2. Avaliação de Critérios e Subcritérios</h2>
          <p>
            A aplicação já possui implementados os primeiros dois critérios, sendo eles: <strong>Custo</strong> e <strong>Segurança da Informação</strong>. No entanto, o sistema completo incluirá um total de 12 critérios, cada um com seus subcritérios específicos, que serão utilizados para avaliar frameworks de gestão de risco cibernético. Cada framework é avaliado com base nesses critérios, levando em consideração o impacto de cada um em seu desempenho geral. Os critérios selecionados para a avaliação são:
          </p>

          <ul>
            <li><strong>Custo:</strong> Avalia os custos associados à implementação e manutenção do framework. Subcritérios:
              <ul>
                <li>Implementação</li>
                <li>Licença</li>
                <li>Treinamento</li>
                <li>Manutenção</li>
                <li>Consultoria</li>
              </ul>
            </li>
            <li><strong>Segurança da Informação:</strong> Mede a eficácia do framework na proteção de informações críticas. Subcritérios:
              <ul>
                <li>Proteção de Dados</li>
                <li>Detecção de Intrusões</li>
                <li>Resposta a Incidentes</li>
                <li>Recuperação</li>
                <li>Prevenção</li>
              </ul>
            </li>
            <li><strong>Eficiência:</strong> Refere-se à capacidade do framework de otimizar processos e recursos de segurança. Subcritérios:
              <ul>
                <li>Otimização de Recursos</li>
                <li>Tempo de Resposta</li>
                <li>Automatização</li>
                <li>Escalabilidade</li>
                <li>Integração</li>
              </ul>
            </li>
            <li><strong>Desempenho:</strong> Avalia o desempenho do framework em termos de resposta a incidentes e mitigação de riscos. Subcritérios:
              <ul>
                <li>Efetividade das Medidas de Segurança</li>
                <li>Taxa de Detecção de Ameaças</li>
                <li>Mitigação de Riscos</li>
                <li>Impacto na Operação</li>
                <li>Tempo de Recuperação</li>
              </ul>
            </li>
            <li><strong>Complexidade:</strong> Analisa a facilidade de implementação e uso do framework. Subcritérios:
              <ul>
                <li>Facilidade de Implementação</li>
                <li>Curva de Aprendizado</li>
                <li>Requisitos Técnicos</li>
                <li>Compatibilidade com Sistemas Existentes</li>
                <li>Complexidade de Manutenção</li>
              </ul>
            </li>
            <li><strong>Flexibilidade/Adaptabilidade:</strong> Avalia a capacidade do framework de se adaptar a diferentes tipos de organizações e setores. Subcritérios:
              <ul>
                <li>Adaptação a Diferentes Setores</li>
                <li>Customização</li>
                <li>Escalabilidade</li>
                <li>Integração com Outras Ferramentas</li>
                <li>Ajustes de Configuração</li>
              </ul>
            </li>
            <li><strong>Conformidade:</strong> Verifica o alinhamento do framework com normas e regulamentações de segurança. Subcritérios:
              <ul>
                <li>Regulamentação</li>
                <li>Políticas Internas</li>
                <li>Auditoria</li>
                <li>Relatórios</li>
                <li>Certificação</li>
              </ul>
            </li>
            <li><strong>Suporte e Documentação:</strong> Examina a qualidade e disponibilidade do suporte técnico e da documentação do framework. Subcritérios:
              <ul>
                <li>Qualidade da Documentação</li>
                <li>Disponibilidade de Suporte Técnico</li>
                <li>Comunidade de Usuários</li>
                <li>Recursos de Aprendizado</li>
                <li>Atualizações de Documentação</li>
              </ul>
            </li>
            <li><strong>Escalabilidade:</strong> Avalia a capacidade do framework de crescer junto com a organização. Subcritérios:
              <ul>
                <li>Capacidade de Crescimento</li>
                <li>Performance em Larga Escala</li>
                <li>Flexibilidade de Expansão</li>
                <li>Gerenciamento de Crescimento</li>
                <li>Suporte a Multinacionais</li>
              </ul>
            </li>
            <li><strong>Comunidade e Adoção:</strong> Considera o tamanho e a atividade da comunidade de usuários e desenvolvedores. Subcritérios:
              <ul>
                <li>Popularidade</li>
                <li>Feedback da Comunidade</li>
                <li>Exemplos de Uso Real</li>
                <li>Colaborações e Parcerias</li>
                <li>Desenvolvimento Contínuo</li>
              </ul>
            </li>
            <li><strong>Integração com Outras Ferramentas:</strong> Avalia a facilidade de integração do framework com outras ferramentas e sistemas. Subcritérios:
              <ul>
                <li>Compatibilidade</li>
                <li>APIs e Conectores</li>
                <li>Interoperabilidade</li>
                <li>Facilidade de Integração</li>
                <li>Suporte a Padrões Abertos</li>
              </ul>
            </li>
            <li><strong>Inovação e Atualização:</strong> Analisa a frequência de atualizações e a incorporação de novas tecnologias e práticas. Subcritérios:
              <ul>
                <li>Frequência de Atualizações</li>
                <li>Incorporação de Novas Tecnologias</li>
                <li>Pesquisa e Desenvolvimento</li>
                <li>Feedback do Mercado</li>
                <li>Melhorias Contínuas</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="explicacao-section">
          <h2>3. Como Funciona o Cálculo de Avaliação</h2>
          <p>
            O cálculo da nota final de um framework é feito com base nas avaliações de critérios e subcritérios, levando em consideração os pesos atribuídos a cada um. A metodologia de cálculo é projetada para refletir a importância relativa de cada critério e subcritério no contexto de gestão de risco cibernético.
          </p>

          <h3>Cálculo da Nota de Subcritérios</h3>
          <p>
            Cada subcritério dentro de um critério recebe uma nota e um peso que indica sua prioridade. A escala de pesos funciona da seguinte maneira:
          </p>
          <ul>
            <li><strong>Alta Prioridade:</strong> Peso = 3</li>
            <li><strong>Prioridade Média:</strong> Peso = 2</li>
            <li><strong>Baixa Prioridade:</strong> Peso = 1</li>
          </ul>
          <p>
            A pontuação ponderada de cada subcritério é calculada multiplicando a nota atribuída ao subcritério pelo seu peso. Por exemplo, se um subcritério "Proteção de Dados" tem uma nota de 5 e um peso de "Alta Prioridade", a pontuação ponderada será:
          </p>
          <blockquote>Pontuação Ponderada = Nota (5) x Peso (3) = 15</blockquote>

          <h3>Cálculo da Nota de Critérios</h3>
          <p>
            A nota de cada critério é obtida pela média ponderada das notas de seus subcritérios. Se um critério tiver vários subcritérios, suas notas são somadas com base no peso, e a média é calculada. Por exemplo, se o critério "Custo" incluir três subcritérios com as seguintes pontuações ponderadas:
          </p>
          <ul>
            <li>Licença: Nota = 4, Peso = 2 (Prioridade Média)</li>
            <li>Manutenção: Nota = 3, Peso = 3 (Alta Prioridade)</li>
            <li>Consultoria: Nota = 2, Peso = 1 (Baixa Prioridade)</li>
          </ul>
          <p>
            O cálculo da nota final do critério "Custo" seria:
          </p>
          <blockquote>Nota Final de Critério = (4 x 2 + 3 x 3 + 2 x 1) ÷ (2 + 3 + 1) = 3,33</blockquote>

          <h3>Cálculo da Nota Final do Framework</h3>
          <p>
            A nota final de um framework é obtida pela média ponderada das notas dos critérios. Da mesma forma que com os subcritérios, cada critério tem um peso que reflete sua importância geral na avaliação do framework. Esses pesos são ajustáveis, mas por padrão, todos os critérios têm o mesmo peso.
          </p>
          <blockquote>Nota Final = (Nota Critério 1 x Peso 1 + Nota Critério 2 x Peso 2 + ...) ÷ (Soma dos Pesos)</blockquote>

          <h3>Interpretação dos Resultados</h3>
          <p>
            As notas finais são usadas para comparar os frameworks em termos de adequação para uma determinada organização ou cenário de gestão de risco cibernético. Quanto maior a nota, melhor o framework atende aos critérios e subcritérios avaliados. Essa abordagem ponderada garante que os frameworks sejam avaliados de forma justa, levando em consideração as prioridades definidas pelo avaliador.
          </p>
        </section>

        <section className="explicacao-section">
          <h2>4. Comparação de Resultados</h2>
          <p>
            Após a avaliação, você pode comparar os resultados entre diferentes frameworks ou entre avaliações de diferentes usuários. A página de comparação permite uma visualização clara dos dados por meio de gráficos e tabelas comparativas.
          </p>
        </section>

        <section className="explicacao-section">
          <h2>5. Geração de Relatórios</h2>
          <p>
            Os resultados de suas avaliações podem ser exportados como relatórios detalhados, facilitando a análise posterior. Esses relatórios incluem gráficos de desempenho, notas atribuídas e a prioridade de cada critério.
          </p>
        </section>

        <section className="explicacao-section">
          <h2>Perguntas Frequentes (FAQ)</h2>
          <p>Se você tiver alguma dúvida, consulte a seção de perguntas frequentes abaixo:</p>
          <ul>
            <li><strong>Como redefinir minha senha?</strong> Vá até o perfil e clique em "Alterar Senha".</li>
            <li><strong>Como posso adicionar novos frameworks?</strong> Acesse a seção de seleção de frameworks e insira o nome do novo framework.</li>
            <li><strong>Onde posso ver os relatórios gerados?</strong> Você pode acessar a seção de "Relatórios" no menu.</li>
          </ul>
        </section>

        <footer className="explicacao-footer">
          <p>Para mais informações, entre em contato com o suporte técnico.</p>
        </footer>
      </div>
    </div>
  );
};

export default Explicacao;
