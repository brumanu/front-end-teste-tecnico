import { defineStore } from "pinia";
import { useToast } from 'vue-toastification';
const toast = useToast();

export const usePacientesStore = defineStore("pacientes", {
    state: () => ({
        pacientes: [

            {
                paricente_id: 1,
                nome: "Matheus Nani",
                cpf: "11171189915",
                data_cadatro: "",
                data_nasc: "",
                cep: "81870218",
                endereco: "Rua Lídia Carvalho Marques",
                endereco_numero: "11"
            },
            {
                paricente_id: 2,
                nome: "Lavínia Louise Bernardes",
                cpf: "08129822903",
                data_cadatro: "",
                data_nasc: "",
                cep: "81925576",
                endereco: "Rua Tala Raul Miguel Elias",
                endereco_numero: "132"
            },
            {
                paricente_id: 3,
                nome: "Carolina Olivia Daniela da Cruz",
                cpf: "24837468969",
                data_cadatro: "",
                data_nasc: "",
                cep: "81270530",
                endereco: "Rua Osvaldo Tosato",
                endereco_numero: "54"
            },
            {
                paricente_id: 4,
                nome: "Catarina Olivia Silveira",
                cpf: "47904971941",
                data_cadatro: "",
                data_nasc: "",
                cep: "80740520",
                endereco: "Rua Gabriel Nunes Pires",
                endereco_numero: "566"
            },
            {
                paricente_id: 5,
                nome: "Bento Cauã Benjamin Duarte",
                cpf: "10581651944",
                data_cadatro: "",
                data_nasc: "",
                cep: "82010630",
                endereco: "Rua Apolônia Kozak",
                endereco_numero: "1444"
            }
        ],
        selectedPaciente: null,
    }),
    actions: {
        setPacientes(data) {
            this.pacientes = data;
        },
        setSelectedPaciente(paciente) {
            this.selectedPaciente = paciente;
        },
        clearSelectedPaciente() {
            this.selectedPaciente = null;
        },
        addPaciente(novoPaciente) {
            console.log(novoPaciente)
            const novoId = String(this.pacientes.length + 1);
            this.pacientes.push({ paciente_id: novoId, ...novoPaciente });
            toast.success('Paciente cadastrado com sucesso');
        },
        updatePaciente(pacienteAtualizado) {
            const index = this.pacientes.findIndex(
                (obj) => obj.paciente_id === pacienteAtualizado.paciente_id
            );
            if (index !== -1) {
                this.pacientes[index] = { ...pacienteAtualizado };
                toast.success('Paciente atualizado com sucesso');
            }
        },
        deletePaciente(paciente_id) {
            this.pacientes = this.pacientes.filter((obj) => obj.paciente_id !== paciente_id);
            toast.success('Paciente deletado com sucesso');
        },
    },
    getters: {
        totalPacientes(state) {
            return state.pacientes.length;
        },
    },
});
