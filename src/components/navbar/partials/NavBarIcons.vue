<template>
  <div>
    <el-icon v-if="props.icon === 'especialidades'"><List /></el-icon>

    <el-icon v-if="props.icon === 'medicos'"><Avatar /></el-icon>

    <el-icon v-if="props.icon === 'pacientes'"><UserFilled /></el-icon>

    <el-icon v-if="props.icon === 'consultas'"><Checked /></el-icon>
  </div>
</template>
<script setup>
import { List, Avatar, UserFilled, Checked } from "@element-plus/icons-vue";
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});
</script>

