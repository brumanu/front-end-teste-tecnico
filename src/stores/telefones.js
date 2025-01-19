import { defineStore } from "pinia";
import { useToast } from 'vue-toastification';
const toast = useToast();

export const useTelefonesStore = defineStore("telefones", {
  state: () => ({
    selectedTelefone: null, // Telefone selecionada
  }),
  actions: {
    setTelefones(data) {
      this.telefones = data;
    },
    setSelectedTelefone(telefone) {
      this.selectedTelefone = telefone;
    },
    clearSelectedTelefone() {
      this.selectedTelefone = null;
    },
    addTelefone(novoTelefone, paciente) {

      const novoId = String(paciente.telefone.length + 1);

      let novoTelefonePayload = { telefone_id: novoId, telefone: novoTelefone.telefone}

      paciente.telefone.push(novoTelefonePayload);
        toast.success('Telefone cadastrado com sucesso');
    },
    updateTelefone(telefoneAtualizada, paciente) {
      const index = paciente.telefone.findIndex(
        (obj) => obj.telefone_id === telefoneAtualizada.telefone_id
      );
      if (index !== -1) {
        paciente.telefone[index] = { ...telefoneAtualizada };
          toast.success('Telefone atualizado com sucesso');
      }
    },
    deleteTelefone(telefone_id, paciente) {
      paciente.telefone = paciente.telefone.filter((obj) => obj.telefone_id !== telefone_id);
        toast.success('Telefone deletado com sucesso');
    },
  },
  getters: {
    totalTelefones(state) {
      return state.telefones.length;
    },
  },
});
