export default {
    template: `
    <section class="note-preview">
        <p class="note-title">{{noteTitle}}</p>
        <img class="card-img" :src="noteImgUrl" alt="">
        <iframe id="ytplayer" type="text/html"
            :src="note.info.videoUrl"
            frameborder="0"></iframe>
        <p class="note-text">{{noteText}}</p>
    </section>
`,
    props: ["note"],
    computed: {
        noteImgUrl() {
            return this.note.info.url
        },
        noteTitle() {
            return this.note.info.title
        },
        noteText() {
            return this.note.info.txt
        },
        videoNote() {
            return this.note.info.videoUrl
        }
    }
};