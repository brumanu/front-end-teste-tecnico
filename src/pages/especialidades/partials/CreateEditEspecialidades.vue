<template>
  <BaseModal
    :open="props.open"
    @close="$emit('close')"
    :width="500"
    :height="300"
  >
    <template v-slot:header>
      <h3>{{ title }} Especialidade</h3>
    </template>
    <template v-slot:body>
      <div class="flex flex-column w-100 mb-2">
        <label for="nome">Nome da Especialidade</label>
          
          <el-input
            v-model="payload.nome"
            placeholder="Nome da Especialidade"
          />
          <span v-if="errors.nome" class="error">{{ errors.nome }}</span>
        
      </div>
    </template>
    <template v-slot:footer>
      <el-button type="primary" round @click="handleSubmit()">Salvar</el-button>
      <el-button type="danger" round @click="handleClose()"
        >Cancelar</el-button
      >
    </template>
  </BaseModal>
</template>
  
  <script setup>
import { onUpdated, ref } from "vue";
import { useEspecialidadesStore } from "@/stores/especialidades.js";
import { useFormValidator } from "@/composables/useFormValidator";

const { validateFields, isValid } = useFormValidator();
const especialidadesStore = useEspecialidadesStore();

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
      payload.value.nome = especialidadesStore.selectedEspecialidade?.nome || "";
      errors.value = {};
    }
});

const handleSubmit = () => {
    errors.value = validateFields(payload.value);

    if (isValid(errors.value)) {
        if (props.isUpdate) {
          especialidadesStore.updateEspecialidade({
            especialidade_id: especialidadesStore.selectedEspecialidade.especialidade_id,
            nome: payload.value.nome,
          });
        } else {
          especialidadesStore.addEspecialidade({
            nome: payload.value.nome,
        });
        
      }
      especialidadesStore.clearSelectedEspecialidade();
    payload.value = {}
    emit("close");
  }
};

const handleClose = () => {
  especialidadesStore.clearSelectedEspecialidade();
  payload.value = {}
  errors.value = {}
  emit("close");
};
</script>
<style scoped>
.error {
  color: red;
  font-size: 0.7rem;
}
</style>
  