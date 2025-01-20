<template>
  <header class="navbar" v-if="isLoggedIn">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="navbar-logo">
        <router-link to="/pacientes">Sistema Médico</router-link>
      </div>

      <!-- Menu de Navegação -->
      <nav class="navbar-menu">
        <div
          v-for="link of links"
          :key="link.path"
          class="navbar-link flex"
        >
            <NavBarIcons :icon="link.icon" class="mr-1" />
            <router-link
              :key="link.path"
              :to="link.path"
              class="navbar-link-text"
              active-class="active-link"
            >
              {{ link.label }}
            </router-link>
          </div>
      </nav>

      <!-- Ações (Opcional) -->
      <div class="navbar-actions">
        <el-button type="primary" round @click="logout">Sair</el-button>
      </div>
    </div>
  </header>
</template>
  
  <script setup>
import { ref,  computed} from "vue";
import { useRouter } from "vue-router";
import NavBarIcons from "./partials/NavBarIcons.vue";
import links from "./partials/links";
  import { useContasStore } from '@/stores/autenticacao';
  const contasStore = useContasStore();

  const isLoggedIn = computed(() => contasStore.isLoggedIn);

const menuItems = ref([
  { label: "Início", path: "/" },
  { label: "Especialidades", path: "/especialidades" },
  { label: "Configurações", path: "/configuracoes" },
]);

const router = useRouter();

const logout = () => {
  // Lógica para logout
  contasStore.logout();
  console.log("Usuário desconectado.");
  router.push("/");
};
</script>
  
  <style scoped lang="scss">


.navbar {

  color: #0d0c22;
  padding: 1rem;
  display: flex;
  justify-content: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo {
  a {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    color: #0d0c22;
  }
}

.navbar-menu {
  display: flex;
  gap: 1.5rem;
}

.navbar-link {
  transition: color 0.3s;

  &:hover {
    color: lighten(#409eff, 10%);
  }
}

.navbar-link-text{
  color: #0d0c22;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s;
  &:hover {
    color: lighten(#409eff, 10%);
  }
}

.active-link {
  font-weight: bold;
  border-bottom: 2px solid #409eff;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;

  .el-button {
    font-size: 0.875rem;
  }
}

@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    gap: 1rem;
  }

  .navbar-menu {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }

  .navbar-actions {
    justify-content: center;
  }
}

</style>
  