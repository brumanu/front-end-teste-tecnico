import { defineStore } from "pinia";
import { useToast } from 'vue-toastification';
const toast = useToast();

export const useConsultasStore = defineStore("consultas", {
  state: () => ({
    selectedConsulta: null, // Consulta selecionada
    consultas:[]
  }),
  actions: {
    setConsultas(data) {
      this.consultas = data;
    },
    setSelectedConsulta(consulta) {
      this.selectedConsulta = consulta;
    },
    clearSelectedConsulta() {
      this.selectedConsulta = null;
    },
    addConsulta(novoConsulta) {

      const novoId = String(this.consultas.length + 1);
      this.consultas.push({consulta_id: novoId, ...novoConsulta})
        toast.success('Consulta cadastrada com sucesso');
    },
    updateConsulta(consultaAtualizada, paciente) {
      const index = paciente.consulta.findIndex(
        (obj) => obj.consulta_id === consultaAtualizada.consulta_id
      );
      if (index !== -1) {
        paciente.consulta[index] = { ...consultaAtualizada };
          toast.success('Consulta atualizada com sucesso');
      }
    },
    deleteConsulta(consulta_id) {
      this.consultas = this.consultas.filter((obj) => obj.consulta_id !== consulta_id);
        toast.success('Consulta cancelada com sucesso');
    },
  },
  getters: {
    totalConsultas(state) {
      return state.consultas.length;
    },
  },
});
