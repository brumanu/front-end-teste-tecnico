export function formatDate(timestamp) {
    const date = new Date(timestamp); // Converte o timestamp em um objeto Date
    const day = String(date.getDate()).padStart(2, '0'); // Garante 2 dígitos no dia
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Garante 2 dígitos no mês
    const year = date.getFullYear(); // Obtém o ano
  
    return `${day}/${month}/${year}`; // Retorna a data no formato DD/MM/YYYY
  }