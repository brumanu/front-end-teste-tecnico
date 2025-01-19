
export function useFormValidator() {
  // Valida se um CPF é válido
  const validateCPF = (cpf) => {
    if (!cpf) return false;
    cpf = cpf.replace(/[^\d]+/g, "");

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  };

  // Valida os campos recebidos
  const validateFields = (fields) => {
    const errors = {};
    for (const [key, value] of Object.entries(fields)) {
      if (!value || value.toString().trim() === "") {
        errors[key] = "Este campo é obrigatório.";
      } else if (key === "cpf" && !validateCPF(value)) {
        errors[key] = "CPF inválido.";
      }
    }
    
    return errors;
  };

  // Verifica se não há erros
  const isValid = (errors) => Object.keys(errors).length === 0;

  return {
    validateFields,
    isValid,
  };
}
