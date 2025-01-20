import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from 'vue-toastification';
const toast = useToast();

export const usePacientesStore = defineStore("pacientes", {
    state: () => ({
        pacientes: [
            {
                paciente_id: 1,
                nome: "Matheus Nani",
                cpf: "111.711.899-15",
                data_cadatro: "15/04/2009",
                data_nasc: "11/06/1966",
                cep: "81870218",
                endereco: "Rua Lídia Carvalho Marques",
                endereco_numero: "11",
                telefone: []
            },
            {
                paciente_id: 2,
                nome: "Lavínia Louise Bernardes",
                cpf: "081.298.229-03",
                data_cadatro: "30/07/2014",
                data_nasc: "15/07/1963",
                cep: "81925-576",
                endereco: "Rua Tala Raul Miguel Elias",
                endereco_numero: "132",
                telefone: []
            },
            {
                paciente_id: 3,
                nome: "Carolina Olivia Daniela da Cruz",
                cpf: "248.374.689-69",
                data_cadatro: "15/09/2017",
                data_nasc: "04/12/2001",
                cep: "81270-530",
                endereco: "Rua Osvaldo Tosato",
                endereco_numero: "54",
                telefone: []
            },
            {
                paciente_id: 4,
                nome: "Catarina Olivia Silveira",
                cpf: "479.049.719-41",
                data_cadatro: "30/05/2010",
                data_nasc: "14/09/1971",
                cep: "80740-520",
                endereco: "Rua Gabriel Nunes Pires",
                endereco_numero: "566",
                telefone: []
            },
            {
                paciente_id: 5,
                nome: "Bento Cauã Benjamin Duarte",
                cpf: "105.816.519-44",
                data_cadatro: "12/12/2020",
                data_nasc: "20/12/1977",
                cep: "82010-630",
                endereco: "Rua Apolônia Kozak",
                endereco_numero: "1444",
                telefone: []
            }
        ],
        selectedPaciente: null,
        searchQuery: "",
    }),
    actions: {
        async fetchEnderecoPorCep(cep) {
            try {
              const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      
              if (response.data.erro) {
                throw new Error("CEP inválido.");
              }
      
              return {
                logradouro: response.data.logradouro,
                bairro: response.data.bairro,
                cidade: response.data.localidade,
                uf: response.data.uf,
              };
            } catch (error) {
              console.error("Erro ao consultar o ViaCEP:", error);
              throw new Error("Erro ao buscar o endereço.");
            }
          },
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
            const novoId = String(this.pacientes.length + 1);
            this.pacientes.push({ paciente_id: novoId, ...novoPaciente, telefone: [] });
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
        setSearchQuery(query) {
            this.searchQuery = query;
        },
        selectedPacienteId(state) {
            return state.selectedPaciente ? state.selectedPaciente.paciente_id : null;
        }
    },
    getters: {
        totalPacientes(state) {
            return state.pacientes.length;
        },
        filteredPacientes(state) {
            const query = state.searchQuery.toLowerCase();
            return state.pacientes.filter(
                (paciente) =>
                    paciente.nome.toLowerCase().includes(query) ||
                    paciente.cpf.replace(/[^\d]/g, "").includes(query)
            );
        },
        setSelectedPacienteId(pacienteId) {
            const paciente = this.pacientes.find(p => p.paciente_id === pacienteId);
            this.selectedPaciente = paciente || null;
        }
    },
});
