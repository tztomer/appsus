import { noteService } from "../services/note.service.js";
import { utilService } from '../../../services/util-service.js';

// :action="formSubmit"
// @blur="formSubmit"
//  <button @click="onRemoveTodo">X</button>
// @change="saveNote"
//        saveNote() {
//    this.$emit('note', this.note) }

export default {
    template: `
    <section class="note-details-modal">
    <!-- <pre>{{note}}</pre> -->
        <div contenteditable="true" v-if="note" class="title-box" style="width: 300px;" @input="event => onTitleInput(event)">{{note.info.title}}</div>
        <div contenteditable="true" v-if="noteTypeTxt" class="text-box" @input="event => onTextInput(event)" @keyup.enter="event => onAddNewLine(event)">{{note.info.txt}}</div>
        <img v-if="noteTypeImg" :src="note.info.url" class="note-details-img" alt="">
        <section v-if="noteTypeTodos" class="todo-list" >
            <div class="todo-item" v-for="(todo, index) in note.info.todos">
                <div contenteditable="true" class="todo-text" @input="event => onTodoInput(event, index)">{{todo.txt}}</div>
            </div>
            <div class="todo-item">
                <div contenteditable="true" class="last-todo-text"  @keyup.enter="event => onTodoInput(event, index)" @blur="event => onTodoInput(event, index)"></div>
            </div>
        </section>
        <section v-if="noteTypeImg" class="noteImgExplanation">
            <span>Enter/change image URL:</span> <a target="_blank" href="https://www.wikihow.com/Get-the-URL-for-Pictures">How?</a>
        </section>
        <section v-if="noteTypeImg" class="url-edit">
            <div contenteditable="true" class="img-text" @input="event => onUrlInput(event)">{{note.info.url}}</div>
        </section>
    </section>
`,
    props: ['noteId'],
    data() {
        return {
            note: null,
            noteTypeTxt: null,
            noteTypeImg: null,
            noteTypeTodos: null,
            noteTitle: null,
        };
    },
    created() {
        const noteId = this.noteId
        console.log('noteId', noteId)
        noteService.get(noteId)
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
        },
        blurClicked() {
            console.log('blur clicked!');
        },
        onTitleInput(event) {
            const value = event.target.innerText
            this.note.info.title = value
            this.$emit('note', this.note)
        },
        onTextInput(event) {
            const value = event.target.innerText
            this.note.info.txt = value
            this.$emit('note', this.note)
        },
        onTodoInput(event, index) {
            console.log('index', index)
            const value = event.target.innerText
            if (!index) {
                if (!value) return
                this.note.info.todos.push({
                    id: utilService.makeId(),
                    txt: value,
                    doneAt: null
                })
                event.target.innerText = ''
            } else {
                this.note.info.todos[index].txt = value
            }
            this.$emit('note', this.note)
        },
        onUrlInput(event) {
            const value = event.target.innerText
            this.note.info.url = value
            this.$emit('note', this.note)
        },
        onAddNewLine(event) {
            const value = event.target.innerText
            this.note.info.text = value + '\n'
            this.$emit('note', this.note)
        },
    },
};