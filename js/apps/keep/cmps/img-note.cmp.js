import colorPicker from "../cmps/color-picker.cmp.js";
export default {
    template: `

          <section class="img-note" @click="showNote">
            <h3>{{noteTitle}}</h3>
            <p>
                {{noteTxt}}
            </p>
            <img :src="noteImg" alt="">

          </section>
          <section @mouseover="hover = true" @mouseleave="hover = false, colorPicker = false" class="note-action" :class="{active: hover}">
                <div @click="onPinNote(note.id)" class="add-btn"><i class="fas fa-thumbtack"></i></div>
                <div @click="onNoteColorPick(note)" class="add-btn">
                <label>
                    <color-picker @changeNoteBackground="changeNoteBackground" v-if="colorPicker"/>
                    <i class="fas fa-palette"></i>
                </label>
                </div>
                <div @click="onSendNote(note)" class="add-btn"><i class="fas fa-envelope"></i></div>
                <div @click="onDuplicateNote" class="add-btn"><i class="fas fa-clone"></i></div>
                <div @click="onTrashNote(note.id)" class="add-btn"><i class="fas fa-trash-alt"></i></div>
            </section>
          `,
    props: ['note'],
    emits: ['click', 'deleteNote', 'showNote', 'duplicateNote', 'colorChanged'],
    data() {
        return {
            hover: false,
            colorPicker: false,
        }
    },
    computed: {
        noteTitle() {
            return this.note.info.title
        },
        noteTxt() {
            return this.note.info.txt
        },
        noteImg() {
            return this.note.info.url
        },
    },
    methods: {
        onPinNote(noteId) {
            console.log('noteId', noteId)
        },
        onNoteColorPick(noteId) {
            console.log('noteId', noteId)
            this.colorPicker = true
        },
        onTrashNote(noteId) {
            this.$emit('deleteNote', noteId)
        },
        onSendNote(note) {
            console.log('note', note)
            
        },
        onDuplicateNote() {
            console.log('this.note', this.note)
            
            this.$emit('duplicateNote', this.note)
        },
        showNote(){
            console.log('noteId', this.note.id)
            this.$emit('showNote', this.note.id)
        },
        changeNoteBackground(color) {
            const note = this.note
            note.style.backgroundColor = color
            this.$emit('colorChanged', note)
        }
    },
    components: {
        colorPicker,
    },
  }