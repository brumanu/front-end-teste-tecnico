import { defineStore } from "pinia";
import { useToast } from 'vue-toastification';
const toast = useToast();

export const useTelefonesStore = defineStore("telefones", {
  state: () => ({
    telefones: [], // Lista de telefones
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
    addTelefone(novaTelefone) {
      const novoId = String(this.telefones.length + 1);
        this.telefones.push({ telefone_id: novoId, ...novaTelefone });
        toast.success('Telefone cadastrada com sucesso');
    },
    updateTelefone(telefoneAtualizada) {
      const index = this.telefones.findIndex(
        (obj) => obj.telefone_id === telefoneAtualizada.telefone_id
      );
      if (index !== -1) {
          this.telefones[index] = { ...telefoneAtualizada };
          toast.success('Telefone atualizada com sucesso');
      }
    },
    deleteTelefone(telefone_id) {
        this.telefones = this.telefones.filter((esp) => esp.telefone_id !== telefone_id);
        toast.success('Telefone deletada com sucesso');
    },
  },
  getters: {
    totalTelefones(state) {
      return state.telefones.length;
    },
  },
});
