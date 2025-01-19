<template>
  <BaseModal
    :open="props.open"
    @close="$emit('close')"
    :width="500"
    :height="350"
  >
    <template v-slot:header>
      <h3>{{ title }} Médicos</h3>
    </template>
    <template v-slot:body>
      <div class="flex flex-column w-100 mb-2">
        <div>
          <label for="nome">Nome do Médico</label>

          <el-input v-model="payload.nome" placeholder="Nome do Médico" />
          <span v-if="errors.nome" class="error">{{ errors.nome }}</span>
        </div>

        <div>
          <label for="especialidade">Especialidade</label>
          <el-select
            v-model="payload.especialidade"
            placeholder="Selecione a especialidade do médico"
            size="large"
            append-to-body
          >
            <el-option
              v-for="item in especialidadesStore.especialidades"
              :key="item.especialidade_id"
              :label="item.nome"
              :value="item.especialidade_id"
            />
          </el-select>
          <span v-if="errors.especialidade" class="error">{{ errors.especialidade }}</span>
        </div>
        <div>
          <label for="nome">CRM</label>

          <el-input v-model="payload.crm" placeholder="CRM" />
          <span v-if="errors.crm" class="error">{{ errors.crm }}</span>
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
import { useEspecialidadesStore } from "@/stores/especialidades.js";
import { useMedicosStore } from "@/stores/medicos.js";
import { useFormValidator } from "@/composables/useFormValidator";

const { validateFields, isValid } = useFormValidator();
const especialidadesStore = useEspecialidadesStore();
const medicoStore = useMedicosStore();

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
    title.value = props.isUpdate ? "Editar" : "Criar";

    payload.value.nome = medicoStore.selectedMedico?.nome || "";

    payload.value.especialidade =
      medicoStore.selectedMedico?.especialidade.nome || "";

    payload.value.crm = medicoStore.selectedMedico?.crm || "";

    errors.value = {};
  }
});

const handleSubmit = () => {
  errors.value = validateFields(payload.value);

  if (isValid(errors.value)) {
    let especialidadeSelected;
    especialidadesStore.especialidades.forEach((obj) => {
      if (
        obj.especialidade_id == payload.value.especialidade ||
        obj.especialidade_id == payload.value.especialidade.especialidade_id ||
        obj.nome == payload.value.especialidade
      ) {
        especialidadeSelected = obj;
      }
    });
    if (props.isUpdate) {
      medicoStore.updateMedico({
        medico_id: medicoStore.selectedMedico.medico_id,
        nome: payload.value.nome,
        especialidade: especialidadeSelected,
        crm: payload.value.crm,
      });
    } else {
      medicoStore.addMedico({
        nome: payload.value.nome,
        especialidade: especialidadeSelected,
        crm: payload.value.crm,
      });
    }
    medicoStore.clearSelectedMedico();
    payload.value = {};
    emit("close");
  }
};

const handleClose = () => {
  medicoStore.clearSelectedMedico();
  payload.value = {};
  errors.value = {};
  emit("close");
};
</script>
  <style scoped>
.error {
  color: red;
  font-size: 0.7rem;
}
.custom-dropdown {
  z-index: 100001 !important; /* Ajuste o valor conforme necessário */
}
</style>
    