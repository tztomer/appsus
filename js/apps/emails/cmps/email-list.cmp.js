import emailPreview from '../cmps/email-preview.cmp.js';
import emailExtended from '../cmps/email-extended.cmp.js';
import { emailService } from '../../../services/emails.service.js';

export default {
  props: ['emails'],
  template: `
    <section class="email-list">
        <div v-for="email in emails" class="email-previews">
            <email-preview
            :email="email" 
            :key="email.id"
            @click.native="selectEmail(email)">
            </email-preview>

            <email-extended
            @emailUnread="selectedEmailId = null"
            v-if="selectedEmailId === email.id"
            :email="email">
            </email-extended>
        </div>
    </section>
    `,
  data() {
    return {
      selectedEmailId: null,
      emailsToBeRead: [],
    };
  },
  methods: {
    selectEmail(email) {
      email.isRead = true;
      emailService.updateEmail(email).then(email => {
        emailService.getEmails().then(emails => {
          this.emailsToBeRead = emails;
          this.$emit('updated', emails);
          console.log('success!, this.emailsToBeRead', this.emailsToBeRead);
        });
      });

      if (this.selectedEmailId === email.id) {
        this.selectedEmailId = null;
        return;
      }
      this.selectedEmailId = email.id;
      // Filter by UNREAD? be 'read' only after the route change again
      if (this.$route.params.filter === '+unread') {
        this.emailsToBeRead.push(email.id);
        return;
      }
      // Make the email read
      // if (!email.isRead) this.$emit('updated', 'isRead', true, emailId);
    },
    emitWaitingEmails() {
      this.emailsToBeRead.forEach(emailId => {
        this.$emit('updated', 'isRead', true, emailId);
      });
      this.emailsToBeRead = [];
      console.log('$route.params after', this.$route.params);
    },
  },
  watch: {
    emails: {
      handler(newVal, oldVal) {
        if (!oldVal === null) this.selectedEmailId = null;
        this.emitWaitingEmails();
      },
      deep: true,
    },
    '$route.params.filter'(newVal, oldVal) {
      if (oldVal === '+unread') {
        this.emitWaitingEmails();
      }
    },
  },
  components: {
    emailPreview,
    emailExtended,
  },
};
