import { noteService } from "../services/note.service.js";
import { eventBus } from '../../../services/eventBus-service.js';

export default {
    template: `
    <section class="note-add">
        <div class="note-add-div">
            <section class="new-note-input">
                <input @keyup.enter="onAddNote" v-model="userInput" :placeholder="textHolder" class="add-note-input" size="50" type="txt"/>
            </section>
            <section class="note-type">
                <div :class="{'chosen-btn':txtNote}" @click="txtNoteChosen" class="add-btn"><i class="far fa-comment"></i></div>
                <div :class="{'chosen-btn':imgNote}" @click="imgNoteChosen" class="add-btn"><i class="far fa-image"></i></div>
                <div :class="{'chosen-btn':videoNote}" @click="videoNoteChosen" class="add-btn"><i class="fab fa-youtube"></i></div>
                <div :class="{'chosen-btn':todosNote}" @click="todosNoteChosen" class="add-btn"><i class="fas fa-list-ul"></i></div>
            </section>
        </div>
    </section>
`,
    data() {
        return {
            txtNote: true,
            imgNote: null,
            videoNote: null,
            todosNote: null,
            userInput: null,
        };
    },
    created() { },
    methods: {
        onAddNote() {
            const input = this.userInput
            if (!input) return
            let noteType
            if (this.txtNote) noteType = 'txtNote'
            else if (this.imgNote) noteType = 'imgNote'
            else if (this.videoNote) noteType = 'videoNote'
            else if (this.todosNote) noteType = 'todosNote'
            const newNote = noteService.getEmptyNote(noteType)
            if (this.txtNote) newNote.info.txt = input
            else if (this.imgNote) newNote.info.url = input
            else if (this.videoNote) {
                const videoId = input.slice(input.length - 11)
                console.log('VideoId', videoId)
                newNote.info.videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`
            }
            else if (this.todosNote) {
                const array = input.split(', ')
                const x = array.map(todo => {
                    const y = noteService.getEmptyTodo()
                    y.txt = todo
                    return y
                })
                newNote.info.todos = x
            } 
            noteService.saveNote(newNote)
                .then(note => {
                    this.$emit('noteAdded', note)
                })
            this.userInput = ''
        },
        txtNoteChosen() {
            this.txtNote = true
            this.imgNote = null
            this.videoNote = null
            this.todosNote = null
        },
        imgNoteChosen() {
            this.txtNote = null
            this.imgNote = true
            this.videoNote = null
            this.todosNote = null
        },
        videoNoteChosen() {
            this.txtNote = null
            this.imgNote = null
            this.videoNote = true
            this.todosNote = null
        },
        todosNoteChosen() {
            this.txtNote = null
            this.imgNote = null
            this.videoNote = null
            this.todosNote = true
        },
    },
    computed: {
        textHolder() {
            if (this.txtNote) return `What's on your mind?`
            else if (this.imgNote) return 'place image URL here'
            else if (this.videoNote) return 'place youtube URL here'
            else if (this.todosNote) return `put some todo's here separated by a comma + space`
        }
    }

};