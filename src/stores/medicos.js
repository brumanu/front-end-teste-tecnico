import { defineStore } from "pinia";
import { useToast } from 'vue-toastification';
const toast = useToast();

export const useMedicosStore = defineStore("medicos", {
    state: () => ({
        medicos: [
            { medico_id: 1, nome: "João da Silva", especialidade: { especialidade_id: 2, nome: "Dermatologista" }, crm: "12345-PR" },
            { medico_id: 2, nome: "Cleber Oliveira", especialidade: { especialidade_id: 4, nome: "Pediatria" }, crm: "67890-PR" },
            { medico_id: 3, nome: "Maria Paz", especialidade: { especialidade_id: 4, nome: "Pediatria" }, crm: "54321-PR" },
        ],
        selectedMedico: null,
        searchQuery: "",
    }),
    actions: {
        setMedicos(data) {
            this.medicos = data;
        },
        setSelectedMedico(medico) {
            this.selectedMedico = medico;
        },
        clearSelectedMedico() {
            this.selectedMedico = null;
        },
        setSearchQuery(query) {
            this.searchQuery = query;
        },
        addMedico(novoMedico) {
            const novoId = String(this.medicos.length + 1);
            this.medicos.push({ medico_id: novoId, ...novoMedico });
            toast.success('Medico cadastrado com sucesso');
        },
        updateMedico(medicoAtualizado) {
            const index = this.medicos.findIndex(
                (obj) => obj.medico_id === medicoAtualizado.medico_id
            );
            if (index !== -1) {
                this.medicos[index] = { ...medicoAtualizado };
                toast.success('Medico atualizado com sucesso');
            }
        },
        deleteMedico(medico_id) {
            this.medicos = this.medicos.filter((obj) => obj.medico_id !== medico_id);
            toast.success('Medico deletado com sucesso');
        },
        selectedMedicoId(state) {
            return state.selectedMedico ? state.selectedMedico.medico_id : null;
        }
    },
    getters: {
        totalMedicos(state) {
            return state.medicos.length;
        },
        filteredMedicos(state) {
            const query = state.searchQuery.toLowerCase();
            return state.medicos.filter((medico) => 
                medico.nome.toLowerCase().includes(query) ||
                medico.crm.toLowerCase().includes(query) ||
                medico.especialidade.nome.toLowerCase().includes(query)
            );
        },
        setSelectedMedicoId(medicoId) {
            const medico = this.medicos.find(p => p.medico_id === medicoId);
            this.selectedMedico = medico || null;
        }
    },
});
