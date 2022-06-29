import { noteService } from "../services/note.service.js";
import { eventBus } from '../../../services/eventBus-service.js';

export default {
    template: `
    <section class="note-add">
        <section class="new-note-input">
            <input v-model="noteInput" :keyup.enter="onAddNote" type="text"/>
        </section>
        <section class="note-type">
            <button class="text-type">Add Text</button>
            <button class="image-type">Add Image</button>
            <button class="video-type">Add Video</button>
            <button class="todo-type">Add Todo</button>
        </section>
    </section>
`,
    data() {
        return {
            noteInput: null
        };
    },
    created() { },
    methods: {
        onAddNote() {
            if (!this.userInput) return
            noteService.addNote(this.noteInput)
                .then(note => {
                    this.$emit('noteAdded', note)
                })
        }
    },
};