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
      const consultaExistente = this.consultas.find((consulta) => {
        return (
          consulta.medico.medico_id === novoConsulta.medico.medico_id &&
          consulta.data_consulta === novoConsulta.data_consulta 
        );
      });

      if (consultaExistente) {
        toast.error('Este médico já está com consulta marcada neste horário.');
        return;
      }
      this.consultas.push({ consulta_id: novoId, ...novoConsulta });
      toast.success('Consulta cadastrada com sucesso');
    },
    updateConsulta(consultaAtualizada) {
      const index = this.consultas.findIndex(
        (obj) => obj.consulta_id === consultaAtualizada.consulta_id
      );
      
      if (index !== -1) {
        const consultaExistente = this.consultas.find((consulta) => {
          return (
            consulta.medico.medico_id === consultaAtualizada.medico.medico_id &&
            consulta.data_consulta === consultaAtualizada.data_consulta &&
            consulta.consulta_id !== consultaAtualizada.consulta_id
          );
        });

        if (consultaExistente) {
          toast.error('Este médico já está com consulta marcada neste horário.');
          return;
        }
        this.consultas[index] = { ...consultaAtualizada };
        toast.success('Consulta remarcada com sucesso');
      }
    },
    deleteConsulta(consulta_id) {
      this.consultas = this.consultas.filter((obj) => obj.consulta_id !== consulta_id);
      toast.success('Consulta cancelada com sucesso');
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
