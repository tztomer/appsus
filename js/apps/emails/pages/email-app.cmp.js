import { eventBus, EVENT_EMAIL_REPLY } from '../../../services/eventBus-service.js';
import { emailService } from '../../../services/emails.service.js';
import emailList from '../cmps/email-list.cmp.js';
import emailCompose from '../../emails/cmps/email-compose.cmp.js';
import searchBar from '../../../cmps/search-bar.cmp.js';
import emailSideFilter from '../cmps/email-side-filter.cmp.js';

export default {
  name: 'email app',
  template: `
    <section class="email-app container" v-if="emails">
        
        <div class="search-bar-container">
            <search-bar @filtered="setFilter" :searchData="searchData">
            </search-bar>
        </div>
      


        <section class="main-content">
            <button @click="isMenuOpen = !isMenuOpen" class="hamburger"><i class="fas fa-bars"></i></button>

            <aside class="side-menu side-container">
                <button @click.prevent="composeEmail"
                class="compose-btn">
                <img src="./img/logo/cop.png" alt="" srcset="">
                </button>

                <email-side-filter @filtered="setSideFilter" 
                :menuClass="menuClass"
                @menuClosed="isMenuOpen = false"
                :emailsCount="emails.length"
                :unreadCount="unreadCount">
                </email-side-filter>
            </aside>

        <div class="email-lists-wrapper">

          <transition name="fade">
      <email-compose :isReply="isReply"
       @emailCreated="isCompose = false"
        v-if="isCompose"></email-compose>
      </transition>
          <email-list v-if ="emails"
          :emails="emailsToDisplay"
          @updated="updateEmail"/>

        </div>    

            <button @click="composeEmail" class="mobile-compose">
            <i class="fas fa-paper-plane"></i></button>
        </section>
        
        

    </section>
    `,
  data() {
    return {
      emails: null,
      filterBy: {
        txt: '',
        readUnread: 'All',
        sideFilter: 'inbox',
      },
      isCompose: false,
      isReply: false,
      unreadCount: null,
      searchData: {
        placeholder: 'Search mail',
        selectOptions: ['All', 'Read', 'Unread'],
      },
      isMenuOpen: false,
    };
  },
  methods: {
    // getUpdatedEmails() {
    //   emailService.getEmails().then(emails => {
    //     this.emails = emails;
    //     console.log(emails);
    //   });
    // },
    composeEmail() {
      if (this.isCompose) return;
      this.isCompose = true;
    },
    setSideFilter(by) {
      this.filterBy.sideFilter = by;
    },
    setFilter(filterBy) {
      this.filterBy.txt = filterBy.txt;
      this.filterBy.readUnread = filterBy.selectedOption;
    },
    removeEmail(emailId) {
      console.log('removed email', emailId.id);
      emailService.removeEmail(emailId.id).then(fromName => {
        if (this.$route.path !== '/email') this.$router.push('/email');

        emailService.getEmails().then(emails => {
          this.emails = emails;
          console.log(emails);
        });
      });
    },
    updateEmail(email) {
      if (typeof 'string') return;
      console.log('email update', email);
      emailService.updateEmail().then(emails => {
        this.emails = emails;
      });
    },

    replyToEmail(emailId) {
      console.log('replay to email', emailId);
      this.$router.push('/email/reply/' + emailId.id);
    },
    replyCompose(isReply) {
      if (isReply) {
        this.isCompose = true;
        this.isReply = true;
      } else this.isReply = false;
    },
    countUnread() {
      // This is not computed because of vue reactive
      this.unreadCount = this.emails.reduce((acc, email) => {
        const boxes = email.boxes;
        for (const prop in boxes) {
          if (acc[prop] === undefined) acc[prop] = 0;
          if (boxes[prop] && !email.isRead) acc[prop]++;
        }
        return acc;
      }, {});
    },
    toggleStar(email) {
      // done
      emailService.toggleStar(email.id);
      emailService.getEmails().then(emails => {
        this.emails = emails;
      });
    },
  },
  computed: {
    emailsToDisplay() {
      if (!this.filterBy) return this.emails;
      const filteredEmails = this.emails.filter(email => {
        const txt = this.filterBy.txt.toLowerCase();
        const subject = email.subject.toLowerCase();
        const body = email.body.toLowerCase();
        const fromName = email.from.toLowerCase();

        return (subject.includes(txt) || body.includes(txt) || fromName.includes(txt)) && email.boxes[this.filterBy.sideFilter];
      });

      if (this.filterBy.readUnread === 'All') return filteredEmails;
      else {
        const isRead = this.filterBy.readUnread === 'Read';
        return filteredEmails.filter(email => {
          return email.isRead === isRead;
        });
      }
    },
    menuClass() {
      return this.isMenuOpen ? 'side-menu-open' : '';
    },
  },
  watch: {
    emails: {
      handler() {
        this.countUnread();
      },
      deep: true,
    },
    '$route.path'(newVal, oldVal) {
      if (newVal.includes('reply')) this.replyCompose(true);
      else this.replyCompose(false);
    },
  },
  components: {
    emailList,
    emailCompose,
    emailSideFilter,
    searchBar,
  },
  created() {
    if (this.$route.path.includes('reply')) this.replyCompose(true);
    else this.replyCompose(false);

    emailService.getEmails().then(emails => {
      this.emails = emails;
      console.log('get emails from created emails', emails);
      this.countUnread();
    });

    //Listen to the eventBus
    eventBus.on('remove-email', this.removeEmail);
    eventBus.on('updated-email', this.updateEmail);
    eventBus.on('reply-email', this.replyToEmail);
    eventBus.on('toggle-starred', this.toggleStar);
  },
};
