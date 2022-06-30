import emailPreview from './email-preview.cmp.js';

export default {
  props: ['emails'],
  template: `


<section class="email-list">
        <div v-for="email in emails" class="email-previews">
            <email-preview
            :email="email" 
            :key="email.id"
            @click="selectEmail(email.id, email.isRead)">
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
    selectEmail(emailId, isRead) {
      if (this.selectedEmailId === emailId) {
        this.selectedEmailId = null;
        return;
      }
      this.selectedEmailId = emailId;
      // Filter by UNREAD? be 'read' only after the route change again
      if (this.$route.params.filter === '+unread') {
        this.emailsToBeRead.push(emailId);
        return;
      }
      // Make the email read
      if (!isRead) this.$emit('updated', 'isRead', true, emailId);
    },
    emitWaitingEmails() {
      this.emailsToBeRead.forEach(emailId => {
        this.$emit('updated', 'isRead', true, emailId);
      });
      this.emailsToBeRead = [];
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
  computed: {},
  unmounted() {},
  components: {
    emailPreview,
  },
};
