
<template>
    <PageWrapper>
  
      <div>
        <h1>Pessoas Médicas</h1>
        <span>Esta seção permite cadastrar, editar ou excluir pessoas médicas no sistema.</span>
      </div>
  
      <el-button class="mt-3 mb-3 float-right " type="primary" round @click="openModal()"
        >Cadastrar Médicos</el-button
      >
      <el-table :data="medicosStore.medicos" style="width: 100%">
        <el-table-column prop="medico_id" label="ID" />
        <el-table-column prop="nome" label="Nome" />
        <el-table-column prop="especialidade.nome" label="Especialidade" />
        <el-table-column prop="crm" label="CRM" />
        <el-table-column label="Ações">
          <template #default="{ row }">
            <el-button type="info" :icon="Edit" circle @click="openModal(row)" />
            <el-button
              type="danger"
              :icon="Delete"
              circle
              @click="deleteMedico(row.medico_id)"
            />
          </template>
        </el-table-column>
      </el-table>
  
      <CreateEditMedicos
        :open="formModal"
        @close="closeModal"
        :medico="medicoAtual"
        :isUpdate="isUpdate"
      />
    </PageWrapper>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useMedicosStore } from '@/stores/medicos.js'
   import CreateEditMedicos from "./partials/CreateEditMedicos.vue";
  
  import { Delete, Edit } from "@element-plus/icons-vue";
  
  const medicosStore = useMedicosStore();
  const formModal = ref(false);
  const isUpdate = ref(false);
  
  const medicoAtual = ref(null);
  
  const openModal = (medico) => {
    formModal.value = true; 
      if (medico) {
      medicosStore.setSelectedMedico(medico);
      isUpdate.value = true;
    }
  };
  
  const closeModal = () => {
    formModal.value = false;
    medicoAtual.value = null;
    isUpdate.value = false;
  };
  
  const deleteMedico = (medico_id) => {
      medicosStore.deleteMedico(medico_id);
  };
  </script>
  
  <style scoped lang="scss">
  </style>
  
  