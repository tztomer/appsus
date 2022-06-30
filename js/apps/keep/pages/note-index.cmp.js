import { noteService } from "../services/note.service.js";
import noteAdd from '../cmps/note-add.js'
import noteDetails from "../pages/note-details.cmp.js";
import noteList from "..//cmps/note-list.cmp.js";

export default {
    template: `
      <div class="screen" :class="{selectedNoteId:selectedNoteId}" @click="selectedNoteId = null"></div>
    <section class="note-index">
        <note-add @noteAdded="addNote"/>
        <note-list :notes="notesForDisplay" @selected="onSelectNote"/>
    </section>
`,
    data() {
        return {
            notes: null,
            selectedNoteId: null,
        };
    },
    created() {
        noteService.query()
            .then(notes => this.notes = notes)
     },
    methods: {
        addNote() {
            noteService.query()
                .then(notes => this.notes = notes)
        },
        onSelectNote(noteId) {
            this.selectedNote = noteId
        }
    },
    computed: {
        notesForDisplay() {
            return this.notes
        }
    },
    components: {
        noteAdd,
        noteList,
        noteDetails,
    }
};