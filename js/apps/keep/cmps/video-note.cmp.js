export default {
    template: `
          <section class="video-note" >
            <h3>{{noteTitle}}</h3>
            <iframe id="ytplayer" type="text/html"
            :src="note.info.videoUrl"
            frameborder="0"></iframe>
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
        noteVideo() {
            return this.note.info.videoUrl
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