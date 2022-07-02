import { eventBus } from '../../../services/eventBus-service.js';
// , EVENT_MESSAGE
export default {
  name: 'email nav',
  props: ['email'],
  template: `
    <section class="email-menu">
        <button class="reply" @click="changeEmail('reply-email')">
        <i class="menu-icon fas fa-reply"></i><span class="menu-item-txt">Reply</span></button>

        
        <button class="unread" 
        @click="emitUpdateEmail('updated-email')">
        <i class="menu-icon fas fa-envelope"></i>Mark as unread</button>

        <button class="remove" @click="changeEmail('remove-email')">
         <i class="menu-icon fas fa-trash"></i>Remove</button>
    </section>
    `,
  methods: {
    changeEmail(eventName) {
      eventBus.emit(eventName, { id: this.email.id });
      this.$emit('clicked');
    },
    emitUpdateEmail(eventName) {
      let email = this.email
      email.isRead = false
      eventBus.emit(eventName, { email });
      this.$emit('clicked');
      this.$emit('emailUnread');
    },
  },
};
// 'isRead', false
