<template>
  <PageWrapper style="width: 500px">
    <header>
      <h1>Login</h1>
    </header>

    <div class="mt-3">
      <label for="user">Usuario</label>

      <el-input
        id="user"
        class="mb-1"
        v-model="payload.user"
        placeholder="Usuario"
      />

      <label class="mt-3" for="password">Senha</label>
      <el-input
        id="password"
        class="mb-3"
        v-model="payload.password"
        type="password"
        placeholder="Senha"
        show-password
      />

      <div class="flex flex-column">
        <el-button type="primary" @click="handleLogin">Login</el-button>

        <span id="sign-up" @click="signUp()">Cadastre-se</span>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup>
import { ref } from "vue";
import { useContasStore } from "@/stores/autenticacao";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
const toast = useToast();

const router = useRouter();
const payload = ref({
  user: "",
  password: "",
});

const contasStore = useContasStore();

function signUp() {
  router.push("/cadastro");
}

const handleLogin = () => {
  if (!payload.value.user || !payload.value.password) {
    toast.error("Usuario e senha são obrigatórios");
    return;
  }

  contasStore.login(payload.value.email, payload.value.password);

  if (contasStore.isLoggedIn) {
    // Redirecionar para a página inicial após o login bem-sucedido
    router.push("/especialidades");
  } else {
    toast.error("Email ou senha incorretos");
  }
};
</script>

<style lang="scss" scoped>
header {
  text-align: center;
}

#sign-up {
  color: #409eff;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: lighten(#409eff, 10%);
  }
}
</style>
