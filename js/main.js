import appHeader from './cmps/app-header.cmp.js';
import { router } from './router.js';
import appFooter from './cmps/app-footer.cmp.js';
// import userMsg from '../js/cmps/user-msg.cmp.js';

const options = {
  template: `
          <section class="container">
              <app-header />
            
              <router-view></router-view>
              <!-- <user-msg :msg="msg" v-if="isMsgShow"></user-msg> -->
              <app-footer />
          </section>
      `,
  components: {
    appHeader,
    appFooter,
    // userMsg,
  },
};

const app = Vue.createApp(options);
app.use(router);
app.mount('#app');
