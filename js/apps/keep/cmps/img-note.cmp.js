export default {
    template: `
          <section class="img-note" >
            <h3>{{noteTitle}}</h3>
            <p>
                {{noteTxt}}
            </p>
            <img :src="noteImg" alt="">

          </section>
          <section @mouseover="hover = true" @mouseleave="hover = false" class="note-action" :class="{active: hover}">
                <div @click="onPinNote(note.id)" class="add-btn"><i class="fas fa-thumbtack"></i></div>
                <div @click="onNoteColorPick(note.id)" class="add-btn"><i class="fas fa-palette"></i></div>
                <div @click="onSendNote(note)" class="add-btn"><i class="fas fa-envelope"></i></div>
                <div @click="onDuplicateNote(note)" class="add-btn"><i class="fas fa-clone"></i></div>
                <div @click="onTrashNote(note)" class="add-btn"><i class="fas fa-trash-alt"></i></div>
            </section>
          `,
    props: ['note'],
    emits: ['click'],
    data() {
        return {
            hover: false
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
        }
    },
    methods: {
        onPinNote(noteId) {
            console.log('noteId', noteId)
            
        },
        onNoteColorPick(noteId) {
            console.log('noteId', noteId)
        },
        onTrashNote(note) {
            console.log('note', note)
        },
        onSendNote(note) {
            console.log('note', note)
            
        },
        onDuplicateNote(note) {
            console.log('note', note)
            
        }
    },
  }