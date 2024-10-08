// Função para armazenar avaliações por setor ou usuário
export const armazenarAvaliacao = (avaliacoesPorSetor, setor, avaliacao) => {
    // Se o setor já existir, adiciona a nova avaliação
    if (avaliacoesPorSetor[setor]) {
      return {
        ...avaliacoesPorSetor,
        [setor]: [...avaliacoesPorSetor[setor], avaliacao],
      };
    } else {
      // Caso contrário, cria um novo setor
      return {
        ...avaliacoesPorSetor,
        [setor]: [avaliacao],
      };
    }
  };
  
  // Função para calcular médias de cada critério
  export const calcularMediaSetor = (avaliacoesPorSetor) => {
    const mediasPorSetor = {};
  
    Object.keys(avaliacoesPorSetor).forEach((setor) => {
      const avaliacoes = avaliacoesPorSetor[setor];
      const medias = {};
  
      avaliacoes.forEach((avaliacao) => {
        avaliacao.forEach((criterio) => {
          if (!medias[criterio.title]) {
            medias[criterio.title] = [];
          }
          medias[criterio.title].push(
            criterio.subcriteria.reduce((acc, sub) => acc + parseInt(sub.score), 0) /
              criterio.subcriteria.length
          );
        });
      });
  
      mediasPorSetor[setor] = Object.keys(medias).map((criterio) => ({
        criterio,
        media: medias[criterio].reduce((acc, nota) => acc + nota, 0) / medias[criterio].length,
      }));
    });
  
    return mediasPorSetor;
  };
  