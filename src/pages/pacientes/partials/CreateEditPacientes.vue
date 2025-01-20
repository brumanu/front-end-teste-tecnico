<template>
  <BaseModal
    :open="props.open"
    @close="$emit('close')"
    :width="500"
    :height="500"
  >
    <template v-slot:header>
      <h3>{{ title }} Paciente</h3>
    </template>
    <template v-slot:body>
      <div class="flex flex-column w-100 mb-2">
        <div>
          <label for="nome">Nome do Paciente</label>

          <el-input v-model="payload.nome" placeholder="Nome do Paciente" />
          <span v-if="errors.nome" class="error">{{ errors.nome }}</span>
        </div>
        <div>
          <label for="cpf">CPF</label>

          <el-input
            v-model="payload.cpf"
            placeholder="CPF"
            v-mask="'###.###.###-##'"
          />
          <span v-if="errors.cpf" class="error">{{ errors.cpf }}</span>
        </div>
        <div class="flex flex-column">
          <label for="nome">Data de Nascimento</label>

          <el-date-picker
            style="width: 100%"
            v-model="payload.data_nasc"
            type="date"
            placeholder="Selecione uma data"
            format="DD/MM/YYYY"
            value-format="DD/MM/YYYY"
            @change="validateAge(payload.data_nasc)"
          />
          <span v-if="errors.data_nasc" class="error">{{
            errors.data_nasc
          }}</span>
        </div>
        <div v-if="isAdult == false">
          <label for="cpf">CPF do Responsável</label>

          <el-input
            v-model="payload.cpf_responsavel"
            placeholder="CPF"
            v-mask="'###.###.###-##'"
          />
          <span v-if="errors.cpf_responsavel" class="error">{{ errors.cpf_responsavel }}</span>
        </div>
        <div>
          <label for="nome">CEP</label>

          <el-input
            v-model="payload.cep"
            placeholder="CEP"
            v-mask="'#####-###'"
            @change="buscarEndereco()"
          />
          <span v-if="errors.cep" class="error">{{ errors.cep }}</span>
        </div>
        <div>
          <label for="nome">Endereço</label>

          <el-input v-model="payload.endereco" placeholder="Endereço" />
          <span v-if="errors.endereco" class="error">{{
            errors.endereco
          }}</span>
        </div>
        <div>
          <label for="nome">Número</label>

          <el-input v-model="payload.endereco_numero" placeholder="Número" />
          <span v-if="errors.endereco_numero" class="error">{{
            errors.endereco_numero
          }}</span>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <el-button type="primary" round @click="handleSubmit()">Salvar</el-button>
      <el-button type="danger" round @click="handleClose()">Cancelar</el-button>
    </template>
  </BaseModal>
</template>

  <script setup>
import { onUpdated, ref } from "vue";
import { usePacientesStore } from "@/stores/pacientes.js";
import { useFormValidator } from "@/composables/useFormValidator";
import { formatDate } from "@/utils/date";
import dayjs from "dayjs";

const { validateFields, isValid } = useFormValidator();
const pacientesStore = usePacientesStore();

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  isUpdate: {
    type: Boolean,
    default: false,
  },
  paciente: {
    type: Object,
    default: () => ({}),
  },
});

const title = ref("");
const errors = ref({});
const payload = ref({});
const isAdult = ref(true);

const emit = defineEmits(["close"]);

onUpdated(() => {
  if (props.open == true) {

    title.value = props.isUpdate ? "Editar" : "Criar";
    payload.value.nome = pacientesStore.selectedPaciente?.nome || "";
    payload.value.cpf = pacientesStore.selectedPaciente?.cpf || "";
    payload.value.data_cadatro =
    pacientesStore.selectedPaciente?.data_cadatro || formatDate(Date.now());
    payload.value.data_nasc = pacientesStore.selectedPaciente?.data_nasc || "";
    payload.value.cpf_responsavel = pacientesStore.selectedPaciente?.cpf_responsavel || null;
    payload.value.cep = pacientesStore.selectedPaciente?.cep || "";
    payload.value.endereco = pacientesStore.selectedPaciente?.endereco || "";
    payload.value.endereco_numero =
    pacientesStore.selectedPaciente?.endereco_numero || "";
    errors.value = {};
    if (props.isUpdate) {
      validateAge(pacientesStore.selectedPaciente?.data_nasc)
    } 
  }
});

  const handleSubmit = () => {
    
    if (isAdult.value == true) {
      payload.value.cpf_responsavel = "null";
    }
    
    errors.value = validateFields(payload.value);
    if (payload.value.cpf_responsavel === payload.value.cpf) {
      errors.value.cpf_responsavel = "Cpf do paciente não pode ser igual ao Cpf do responsável"
    }
    
    if (isValid(errors.value)) {
    if (props.isUpdate) {
      pacientesStore.updatePaciente({
        paciente_id: pacientesStore.selectedPaciente.paciente_id,
        nome: payload.value.nome,
        cpf: payload.value.cpf,
        data_cadatro: payload.value.data_cadatro,
        cpf_responsavel: payload.value.cpf_responsavel,
        data_nasc: payload.value.data_nasc,
        cep: payload.value.cep,
        endereco: payload.value.endereco,
        endereco_numero: payload.value.endereco_numero,
      });
    } else {
      pacientesStore.addPaciente({
        nome: payload.value.nome,
        cpf: payload.value.cpf,
        data_cadatro: formatDate(Date.now()),
        data_nasc: payload.value.data_nasc,
        cpf_responsavel: payload.value.cpf_responsavel,
        cep: payload.value.cep,
        endereco: payload.value.endereco,
        endereco_numero: payload.value.endereco_numero,
      });
    }
    pacientesStore.clearSelectedPaciente();
    payload.value = {};
    emit("close");
  }
};

const buscarEndereco = async () => {
  if (!payload.value.cep || payload.value.cep.length < 8) {
    errors.value.cep = "CEP inválido. Verifique e tente novamente.";
    payload.value.endereco = "";
    return;
  }

  try {
    // Chama o método do store para buscar o endereço
    const endereco = await pacientesStore.fetchEnderecoPorCep(
      payload.value.cep
    );

    payload.value.endereco = endereco.logradouro;

    errors.value.cep = null;
  } catch (error) {
    console.error("Erro ao buscar endereço:", error);
    errors.value.cep = "Não foi possível buscar o endereço. Verifique o CEP.";
    payload.value.endereco = "";
  }
};

const validateAge = (date) => {
  const today = dayjs();
  const convertedData = dayjs(date, "DD/MM/YYYY");
  isAdult.value = today.diff(convertedData, "year") >= 18 ? true : false;
};


const handleClose = () => {
  pacientesStore.clearSelectedPaciente();
  payload.value = {};
  errors.value = {};
  isAdult.value = true;
  emit("close");
};
</script>
<style scoped>
.error {
  color: red;
  font-size: 0.7rem;
}
</style>
