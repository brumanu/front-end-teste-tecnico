
<template>
  <PageWrapper>
    <div>
      <h1>Cadastro de Pacientes</h1>
      <span
        >Esta seção permite cadastrar, editar ou excluir pacientes no
        sistema.</span
      >
    </div>

    <el-button
      class="mt-3 mb-3 float-right"
      type="primary"
      round
      @click="openModal()"
      >Cadastrar Pacientes</el-button
    >
    <el-table :data="pacientesStore.pacientes" style="width: 100%">
      <el-table-column prop="paciente_id" label="ID" width="50" />
      <el-table-column prop="nome" label="Paciente" />
      <el-table-column prop="cpf" label="CPF" />
      <el-table-column prop="data_cadatro" label="Dt.Cadastro" />
      <el-table-column prop="data_nasc" label="Dt.Nascimento" />
      <el-table-column prop="cep" label="CEP" />
      <el-table-column prop="endereco" label="Endereço" />
      <el-table-column prop="endereco_numero" label="N°" width="60" />
      <el-table-column label="Ações">
        <template #default="{ row }">
          <el-button type="info" :icon="Edit" circle @click="openModal(row)" />
          <el-button
            type="danger"
            :icon="Delete"
            circle
            @click="deletePaciente(row.paciente_id)"
          />
          <el-button
            type="warning"
            :icon="Cellphone"
            circle
            @click="handlePhone(row)"
          />
        </template>
      </el-table-column>
    </el-table>

    <CreateEditPacientes
      :open="formModal"
      @close="closeModal"
      :paciente="pacienteAtual"
      :isUpdate="isUpdate"
    />

    <CreateEditPhone
      :open="formPhoneModal"
      @close="closeModal"
      :paciente="pacienteAtual"
    />

  </PageWrapper>
</template>
  <script setup>
import { ref } from "vue";
import { usePacientesStore } from "@/stores/pacientes.js";
import CreateEditPacientes from "./partials/CreateEditPacientes.vue";
import CreateEditPhone from "./partials/CreateEditPhone.vue";

import { Delete, Edit, Cellphone } from "@element-plus/icons-vue";

const pacientesStore = usePacientesStore();
const formModal = ref(false);
const formPhoneModal = ref(false);
const isUpdate = ref(false);

const pacienteAtual = ref(null);

const openModal = (paciente) => {
  formModal.value = true;
  if (paciente) {
    pacientesStore.setSelectedPaciente(paciente);
    isUpdate.value = true;
  }
};

const handlePhone = (paciente) => {
    pacientesStore.setSelectedPaciente(paciente);
    
  formPhoneModal.value = true;
};

const closeModal = () => {
  formModal.value = false;
  formPhoneModal.value = false;
  pacienteAtual.value = null;
  isUpdate.value = false;
};

const deletePaciente = (paciente_id) => {
  pacientesStore.deletePaciente(paciente_id);
};
</script>
  
  <style scoped >
.el-table th,
.el-table td {
  white-space: nowrap; /* Impede que o texto quebre em várias linhas */
  text-align: center; /* Centraliza o texto para melhor visualização */
}

.el-table {
  min-width: 800px; /* Ajuste conforme necessário */
}
</style>
  
  