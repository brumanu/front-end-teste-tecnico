# Front-End Teste Técnico

Este projeto foi desenvolvido como parte de um teste técnico de front-end. Ele apresenta uma interface interativa construída com tecnologias modernas para atender aos requisitos propostos.

## Tecnologias Utilizadas

- **Vue 3**: Framework JavaScript para construção da interface.
- **Pinia**: Biblioteca para gerenciamento de estado.
- **Element Plus**: Biblioteca de componentes UI.
- **Vite**: Ferramenta de build para desenvolvimento rápido.
- **Day.js**: Biblioteca para manipulação de datas.
- **Vue Toastification**: Biblioteca para exibição de notificações.

## Funcionalidades Principais

- Autenticação de usuários (login e logout).
- Gerenciamento de consultas médicas:
  - Cadastro de pacientes e médicos.
  - Filtragem dinâmica de médicos com base na idade do paciente.
  - Agendamento e atualização de consultas.
- Sistema de navegação baseado em autenticação (Navbar exibida somente para usuários logados).

## Estrutura do Projeto

```plaintext
src/
├── assets/           # Arquivos estáticos
├── components/       # Componentes reutilizáveis
├── composables/      # Funções reutilizáveis (ex: validação de formulários)
├── router/           # Configuração de rotas
├── stores/           # Gerenciamento de estado (Pinia)
├── utils/            # Funções utilitárias (ex: formatação de datas)
├── views/            # Páginas principais da aplicação
└── App.vue           # Componente raiz
```

## Como Rodar o Projeto Localmente

### Pré-requisitos

- Node.js (versão 16 ou superior)
- Gerenciador de pacotes npm ou yarn

### Passos

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento**:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse o projeto**:

   Abra o navegador e acesse `http://localhost:5173`.

## Testes

Para executar os testes (se aplicável):

```bash
npm run test
# ou
yarn test
```



