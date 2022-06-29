import emailsService from '../../../services/emails.service.js';
import { utilService } from '../../../services/util-service.js';

import emailList from '../cmps/email-list.cmp.js';

export default {
  template: `
  <section>Hello Emails</section>

  <div class="emails-container table">
    
    <email-list v-if="emailsToDisplay" :emails="emailsToDisplay"/>
  
  </div>




`,
  props: [],
  data() {
    return {
      emailsToDisplay: null,
      mail: null,
    };
  },
  created() {
    emailsService.getEmails().then(emails => {
      this.emailsToDisplay = emails;
      console.log(emails);
    });
  },
  methods: {},
  computed: {
    timeToShow() {
      return utilService.getFormattedHour(this.email.sentAt);
    },
    dateToShow() {
      return utilService.getFormattedDate(this.email.sentAt);
    },
  },
  unmounted() {},
  components: {
    emailList,
  },
};
