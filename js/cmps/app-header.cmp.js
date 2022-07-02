import mainNav from './main-nav.cmp.js';
import { eventBus } from '../services/eventBus-service.js';

export default {
  template: `
    <section class="main-header">

        <router-link to="/">
            <img src="img/logo/logo.png" alt="logo" class="logo-img"  />
        </router-link>
        
            <div class="menu-icon-container fas fa-bars" :class="{ active: isMenuOpen }" id="menuIcon" @click="isMenuOpen = !isMenuOpen">
</div>
     
    </section>
    <main-nav id="menu" v-if="isMenuOpen">
                </main-nav>
    `,
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    documentClick(ev) {
      console.log('ev', ev);
      if (ev.target.id !== 'menu' && ev.target.id !== 'menuIcon') this.isMenuOpen = false;
    },
    openMenu(ev) {
      ev.target;
    },
  },
  watch: {
    '$route.path'() {
      this.isMenuOpen = false;
    },
  },
  components: {
    mainNav,
  },
  created() {
    document.addEventListener('click', this.documentClick); //For closing menu on doc click
  },
};
