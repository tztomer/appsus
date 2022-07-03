import emailNav from '../../emails/cmps/email-nav.cmp.js';
import longText from '../../../cmps/long-text.cmp.js';

export default {
  template: `
<section class="email-extended">
    <div class="extended-header">
        <div class="extended-subject">
            {{email.subject}}
        </div>

        <div class="menu-container">

            <transition name="fade">
            <email-nav class="extended-menu"
            :email="email" v-if="isMenuOpen"
            @clicked="isMenuOpen = false"
            @emailUnread="() => {this.$emit('emailUnread')}">
            </email-nav>
            </transition>

            <button @click="isMenuOpen = !isMenuOpen" class="dots-vertical">
            <i class="fas fa-ellipsis-h"></i>
            </button>

            <router-link class="full-page-btn" :to="'email/'+email.id">
            <i class="fas fa-expand"></i></router-link>
        </div>
    </div>
        
     
        <div class="extended-from-name">
            {{email.from}}
            <span class="email-address">{{emailAddress}}</span>
        </div>
        <div class="extended-body">
      <p>  {{email.body}}</p>
    </div>
</section>
    `,
  data() {
    return {
      isMenuOpen: false,
    };
  },
  computed: {
    emailAddress() {
      const name = this.email.from.toLowerCase();
      return `<${name}@gmail.com>`;
    },
  },
  components: {
    emailNav,
    longText,
  },
  props: ['email'],
};
