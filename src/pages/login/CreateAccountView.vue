<template>
    <PageWrapper>
      <header>
        <h1>Cadastro</h1>
      </header>
  
      <div>
        <label for="user">Usuario</label>
  
        <el-input
          id="user"
          v-model="payload.user"
          placeholder="user"
        />
  
        <label for="password">Senha</label>
        <el-input
          id="password"
          v-model="payload.password"
          type="password"
          placeholder="Senha"
          show-password
        />
        
        <label for="confirm_password">Confirme a senha</label>
        <el-input
          id="confirm_password"
          v-model="payload.confirm_password"
          type="password"
          placeholder="Confirme a senha"
          show-password
        />
  
        <el-button type="primary" @click="handleRegister">Cadastrar</el-button>
      </div>
    </PageWrapper>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useContasStore } from '@/stores/autenticacao'; 
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  const toast = useToast();

  const router = useRouter();
  
  const payload = ref({
    user: '',
    password: '',
    confirm_password: ''
  });
  
  const contasStore = useContasStore();
  
  const handleRegister = () => {
    if (!payload.value.user || !payload.value.password || !payload.value.confirm_password) {
      toast.error('Todos os campos são obrigatórios');
      return;
    }
  
    if (payload.value.password !== payload.value.confirm_password) {
      toast.error('As senhas não coincidem');
      return;
    }
    const novoUsuario = {
      usuario_id: String(contasStore.contas.length + 1),
      nome: payload.value.user,
      senha: payload.value.password
    };
  
    contasStore.addConta(novoUsuario);

    payload.value = {};
    router.push('/');
  };
  </script>
  