import { noteService } from "../services/note.service.js";

export default {
    template: `
    <section class="note-details-modal">
        <p>note details</p>
        <pre>{{note}}</pre>
        <form class="note-edit-form" :action="formSubmit">
            <input v-if="note" type="text" v-model="note.info.title" placeholder="title" style="width: 300px;" />
            <textarea v-if="noteTypeTxt" name="note-text-edit" cols="30" rows="10" v-model="note.info.txt"></textarea>
            <img v-if="noteTypeImg" :src="note.info.url" alt="">
            <section v-if="noteTypeTodos" class="todo-list" >
                <div class="todo-item" v-for="todo in note.info.todos">
                    <input type="text" class="todo-text" v-model="todo.txt"/>
                    <button @click="onRemoveTodo(todo.id)">X</button>
                </div>
            </section>
            <section v-if="noteTypeImg" class="url-edit">
                <textarea cols="30" rows="6" v-model="note.info.url"></textarea>
            </section>
        </form>
    </section>
`,
    props: ['noteId'],
    data() {
        return {
            note: null,
            noteTypeTxt: null,
            noteTypeImg: null,
            noteTypeTodos: null
        };
    },
    created() {
        console.log(this.noteId);
        noteService.get(this.noteId)
            .then(note => {
                console.log('note', note)
                const noteType = note.type
                this.note = note
                if (noteType === 'txtNote') this.noteTypeTxt = noteType
                if (noteType === 'imgNote') this.noteTypeImg = noteType
                if (noteType === 'todosNote') this.noteTypeTodos = noteType
            })
    },
    methods: {
        formSubmit() {
            console.log('form submitted');
        },
        onRemoveTodo(todoId) {
            console.log('todoId', todoId)
        }
    }
};