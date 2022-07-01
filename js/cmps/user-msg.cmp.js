import { eventBus, EVENT_CLOSE_MESSAGE } from '../services/eventBus-service.js';

export default {
  template: `
    <section class="user-msg">
    <button class="close-msg" @click="closeMsg">
    <i class="fas fa-times"></i></button>
        {{msg.txt}}
        <router-link v-if="msg.link" class="msg-link" :to="msg.link">
        {{msg.linkTxt}}
        </router-link> 
    </section>
    `,
  methods: {
    closeMsg() {
      eventBus.$emit(EVENT_CLOSE_MESSAGE);
    },
  },
  props: ['msg'],
};
