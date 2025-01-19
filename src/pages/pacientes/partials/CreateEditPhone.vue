<template>
  <BaseModal
    :open="props.open"
    @close="$emit('close')"
    :width="500"
    :height="500"
  >
    <template v-slot:header>
      <h3>Cadastrar/Editar Telefone</h3>
    </template>
    <template v-slot:body>
      <el-table :data="tablePhoneData.telefone" style="width: 100%">
        <el-table-column prop="telefone" label="Telefone" />
        <el-table-column label="Ações">
          <template #default="{ row }">
            <el-button
              type="info"
              :icon="Edit"
              circle
              @click="handleEdit(row)"
            />
            <el-button
              type="danger"
              :icon="Delete"
              circle
              @click="deletePhone(row.telefone_id)"
            />
          </template>
        </el-table-column>
      </el-table>
      <div class="flex flex-column w-100 mb-2">
        <div>
          <label for="telefone">Telefone</label>
          <el-input
            v-model="payload.telefone"
            placeholder="Telefone"
            v-mask="'(##)#########'"
          />
          <span v-if="errors.telefone" class="error">{{
            errors.telefone
          }}</span>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <el-button type="primary" round @click="handleSubmit()">Salvar</el-button>
      <el-button type="danger" round @click="handleClose()">Fechar</el-button>
    </template>
  </BaseModal>
</template>

  <script setup>
import { onUpdated, ref } from "vue";
import { usePacientesStore } from "@/stores/pacientes.js";
import { useTelefonesStore } from "@/stores/telefones.js";
  import { useFormValidator } from "@/composables/useFormValidator";
  import { Delete, Edit } from "@element-plus/icons-vue";

const { validateFields, isValid } = useFormValidator();
const pacientesStore = usePacientesStore();
const telefonesStore = useTelefonesStore();

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
const isUpdate = ref(false);
const errors = ref({});
const payload = ref({ telefone: ''});
const tablePhoneData = ref([]);

const emit = defineEmits(["close"]);

onUpdated(() => {
  if (props.open == true) {
    tablePhoneData.value = pacientesStore.selectedPaciente; 
    errors.value = {};
  }
});

  const handleSubmit = () => {
  errors.value = validateFields(payload.value);
  if (isValid(errors.value)) {
    if (isUpdate.value == true) {
      telefonesStore.updateTelefone({
        telefone_id: telefonesStore.selectedTelefone.telefone_id,
        telefone: payload.value.telefone,
      },
      pacientesStore.selectedPaciente);
      payload.value.telefone = ""
      telefonesStore.clearSelectedTelefone();
    } else {
      telefonesStore.addTelefone(
        {
          telefone: payload.value.telefone,
        },
        pacientesStore.selectedPaciente
      );
      payload.value.telefone = ""
    }
    // payload.value.telefone = "";
  }
};

const handleEdit = (row) => {
  telefonesStore.setSelectedTelefone(row);
  isUpdate.value = true;
  
  payload.value.telefone = telefonesStore.selectedTelefone.telefone;
}

const deletePhone = (telefone_id) => {
  telefonesStore.deleteTelefone(telefone_id, pacientesStore.selectedPaciente);
};

const handleClose = () => {
  pacientesStore.clearSelectedPaciente();
  telefonesStore.clearSelectedTelefone();
  isUpdate.value = false
  payload.value.telefone = "";
  errors.value = {};
  emit("close");
};
</script>
<style scoped>
.error {
  color: red;
  font-size: 0.7rem;
}
</style>
