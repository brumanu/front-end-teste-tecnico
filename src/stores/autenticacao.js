import { defineStore } from "pinia";
import { useToast } from 'vue-toastification';
const toast = useToast();

export const useContasStore = defineStore("Contas", {
    state: () => ({
        contas: [],
        selectedConta: null,
        usuarioLogado: null,
    }),
    actions: {
        setContas(data) {
            this.contas = data;
        },
        setSelectedConta(conta) {
            this.selectedConta = conta;
        },
        clearSelectedConta() {
            this.selectedConta = null;
        },
        addConta(novaConta) {
            const novoId = String(this.contas.length + 1);
            this.contas.push({ conta_id: novoId, ...novaConta });
            toast.success('Conta cadastrada com sucesso');
        },
        login(user, senha) {
            const usuario = this.contas.find(u => u.user === user && u.senha === senha);

            if (usuario) {
                this.usuarioLogado = usuario;
                toast.success(`Bem-vindo, ${usuario.user}!`);
            } else {
                toast.error('Credenciais inválidas. Tente novamente.');
            }
        },
        logout() {
            this.usuarioLogado = null;
            toast.success('Você foi desconectado.');
        }
    },
    getters: {
        totalContas(state) {
            return state.contas.length;
        },
        isLoggedIn(state) {
            return !!state.usuarioLogado;
        }
    },
});
