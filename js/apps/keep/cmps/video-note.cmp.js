export default {
    template: `
          <section class="video-note" >
            <h3>{{noteTitle}}</h3>
            <iframe id="ytplayer" type="text/html"
            :src="noteInfo.videoUrl"
            frameborder="0"></iframe>
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
        noteVideo() {
            if (!this.noteInfo.videoUrl) return
            return this.noteInfo.videoUrl
        }
    }
  }