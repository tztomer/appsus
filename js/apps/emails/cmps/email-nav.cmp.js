import { eventBus } from '../../../services/eventBus-service.js';
// , EVENT_MESSAGE
export default {
  name: 'email nav',
  props: ['emailId'],
  template: `
    <section class="email-menu">
        <button class="reply" @click="changeEmail('reply-email')">
        <i class="menu-icon fas fa-reply"></i><span class="menu-item-txt">Reply</span></button>

        <button class="unread" 
        @click="emitUpdateEmail('updated-email', 'isRead', false)">
        <i class="menu-icon fas fa-envelope"></i>Mark as unread</button>

        <button class="remove" @click="changeEmail('remove-email')">
         <i class="menu-icon fas fa-trash"></i>Remove</button>
    </section>
    `,
  methods: {
    changeEmail(eventName) {
      console.log('event name', eventName);
      eventBus.emit(eventName, { id: this.emailId });
      this.emit('clicked');
    },
    emitUpdateEmail(eventName, prop, val) {
      let emailId = this.emailId;
      eventBus.emit(eventName, { prop, val, emailId });
      this.$emit('clicked');
      this.$emit('emailUnread');
    },
  },
};
