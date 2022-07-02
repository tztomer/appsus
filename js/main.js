import appHeader from './cmps/app-header.cmp.js';
import { router } from './router.js';

const options = {
  template: `
          <section class="container">
              <app-header />
            
              <router-view></router-view>
             
             
          </section>
      `,
  components: {
    appHeader,
  },
};

const app = Vue.createApp(options);
app.use(router);
app.mount('#app');
