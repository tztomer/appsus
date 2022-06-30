import notePreview from "../cmps/note-preview.cmp.js";
import txtNote from "../cmps/text-note.cmp.js";
import imgNote from "../cmps/img-note.cmp.js";
import todosNote from "../cmps/todos-note.cmp.js";


export default {
    name: 'note-list',
    template: `
 <section class="note-list">
        <div v-for="note in notes" :key="note.id" class="note-preview-container">
            <component :is="note.type" 
                :noteInfo="note.info"
                @click="showNote(note.id)">
            </component>
        </div>
 </section>
`,
    props: ["notes"],
    methods: {
        showNote(noteId) {
            this.$router.push('/keep/' + noteId)
            this.$emit("selected", noteId)
        }
    },
    components: {
        notePreview,
        txtNote,
        imgNote,
        todosNote,
      },
};