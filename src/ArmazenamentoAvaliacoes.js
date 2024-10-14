// Função para armazenar avaliações por setor ou usuário e salvar no localStorage
export const armazenarAvaliacao = (avaliacoesPorSetor, setor, avaliacao) => {
  const updatedAvaliacoes = { ...avaliacoesPorSetor };

  // Se o setor já existir, adiciona a nova avaliação
  if (updatedAvaliacoes[setor]) {
    updatedAvaliacoes[setor] = [...updatedAvaliacoes[setor], avaliacao];
  } else {
    // Caso contrário, cria um novo setor
    updatedAvaliacoes[setor] = [avaliacao];
  }

  // Armazenar no localStorage
  localStorage.setItem('avaliacoesPorSetor', JSON.stringify(updatedAvaliacoes));

  return updatedAvaliacoes;
};

// Função para recuperar avaliações armazenadas no localStorage
export const recuperarAvaliacoes = () => {
  const avaliacoesSalvas = localStorage.getItem('avaliacoesPorSetor');
  return avaliacoesSalvas ? JSON.parse(avaliacoesSalvas) : {};
};

// Função para calcular médias de cada critério por setor
export const calcularMediaSetor = () => {
  const avaliacoesPorSetor = recuperarAvaliacoes(); // Recupera do localStorage
  const mediasPorSetor = {};

  Object.keys(avaliacoesPorSetor).forEach((setor) => {
    const avaliacoes = avaliacoesPorSetor[setor];
    const medias = {};

    avaliacoes.forEach((avaliacao) => {
      avaliacao.forEach((criterio) => {
        if (!medias[criterio.title]) {
          medias[criterio.title] = [];
        }
        // Calcula a média dos subcritérios para cada critério
        medias[criterio.title].push(
          criterio.subcriteria.reduce((acc, sub) => acc + parseInt(sub.score, 10), 0) /
          criterio.subcriteria.length
        );
      });
    });

    // Calcula a média final para cada critério
    mediasPorSetor[setor] = Object.keys(medias).map((criterio) => ({
      criterio,
      media: medias[criterio].reduce((acc, nota) => acc + nota, 0) / medias[criterio].length,
    }));
  });

  return mediasPorSetor;
};
