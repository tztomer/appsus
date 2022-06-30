import { utilService } from '../../../services/util-service.js';
import { eventBus, EVENT_EMAIL_STARRED } from '../../../services/eventBus-service.js';
export default {
  props: ['email'],
  template: `
 <section v-if="email" class="email-preview">


<button @click="emitToggle" class="star-btn">
        <i :class="starClass"></i>
    
    </button>
<div class="email-row from cell">{{email.from}}</div>
<div class="email-row sub-body cell"><p>{{email.subject}}</p></div>
<div class="email-row msg-body cell"><p>{{email.body}}</p></div>
<span class="email-row date-row cell">{{hourToShow}}</span>
</section>
      
 

`,
  data() {
    return {};
  },
  created() {},
  methods: {
    emitToggle() {
      eventBus.emit(EVENT_EMAIL_STARRED, this.email.id);
    },
  },
  computed: {
    hourToShow() {
      const emailDate = new Date(this.email.sentAt);
      const today = new Date();
      if (today.setHours(0, 0, 0, 0) == emailDate.setHours(0, 0, 0, 0)) return moment(this.email.sentAt).format('LT');
      else return utilService.getFormattedDateShort(this.email.sentAt);
    },
    starClass() {
      return this.email.boxes.star ? 'fas fa-star starred' : 'far fa-star';
    },
  },
  unmounted() {},
  components: {},
};
