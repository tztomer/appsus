export default {
    template: `
    <section class="note-preview">
        <p class="note-title">{{noteTitle}}</p>
        <img class="card-img" :src="noteImgUrl" alt="">
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
        }
    }
};