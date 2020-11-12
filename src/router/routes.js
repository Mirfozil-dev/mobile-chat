import MainLayout from 'src/layouts/MainLayout.vue'
import ChatPage from 'src/pages/ChatPage.vue'
import ProfilePage from 'src/pages/ProfilePage.vue'
import AuthPage from 'src/pages/AuthPage.vue'
import UsersPage from 'src/pages/UsersPage.vue'
import Error404 from 'src/pages/Error404.vue'

const routes = [
  {
    path: '/',
    redirect: { path: '/users' },
  },
  {
    path: '/chat/:userId',
    component: MainLayout,
    children: [
      { path: '', component: ChatPage }
    ]
  },
  {
    path: '/profile',
    component: MainLayout,
    children: [
      { path: '', component: ProfilePage }
    ]
  },
  {
    path: '/auth',
    component: MainLayout,
    children: [
      { path: '', component: AuthPage }
    ]
  },
  {
    path: '/users',
    component: MainLayout,
    children: [
      { path: '', component: UsersPage }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: Error404,
  }
]

export default routes
