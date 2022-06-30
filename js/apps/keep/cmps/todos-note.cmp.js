export default {
    template: `
          <section class="todos-note" >
            <h3 class="title">{{noteTitle}}</h3>
            <ul>
                <li v-for="listItem in noteInfo.todos">
                    {{listItem.txt}}
                </li>
            </ul>

          </section>
          `,
    props: ['noteInfo'],
    computed: {
        noteTitle() {
            if (!this.noteInfo.title) return
            return this.noteInfo.title
        },
        noteTxt() {
            if (!this.noteInfo.txt) return
            return this.noteInfo.txt
        },
        noteImg() {
            if (!this.noteInfo.url) return
            return this.noteInfo.url
        },
    }
  }