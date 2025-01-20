
<template>
    <PageWrapper>
  
      <div>
        <h1>Consultas</h1>
        <span>Esta seção permite marcar, remarcar e cancelar consultas</span>
      </div>
  
      <el-button class="mt-3 mb-3 float-right " type="primary" round @click="openModal()"
        >Marcar Consulta</el-button
      >
      <el-table :data="consultasStore.consultas" style="width: 100%">
        <el-table-column prop="consulta_id" label="ID" />
        <el-table-column prop="paciente.nome" label="Paciente" />
        <el-table-column prop="medico.nome" label="Médico" />
        <el-table-column prop="data_consulta" label="Data da Consulta" />
        <el-table-column label="Ações">
          <template #default="{ row }">
            <el-button type="info" :icon="Edit" circle @click="openModal(row)" />
            <el-button
              type="danger"
              :icon="Delete"
              circle
              @click="deleteConsulta(row.consulta_id)"
            />
          </template>
        </el-table-column>
      </el-table>
  
      <CreateEditConsultas
        :open="formModal"
        @close="closeModal"
        :especialidade="consultaAtual"
        :isUpdate="isUpdate"
      />
    </PageWrapper>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useConsultasStore } from '@/stores/consultas.js'
  import CreateEditConsultas from "./partials/CreateEditConsultas.vue";
  
  import { Delete, Edit } from "@element-plus/icons-vue";
  
  const consultasStore = useConsultasStore();
  const formModal = ref(false);
  const isUpdate = ref(false);
  
  const consultaAtual = ref(null);
  
  const openModal = (consulta) => {
    formModal.value = true; 
      if (consulta) {
        consultasStore.setSelectedConsulta(consulta);
      isUpdate.value = true;
    }
  };
  
  const closeModal = () => {
    formModal.value = false;
    consultaAtual.value = null;
    isUpdate.value = false;
  };
  
  const deleteConsulta = (consulta_id) => {
    consultasStore.deleteConsulta(consulta_id);
  };
  </script>
  
  <style scoped lang="scss">
  </style>
  
  