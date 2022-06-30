import emailsService from '../../../services/emails.service.js';
import { utilService } from '../../../services/util-service.js';

import emailList from '../cmps/email-list.cmp.js';
import emailsSide from '../cmps/email-side-filter.cmp.js';
import { eventBus, EVENT_EMAIL_STARRED } from '../../../services/eventBus-service.js';

export default {
  template: `
  <section class="emails-container" >


    <emails-side/>
  <main class= "emails-wrapper" >

 
    <section class="table">
      
      <email-list v-if="emailsToDisplay" :emails="emailsToDisplay"/>

      
    </section>
    
    
  </section>
  </main>

`,
  props: [],
  data() {
    return {
      emailsToDisplay: null,
      mail: null,
    };
  },

  computed: {
    timeToShow() {
      return utilService.getFormattedHour(this.email.sentAt);
    },
    dateToShow() {
      return utilService.getFormattedDate(this.email.sentAt);
    },
  },

  methods: {
    toggleStar(emailId) {
      emailsService.toggleStar(emailId);
    },
  },
  created() {
    emailsService.getEmails().then(emails => {
      this.emailsToDisplay = emails;
      console.log(emails);
    });
    eventBus.on(EVENT_EMAIL_STARRED, this.toggleStar);
  },
  unmounted() {},
  components: {
    emailList,
    emailsSide,
    eventBus,
  },
};
