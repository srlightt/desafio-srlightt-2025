import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve rejeitar lista de brinquedos com itens inválidos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,PENA', 'BOLA,LASER', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar lista de brinquedos com itens duplicados', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA,RATO', 'BOLA,LASER', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar lista de animais com nomes duplicados', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'BOLA,LASER', 'Rex,Mimi,Rex');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve impedir a quarta adoção para a mesma pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER,CAIXA,NOVELO',
      '',
      'Rex,Zero,Mimi,Bola'
    );
    // Pessoa 1 adota Rex, Zero e Mimi, atingindo o limite de 3.
    // Ela seria apta para Bola, mas é impedida pelo limite.
    expect(resultado.lista[0]).toBe('Bola - abrigo');
    expect(resultado.lista[1]).toBe('Mimi - pessoa 1');
    expect(resultado.lista[2]).toBe('Rex - pessoa 1');
    expect(resultado.lista[3]).toBe('Zero - pessoa 1');
    expect(resultado.lista.length).toBe(4);
  });

  test('Deve mandar Loco para o abrigo se a pessoa não tiver companhia prévia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,RATO', '', 'Loco,Rex');
    // Pessoa 1 seria apta para Loco, mas como ele é o primeiro da lista,
    // a pessoa ainda não tem outros animais, então a regra de "companhia" falha.
    expect(resultado.lista[0]).toBe('Loco - abrigo');
    expect(resultado.lista[1]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(2);
  });

  test('Deve permitir a adoção de Loco se a pessoa já tiver um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA,SKATE', '', 'Rex,Loco');
    // Pessoa 1 primeiro adota Rex. Ao avaliar Loco, ela já tem uma companhia (Rex),
    // então a adoção de Loco é permitida.
    expect(resultado.lista[0]).toBe('Loco - pessoa 1');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2);
  });
});