import notePreview from "../cmps/note-preview.cmp.js";
import txtNote from "../cmps/text-note.cmp.js";
import imgNote from "../cmps/img-note.cmp.js";
import todosNote from "../cmps/todos-note.cmp.js";
import videoNote from "../cmps/video-note.cmp.js";
// import { noteService } from "../services/note.service.js";

export default {
    name: 'note-list',
    template: `
 <section class="note-list">
        <div v-for="note in notes" :key="note.id" class="note-preview-container" :style="note.style.backgroundColor ? {'background-color': note.style.backgroundColor} : {'background-color': 'rgb(48, 244, 244)'}">
            <component :is="note.type" 
                :note="note"
                @showNote="showNote"
                @deleteNote="deleteNote"
                @duplicateNote="duplicateNote"
                @colorChanged="colorChanged">
            </component>
        </div>
 </section>
`,
    props: ["notes"],
    methods: {
        showNote(noteId) {
            console.log('show note??')
            this.$router.push('/keep/' + noteId)
            this.$emit("selected", noteId)
        },
        deleteNote(noteId) {
            this.$emit("deleteNote", noteId)
        },
        duplicateNote(note) {
            this.$emit("duplicateNote", note)
        },
        colorChanged(note) {
            this.$emit("colorChanged", note)
        }
    },
    components: {
        notePreview,
        txtNote,
        imgNote,
        todosNote,
        videoNote
    },
};