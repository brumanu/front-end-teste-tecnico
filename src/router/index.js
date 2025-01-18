import { createRouter, createWebHistory } from "vue-router";

const routes = [
    // { path: "/", name: "Login", component: Login },


    { path: "/especialidades", name: "Especialidades", component: () => import("../pages/especialidades/EspecialidadesView.vue") },
    { path: "/medicos", name: "Medicos", component: () => import("../pages/medicos/MedicosView.vue") },
    // { path: "/pacientes", name: "Pacientes", component: () => import("PacientesView") },
    // { path: "/consultas", name: "Consultas", component: () => import("ConsultasView") }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
