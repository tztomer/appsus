import colorPicker from "../cmps/color-picker.cmp.js";

export default {
  template: `
          <section @click="onShowNote" class="text-note">
            <h3>{{note.info.title}}</h3>
            <p>
                {{note.info.txt}}
            </p>
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
                <div @click="onDuplicateNote(note)" class="add-btn"><i class="fas fa-clone"></i></div>
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
    onDuplicateNote(note) {
      this.$emit('duplicateNote', note)
    },
    onShowNote() {
      console.log('noteId', this.note.id)

      this.$emit('showNote', this.note.id)
    },
    changeNoteBackground(color) {
      this.note.style.backgroundColor = color
      this.$emit('colorChanged', this.note)
    }
  },
  components: {
    colorPicker,
  },
}