export default {
    template: `
          <section class="img-note" >
            <h3>{{noteTitle}}</h3>
            <p>
                {{noteTxt}}
            </p>
            <img :src="noteImg" alt="">

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
        }
    }
  }