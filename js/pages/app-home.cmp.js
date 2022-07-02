import mainNav from '../cmps/main-nav.cmp.js';

export default {
  template: `
    <div class="container">

    <div class="homepage-wrapper">

    <img src="/img/homepage/header-img.webp" alt="" srcset="">
    <div class="left-side">

        <div class="header-textarea">
            <h1 >{{welcome}}</h1>
            <p>
            {{message1}} 
            {{message2}} 
            </p>
           

        </div>
    <div class="link-home-page">
        <router-link to="/email" @click.native="$emit('clicked')">
        <span>
        <i class="fas fa-envelope"></i>
    </span>
        Email
        </router-link>

        <router-link to="/keep" @click.native="$emit('clicked')" >
        <span><i class="note-icon fas fa-lightbulb"></i></span>
        Keep
        </router-link>
        <router-link to="/book" @click.native="$emit('clicked')" >
        <i class="fas fa-book"></i>
        Books
         </router-link>
         <router-link to="/about" @click.native="$emit('clicked')">
        <i class="fas fa-address-card"></i>
        About
        </router-link>

    </div>



    </div>


    </div>





    </div>
`,
  props: [],
  data() {
    return {
      welcome: 'Welcome To You Dashboard!',
      message1: `Here you can menage your apps in one place.`,
      message2: `You just one click from you favorite apps`,
    };
  },
  created() {},
  methods: {
    detailedInfoText: function (index) {
      return `${index}: ${this.data(index)}`;
    },
  },
  computed: {},
  unmounted() {},
  components: {
    mainNav,
  },
};
