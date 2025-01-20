import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: "/", name: "Login", component: () => import("../pages/login/LoginView.vue") },
    { path: "/cadastro", name: "Cadastro", component: () => import("../pages/login/CreateAccountView.vue") },
    { path: "/especialidades", name: "Especialidades", component: () => import("../pages/especialidades/EspecialidadesView.vue") },
    { path: "/medicos", name: "Medicos", component: () => import("../pages/medicos/MedicosView.vue") },
    { path: "/pacientes", name: "Pacientes", component: () => import("../pages/pacientes/PacientesView.vue") },
    { path: "/consultas", name: "Consultas", component: () => import("../pages/consultas/ConsultasView.vue") }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
