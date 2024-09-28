// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        children: [
          {
            path: '/categoria/:nome/:id',
            component: () => import('@/layouts/default/Categoria.vue'),
            name: 'Categoria',
            props: true,
          }
        ]
      }
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/default/Default.vue'),
    meta: {
      title: "Admin",
      requirestAuth: true
    },
    children:[
      {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/Admin.vue'),
        meta: {
          title: "Admin",
          requirestAuth: true
        },
        children:[
          {
            path: '/admin/categorias',
            name: 'Categorias',
            component: () => import('@/layouts/default/admin/Categorias.vue'),
            meta: {
              title: "categorias",
              requirestAuth: true
            },
          },
          {
            path: '/admin/produtos',
            name: 'Produtos',
            component: () => import('@/layouts/default/admin/Produtos.vue'),
            meta: {
              title: "Produtos",
              requirestAuth: true
            },
          }
        ]
      }
    ]
  },
  {
    path: '/*', // Captura todas as rotas desconhecidas
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'), // Componente da página de erro
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// Função para verificar se o usuário está autenticado
function isAuthenticated() {
  const userStore = useUserStore();
  return userStore.isAuthenticated; // Supondo que o estado do Pinia contenha a verificação de autenticação
}

router.beforeEach(async (to, from, next) => {
  // Verifica se a rota atual requer autenticação
  if (to.meta.requirestAuth && !isAuthenticated()) {
    // Se não estiver autenticado, redireciona para a Home
    return next({ name: 'Home' });
  }

  next(); // Permite a navegação se a autenticação não for necessária
});


export default router
