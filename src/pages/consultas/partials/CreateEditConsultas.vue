<template>
  <BaseModal
    :open="props.open"
    @close="$emit('close')"
    :width="500"
    :height="350"
  >
    <template v-slot:header>
      <h3>{{ title }} Consulta</h3>
    </template>
    <template v-slot:body>
      <div class="flex flex-column w-100 mb-2">
        <div>
          <label for="nome">Nome do Paciente</label>
          <el-select
            v-model="selectedPaciente"
            filterable
            clearable
            placeholder="Pesquise o paciente pelo nome ou CPF"
          >
            <el-option
              v-for="paciente in filteredPacientes"
              :key="paciente.paciente_id"
              :label="`${paciente.nome} - ${paciente.cpf}`"
              :value="paciente.paciente_id"
            >
              <div class="option-content">
                <div>{{ paciente.nome }} - {{ paciente.cpf }}</div>
              </div>
            </el-option>
          </el-select>
          <span v-if="errors.paciente" class="error">{{
            errors.paciente
          }}</span>
        </div>

        <div>
          <label for="medico">Médico</label>
          <el-select
            v-model="selectedMedico"
            filterable
            clearable
            :disabled="!selectedPaciente"
            placeholder="Selecione o médico pelo CRM, nome ou especialidade"
            class="select-medico"
          >
            <el-option
              v-for="medico in filteredMedicos"
              :key="medico.medico_id"
              :label="`${medico.nome} - ${medico.crm} (${medico.especialidade.nome})`"
              :value="medico.medico_id"
            >
              <div class="option-content">
                <div>
                  {{ medico.nome }} -{{ medico.crm }} -
                  {{ medico.especialidade.nome }}
                </div>
              </div>
            </el-option>
          </el-select>
          <span v-if="errors.medico" class="error">{{ errors.medico }}</span>
        </div>

        <div class="flex flex-column">
          <label for="data-hora">Data e Hora da Consulta</label>
          <el-date-picker
            style="width: 100%"
            v-model="payload.data_consulta"
            :disabled="!selectedMedico"
            type="datetime"
            placeholder="Selecione data e hora"
            format="DD/MM/YYYY HH:mm"
            value-format="YYYY-MM-DD HH:mm:ss"
            class="w-100"
          />
          <span v-if="errors.data_consulta" class="error">{{
            errors.data_consulta
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
import { onUpdated, ref, computed } from "vue";
import { usePacientesStore } from "@/stores/pacientes";
import { useMedicosStore } from "@/stores/medicos";
import { useConsultasStore } from "@/stores/consultas";
import { useFormValidator } from "@/composables/useFormValidator";
import { formatDate } from "@/utils/date";
import dayjs from "dayjs";

const { validateFields, isValid } = useFormValidator();
const pacientesStore = usePacientesStore();
const consultasStore = useConsultasStore();
const medicosStore = useMedicosStore();

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  isUpdate: {
    type: Boolean,
    default: false,
  },
  especialidade: {
    type: Object,
    default: () => ({}),
  },
});

const title = ref("");
const errors = ref({});
const payload = ref({});

const emit = defineEmits(["close"]);

onUpdated(() => {
  if (props.open == true) {
    title.value = props.isUpdate ? "Remarcar" : "Marcar";

    const consulta = consultasStore.selectedConsulta || {};
    selectedPaciente.value = null;
    selectedMedico.value = null;
    if (props.isUpdate) {
      selectedPaciente.value = consulta.paciente.paciente_id;
      selectedMedico.value = consulta.medico.medico_id;
    }
    const dateUpdateFormated = consulta.data_consulta || "";
    payload.value.data_consulta = dateUpdateFormated
      ? dayjs(dateUpdateFormated, "DD/MM/YYYY HH:mm").format(
          "YYYY-MM-DD HH:mm:ss"
        )
      : "";

    errors.value = {};
  }
});

const handleSubmit = () => {
  errors.value = validateFields(payload.value);

  if (isValid(errors.value)) {
    const formattedDate = dayjs(payload.value.data_consulta).format(
      "DD/MM/YYYY HH:mm"
    );
    if (props.isUpdate) {
      consultasStore.updateConsulta({
        consulta_id: consultasStore.selectedConsulta.consulta_id,
        paciente: pacientesStore.selectedPaciente,
        medico: medicosStore.selectedMedico,
        data_consulta: formattedDate,
        data_agendamento: consultasStore.selectedConsulta.data_agendamento,
      });
    } else {
      consultasStore.addConsulta({
        paciente: pacientesStore.selectedPaciente,
        medico: medicosStore.selectedMedico,
        data_consulta: formattedDate,
        data_agendamento: formatDate(Date.now()),
      });
    }
    consultasStore.clearSelectedConsulta();
    payload.value = {};
    emit("close");
  }
};

const handleClose = () => {
  consultasStore.clearSelectedConsulta();
  payload.value = {};
  errors.value = {};
  emit("close");
};

const selectedPaciente = computed({
  get: () =>
    pacientesStore.selectedPaciente
      ? pacientesStore.selectedPaciente.paciente_id
      : null,
  set: (pacienteId) => {
    // A partir do paciente_id, pega o paciente completo no store
    const paciente = pacientesStore.pacientes.find(
      (p) => p.paciente_id === pacienteId
    );
    pacientesStore.selectedPaciente = paciente || null;
  },
});

const filteredPacientes = computed(() => {
  const query = pacientesStore.searchQuery.toLowerCase();
  return pacientesStore.pacientes.filter(
    (paciente) =>
      paciente.nome.toLowerCase().includes(query) ||
      paciente.cpf.replace(/[^\d]/g, "").includes(query)
  );
});

const selectedMedico = computed({
  get: () =>
    medicosStore.selectedMedico ? medicosStore.selectedMedico.medico_id : null,
  set: (medicoId) => {
    const medico = medicosStore.medicos.find((p) => p.medico_id === medicoId);
    medicosStore.selectedMedico = medico || null;
  },
});

const filteredMedicos = computed(() => {

  if (!pacientesStore.selectedPaciente) return [];

  console.log(pacientesStore.selectedPaciente);

  const query = medicosStore.searchQuery.toLowerCase();

  const isChild = (() => {
    const today = new Date();

    // Converte a data do formato "DD/MM/YYYY" para "YYYY-MM-DD"
    const [day, month, year] =
      pacientesStore.selectedPaciente.data_nasc.split("/");
    const birthDate = new Date(`${year}-${month}-${day}`); // Formato ISO

    if (isNaN(birthDate)) {
      console.error(
        "Data de nascimento inválida:",
        pacientesStore.selectedPaciente.data_nasc
      );
      return false;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }
    return age < 12; // Retorna true se for menor de 12 anos
  })();

  return medicosStore.medicos.filter((medico) => {
    const matchesQuery =
      medico.nome.toLowerCase().includes(query) ||
      medico.crm.toLowerCase().includes(query) ||
      medico.especialidade.nome.toLowerCase().includes(query);

    // Se for criança, filtra apenas pediatras
    if (isChild) {
      return medico.especialidade.nome === "Pediatria" && matchesQuery;
    }

    return matchesQuery;
  });
});
</script>
  <style scoped>
.error {
  color: red;
  font-size: 0.7rem;
}
</style>
    