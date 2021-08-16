
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'config', component: () => import('pages/SiteConfig.vue')},
      { path: 'profile', component: () => import('pages/ProfileConfig.vue')},
      { path: 'posts', component: () => import('pages/PostsOverview.vue')},
      { path: 'posts/:postID', component: () => import ('pages/ViewPost.vue'), props: true},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
