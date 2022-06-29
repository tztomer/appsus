export default {
  props: ['email'],
  template: `
<section class="email-list">

<div class="cell">{{email.from}}</div>
  
      
 
</section>
`,
  data() {
    return {
      db: '',
    };
  },
  created() {},
  methods: {},
  computed: {},
  unmounted() {},
  components: {},
};
