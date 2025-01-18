
<template>
  <PageWrapper>

    <div>
      <h1>Especialidade Médicas</h1>
      <span>Esta seção permite cadastrar, editar ou excluir especialidades médicas no sistema.</span>
    </div>

    <el-button class="mt-3 mb-3 float-right " type="primary" round @click="openModal()"
      >Cadastrar Especialidade</el-button
    >
    <el-table :data="especialidadesStore.especialidades" style="width: 100%">
      <el-table-column prop="especialidade_id" label="ID" />
      <el-table-column prop="nome" label="Especialidade" />
      <el-table-column label="Ações">
        <template #default="{ row }">
          <el-button type="info" :icon="Edit" circle @click="openModal(row)" />
          <el-button
            type="danger"
            :icon="Delete"
            circle
            @click="deleteEspecialidade(row.especialidade_id)"
          />
        </template>
      </el-table-column>
    </el-table>

    <CreateEditEspecialidades
      :open="formModal"
      @close="closeModal"
      :especialidade="especialidadeAtual"
      :isUpdate="isUpdate"
    />
  </PageWrapper>
</template>

<script setup>
import { ref } from "vue";
import { useEspecialidadesStore } from '@/stores/especialidades.js'
import CreateEditEspecialidades from "./partials/CreateEditEspecialidades.vue";

import { Delete, Edit } from "@element-plus/icons-vue";

const especialidadesStore = useEspecialidadesStore();
const formModal = ref(false);
const isUpdate = ref(false);

const especialidadeAtual = ref(null);

const openModal = (especialidade) => {
  formModal.value = true; 
    if (especialidade) {
    especialidadesStore.setSelectedEspecialidade(especialidade);
    isUpdate.value = true;
  }
};

const closeModal = () => {
  formModal.value = false;
  especialidadeAtual.value = null;
  isUpdate.value = false;
};

const deleteEspecialidade = (especialidade_id) => {
    especialidadesStore.deleteEspecialidade(especialidade_id);
};
</script>

<style scoped lang="scss">
</style>

