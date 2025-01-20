<template>
  <PageWrapper style="width: 500px">
    <header>
      <h1>Cadastro</h1>
    </header>

    <div>
      <label for="user">Usuario</label>

      <el-input
        id="user"
        class="mb-1"
        v-model="payload.user"
        placeholder="Usuario"
      />

      <label for="password">Senha</label>
      <el-input
        id="password"
        class="mb-1"
        v-model="payload.password"
        type="password"
        placeholder="Senha"
        show-password
      />

      <label for="confirm_password">Confirme a senha</label>
      <el-input
        class="mb-3"
        id="confirm_password"
        v-model="payload.confirm_password"
        type="password"
        placeholder="Confirme a senha"
        show-password
      />

      <div class="flex flex-column">
        <el-button type="primary" @click="handleRegister">Cadastrar</el-button>
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
  confirm_password: "",
});

const contasStore = useContasStore();

const handleRegister = () => {
  if (
    !payload.value.user ||
    !payload.value.password ||
    !payload.value.confirm_password
  ) {
    toast.error("Todos os campos são obrigatórios");
    return;
  }

  if (payload.value.password !== payload.value.confirm_password) {
    toast.error("As senhas não coincidem");
    return;
  }
  const novoUsuario = {
    usuario_id: String(contasStore.contas.length + 1),
    nome: payload.value.user,
    senha: payload.value.password,
  };

  contasStore.addConta(novoUsuario);

  payload.value = {};
  router.push("/");
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
  