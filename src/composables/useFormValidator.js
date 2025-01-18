export function useFormValidator() {
    const validateFields = (fields) => {
      const errors = {};
      for (const [key, value] of Object.entries(fields)) {
        if (!value || value.toString().trim() === "") {
          errors[key] = "Este campo é obrigatório.";
        }
      }
      return errors;
    };
  
    const isValid = (errors) => Object.keys(errors).length === 0;
  
    return {
      validateFields,
      isValid,
    };
  }
  