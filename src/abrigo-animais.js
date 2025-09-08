class AbrigoAnimais {
  animais = {
    Rex:  { tipo: "cão",    brinquedos: ["RATO", "BOLA"] },
    Mimi: { tipo: "gato",   brinquedos: ["BOLA", "LASER"] },
    Fofo: { tipo: "gato",   brinquedos: ["BOLA", "RATO", "LASER"] },
    Zero: { tipo: "gato",   brinquedos: ["RATO", "BOLA"] },
    Bola: { tipo: "cão",    brinquedos: ["CAIXA", "NOVELO"] },
    Bebe: { tipo: "cão",    brinquedos: ["LASER", "RATO", "BOLA"] },
    Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] }  
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const listaBrinquedosPessoa1 = this.converteStringEmLista(brinquedosPessoa1);
    const listaBrinquedosPessoa2 = this.converteStringEmLista(brinquedosPessoa2);
    const listaAnimais = this.converteStringEmLista(ordemAnimais);
    
    try {
      this.validaEntradas(listaBrinquedosPessoa1, listaBrinquedosPessoa2, listaAnimais);
    } catch (err) {
      return { erro: err.message };
    }

    let adocoesPessoa1 = 0;
    let adocoesPessoa2 = 0;
    let resultadosFinais = [];

    for (const animalNome of listaAnimais) {
      const animalInfo = this.animais[animalNome];
      
      const pessoa1Apta = this.podeAdotarAnimal(listaBrinquedosPessoa1, animalInfo, adocoesPessoa1);
      const pessoa2Apta = this.podeAdotarAnimal(listaBrinquedosPessoa2, animalInfo, adocoesPessoa2);
      
      if (pessoa1Apta && pessoa2Apta) {
        resultadosFinais.push(`${animalNome} - abrigo`);
      }
      else if (pessoa1Apta) {
        resultadosFinais.push(`${animalNome} - pessoa 1`);
        adocoesPessoa1++;
      }
      else if (pessoa2Apta) {
        resultadosFinais.push(`${animalNome} - pessoa 2`);
        adocoesPessoa2++;
      }
      else {
        resultadosFinais.push(`${animalNome} - abrigo`);
      }
    }
    
    resultadosFinais.sort();
    return { lista: resultadosFinais };
  }

  podeAdotarAnimal(brinquedosPessoa, animalInfo, adocoesAtuais) {
    // Limite de 3 adoções
    if (adocoesAtuais >= 3) {
      return false;
    }

    // Exceção do Loco (jabuti)
    if (animalInfo.tipo === "jabuti") {
      // Precisa ter adotado outro animal antes E ter todos os brinquedos, sem importar a ordem
      const temTodosBrinquedos = animalInfo.brinquedos.every(brinquedo => brinquedosPessoa.includes(brinquedo));
      return adocoesAtuais >= 1 && temTodosBrinquedos;
    }

    // Regra geral para TODOS os outros animais (cães E gatos)
    return this.verificaSequenciaCorreta(brinquedosPessoa, animalInfo.brinquedos);
  }

  converteStringEmLista(texto) {
    if (!texto) return [];
    return texto.split(",").map(texto => texto.trim());
  }
  
  validaEntradas(brinquedosP1, brinquedosP2, animais) {
    const brinquedosValidos = new Set(Object.values(this.animais).flatMap(animal => animal.brinquedos));

    const verificarBrinquedos = (listaBrinquedos) => {
      // Valida se existe brinquedos inexistentes
      for (const brinquedoP of listaBrinquedos) {
        if (!brinquedosValidos.has(brinquedoP)) {
          throw new Error("Brinquedo inválido");
        }
      }
      // Valida se a lista possui brinquedos duplicados
      if (new Set(listaBrinquedos).size !== listaBrinquedos.length){
        throw new Error("Brinquedo inválido");
      }
    }
    
    verificarBrinquedos(brinquedosP1);
    verificarBrinquedos(brinquedosP2);
    
    // Valida se existe animais inexistentes
    for (const animal of animais) {
      if (!(this.animais[animal])) {
        throw new Error("Animal inválido");
      }
    }
    // Valida se existe animais duplicados
    if (new Set(animais).size !== animais.length) {
      throw new Error("Animal inválido");
    }

    return true;
  }
  
  verificaSequenciaCorreta(brinquedosPessoa, brinquedosAnimal) {
    // ponteiro de controle
    let ponteiroBrinquedoAnimal = 0;
    
    for (const brinquedo of brinquedosPessoa) {
      // Verifica se o brinquedo da pessoa é o mesmo que o animal pede, em ordem
      if (brinquedo === brinquedosAnimal[ponteiroBrinquedoAnimal]) {
        // avança para o proximo brinquedo do animal
        ponteiroBrinquedoAnimal++;
      }
    }
    // true caso o ponteiro for igual ao numero de brinquedos do animal, entao encontramos todos em ordem
    return ponteiroBrinquedoAnimal === brinquedosAnimal.length;
  }
}
export { AbrigoAnimais as AbrigoAnimais };
