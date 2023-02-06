//normaliza strings, en esta caso particular, quita acentos y dieresis
const normalize = (term) =>
  term.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

module.exports = normalize;
