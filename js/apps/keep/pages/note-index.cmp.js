import { noteService } from "../services/note.service.js";
import noteAdd from '../cmps/note-add.js'
import noteDetails from "../pages/note-details.cmp.js";
import noteList from "..//cmps/note-list.cmp.js";

export default {
    template: `
      <div class = "screen" :class="{selectedNote:selectedNote}" @click="selectedNote = null"></div>
    <section class="note-index">
        <note-add @noteAdded="addNote"/>
        <note-details v-if="selectedNote" :book="selectedNote"/>
        <note-list :notes="notesForDisplay" @selected="onSelectNote"/>
    </section>
`,
    data() {
        return {
            notes: null,
            selectedNote: null,
        };
    },
    created() {
        noteService.query()
            .then(notes => this.notes = notes)
     },
    methods: {
        addNote() {
            bookService.query()
                .then(notes => this.notes = notes)
        },
        onSelectNote(note) {
            this.selectedNote = note
        }
    },
    computed: {
        notesForDisplay() {
            return this.notes
        }
    },
    unmounted() { },
    components: {
        noteAdd,
        noteList,
        noteDetails,
    }
};