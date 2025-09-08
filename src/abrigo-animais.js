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
export { AbrigoAnimais as AbrigoAnimais };
