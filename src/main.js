import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router';
import TodoList from './components/TodoList';

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(VueRouter);

const routes = [
  { path: '/todo/in-progress', component: TodoList },
  { path: '/todo/completed', component: TodoList },
  { path: '/todo', redirect: '/todo/in-progress' },
  { path: '*', redirect: '/todo' },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
