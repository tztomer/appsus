import { utilService } from '../../../services/util-service.js';
import longText from '../../../cmps/long-text.cmp.js';
import { eventBus } from '../../../services/eventBus-service.js';

export default {
  props: ['email'],
  template: `
    <section v-if="email" class="email-preview"
    :class="emailClass">
        <button @click.stop="emitToggle" :class="starClass" class="star-btn">
    </button>
    
        <span class="email-preview-from" :style="nameColor">
        {{fromName}}</span>
      
        <div class="email-preview-content">
        <span class="email-preview-subject">
        {{email.subject}}
        </span> 
         -  
       
        <long-text class="email-preview-body" 
        :txt="email.body" length="60">
        </long-text>
    </div>
        
    <span class="email-sent-at">{{hourToShow}}</span>


       
    </section>
    `,
  data() {
    return {
      starred: false,
    };
  },
  methods: {
    emitToggle() {
      eventBus.emit('toggle-starred', { id: this.email.id });
    },
  },
  computed: {
    emailClass() {
      return this.email.isRead ? 'email-read' : 'email-unread';
    },
    hourToShow() {
      const emailDate = new Date(this.email.sentAt);
      const today = new Date();
      if (today.setHours(0, 0, 0, 0) == emailDate.setHours(0, 0, 0, 0)) return moment(this.email.sentAt).format('LT');
      else return utilService.getFormattedDate(this.email.sentAt);
    },
    fromName() {
      const letter = this.email.from.slice(0, 1).toUpperCase();
      return window.innerWidth <= 750 ? letter : this.email.from;
    },
    nameColor() {
      let color = utilService.getRandomColor();
      return { background: color };
    },
    starClass() {
      return this.email.boxes.star ? 'fas fa-star starred' : 'far fa-star';
    },
  },
  components: {
    longText,
  },
};
