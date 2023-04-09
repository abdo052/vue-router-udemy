import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';

import App from './App.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      meta: { neesAuth: true },
      components: { default: TeamsList, footer: TeamsFooter },
      children: [
        {
          name: 'teams-members',
          path: '/teams/:teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
      beforeEnter(to, from, next) {
        // console.log('Users BeforeEnter');
        // console.log(to, from);
        next();
      },
    },
    { path: '/:notfound(.*)', component: NotFound },
  ],
  linkActiveClass: 'active',
  scrollBehavior(_, _2, savedPoston) {
    // console.log(savedPoston);
    if (savedPoston) {
      return savedPoston;
    }
    return { left: 0, top: 0 };
  },
});

router.beforeEach(function (to, from, next) {
  // console.log('Global BeforeEach');
  // console.log(to, from);
  if (to.meta.neesAuth) {
    // console.log('Need Auth');
    next();
  }
  else {
    next ();
  }
});

const app = createApp(App);

app.use(router);
app.mount('#app');
