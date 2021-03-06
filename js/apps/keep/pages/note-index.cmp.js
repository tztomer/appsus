import { noteService } from "../services/note.service.js";
import noteAdd from '../cmps/note-add.js'
import noteDetails from "../pages/note-details.cmp.js";
import noteList from "..//cmps/note-list.cmp.js";

export default {
    name: 'noteIndexCmp',
    template: `
      <div class="screen" :class="{selectedNoteId:selectedNoteId}" @click="onSaveNote"></div>
      <note-details v-if="selectedNoteId" @note="putNoteInData" :noteId="selectedNoteId"/>
    <section class="note-index">
        <note-add @noteAdded="addNote"/>
        <note-list :notes="notesForDisplay" @selected="onSelectNote" @colorChanged="colorChanged" @duplicateNote="duplicateNote" @deleteNote="deleteNote"/>
    </section>
`,
    data() {
        return {
            notes: null,
            selectedNoteId: null,
            note: null
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
            this.selectedNoteId = noteId
        },
        onSaveNote() {
            if (!this.note) {
                this.$router.push('/keep')
                this.selectedNoteId = null
            } else {
                noteService.saveNote(this.note)
                    .then(note => {
                        this.selectedNoteId = null
                        this.$router.push('/keep')
                        noteService.query()
                            .then(notes => {
                                this.notes = notes
                            })
                    })
            }
        },
        putNoteInData(note) {
            this.note = note
        },
        colorChanged(note) {
            noteService.saveNote(note)
                .then(note => {
                    noteService.query()
                        .then(notes => {
                            this.notes = notes
                        })

                })
        },
        duplicateNote(note) {
            noteService.duplicateNote(note)
                .then(note => {
                    noteService.query()
                        .then(notes => {
                            this.notes = notes
                        })
                })
        },
        deleteNote(noteId) {
            noteService.remove(noteId)
                .then(() => {
                    noteService.query()
                        .then(notes => {
                            this.notes = notes
                        })
                })
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