import emailPreview from './email-preview.cmp.js';

export default {
  props: ['emails'],
  template: `
<section class="email-list">

  <div v-for="mail in emails" class="email-wrapper preview">

  <email-preview :email="mail"/>
  

  </div> 
      
 
</section>
`,
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {},
  unmounted() {},
  components: {
    emailPreview,
  },
};
