/**
 * 
 * Converte um valor em segundos para uma string legível, formatando
 * em minutos e segundos, cuidando da gramática:
 * 
 * Exemplos:
 * - 90 segundos → "1 minutos e 30 segundos"
 * - 120 segundos → "2 minutos"
 * - 45 segundos → "45 segundos"
 *
 */

function formatarTempoSegundos(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = segundos % 60;
  if (min > 0 && seg > 0) return `${min} minutos e ${seg} segundos`;
  if (min > 0) return `${min} minutos`;
  return `${seg} segundos`;
}

module.exports = { formatarTempoSegundos };
