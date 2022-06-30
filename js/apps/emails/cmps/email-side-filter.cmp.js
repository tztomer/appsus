export default {
  template: `
  <section class="emails-side-filters">
      <ul class="side-filter" :class="menuClass">
          <li class="filter-item">
          <i class="filter-icon fas fa-inbox"></i>
           <span class="nav-item-name">Inbox</span> </li>

          <li  class="filter-item">
          <i class="filter-icon fas fa-star"></i>
           <span class="nav-item-name">Starred</span></li>

          <li class="filter-item">
          <i class="filter-icon fas fa-share-square"></i>
          <span class="nav-item-name">Sent Mail</span></li>

          
          <li class="filter-item">
          <i class="filter-icon fab fa-firstdraft"></i>
          <span class="nav-item-name">Drafts</span></li>

          <li class="filter-item">
          <i class="filter-icon far fa-lightbulb"></i>
           <span class="nav-item-name">Notes</span></li>
          <button @click="() => {this.$emit('menuClosed')}" 
          v-if="menuClass === 'side-menu-open'" class="close-filter-menu">
          <i class="fas fa-chevron-left"></i>
          </button>
          <progress-bar :fillWidth="barWidth"></progress-bar>
      </ul>
  </section>
  `,
  methods: {
    emitFilter(by) {
      this.$emit('filtered', by);
      this.$emit('menuClosed');
    },
  },
  computed: {
    countForDisplay() {
      const countMap = JSON.parse(JSON.stringify(this.unreadCount));
      for (const prop in countMap) {
        if (countMap[prop] === 0) countMap[prop] = '';
      }
      return countMap;
    },
    barWidth() {
      let unreadSum = 0;
      for (const prop in this.unreadCount) {
        unreadSum += this.unreadCount[prop];
      }
      return parseInt(((this.emailsCount - unreadSum) / this.emailsCount) * 100);
    },
  },
};
