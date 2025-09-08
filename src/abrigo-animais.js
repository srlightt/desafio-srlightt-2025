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
