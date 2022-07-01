export default {
  template: `
          <section>
            <h3>{{note.info.title}}</h3>
            <p>
                {{note.info.txt}}
            </p>
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