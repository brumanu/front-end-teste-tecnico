import { defineStore } from "pinia";
import { useToast } from 'vue-toastification';
const toast = useToast();

export const useEspecialidadesStore = defineStore("especialidades", {
  state: () => ({
    especialidades: [
      { especialidade_id: 1, nome: "Cardiologista" },
      { especialidade_id: 2, nome: "Dermatologista" },
      { especialidade_id: 3, nome: "Nutricionista" },
      { especialidade_id: 4, nome: "Pediatria" },
    ], 
    selectedEspecialidade: null, 
  }),
  actions: {
    setEspecialidades(data) {
      this.especialidades = data;
    },
    setSelectedEspecialidade(especialidade) {
      this.selectedEspecialidade = especialidade;
    },
    clearSelectedEspecialidade() {
      this.selectedEspecialidade = null;
    },
    addEspecialidade(novaEspecialidade) {
      const novoId = String(this.especialidades.length + 1);
        this.especialidades.push({ especialidade_id: novoId, ...novaEspecialidade });
        toast.success('Especialidade cadastrada com sucesso');
    },
    updateEspecialidade(especialidadeAtualizada) {
      const index = this.especialidades.findIndex(
        (obj) => obj.especialidade_id === especialidadeAtualizada.especialidade_id
      );
      if (index !== -1) {
          this.especialidades[index] = { ...especialidadeAtualizada };
          toast.success('Especialidade atualizada com sucesso');
      }
    },
    deleteEspecialidade(especialidade_id) {
        this.especialidades = this.especialidades.filter((esp) => esp.especialidade_id !== especialidade_id);
        toast.success('Especialidade deletada com sucesso');
    },
  },
  getters: {
    totalEspecialidades(state) {
      return state.especialidades.length;
    },
  },
});
