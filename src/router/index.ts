import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CombineScoresView from '../views/score/ScorePage.vue'
import LogoutView from '../views/LogoutView.vue'
import PicksView from '../views/picks/PicksPage.vue'
import PlayersView from '../views/players/PlayersPage.vue'
import TeamsView from '../views/team/TeamsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView
  },
  {
    path: '/picks',
    name: 'picks',
    component: PicksView
  },
  {
    path: '/teams',
    name: 'team',
    component: TeamsView
  },
  {
    path: '/players',
    name: 'player',
    component: PlayersView
  },
  {
    path: '/scores',
    name: 'combineScores',
    component: CombineScoresView
  },
  {
    path: '/editTeam',
    component: () => import('views/team/EditTeamPage.vue')
  },
  {
    path: '/editPlayer',
    component: () => import('views/player/EditPlayerPage.vue')
  },
  {
    path: '/editPick',
    component: () => import('views/pick/EditPickPage.vue')
  },
  {
    path: '/editScore',
    component: () => import('views/score/EditScorePage.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: 'about' */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
