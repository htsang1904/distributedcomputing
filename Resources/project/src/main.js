import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import '@/assets/main.scss'
import imgURL from './helper/imgURL';

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.filter('imgURL', imgURL)

router.beforeEach((to, from, next) => {
  const userData = JSON.parse(localStorage.getItem("user"))
  const token = userData.token
  if (to.meta) {
      if (to.meta.auth && !token) {
          next('/login');
          return;
      }
  }
  next();
});

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
