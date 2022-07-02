import { noteService } from "../services/note.service.js";
import { utilService } from '../../../services/util-service.js';

// :action="formSubmit"
// @blur="formSubmit"
//  <button @click="onRemoveTodo">X</button>
// @change="saveNote"
//        saveNote() {
//    this.$emit('note', this.note) }
// @keyup.enter="event => onAddTodoInput(event, index)"
// width="640" height="360"

export default {
    template: `
    <section class="note-details-modal">
    <!-- <pre>{{note}}</pre> -->
        <div contenteditable="true" v-if="note" class="title-box" style="width: 300px;" @input="event => onTitleInput(event)">{{note.info.title}}</div>
        <div contenteditable="true" v-if="noteTypeTxt" class="text-box" @input="event => onTextInput(event)" @keyup.enter="event => onAddNewLine(event)">{{note.info.txt}}</div>
        <img v-if="noteTypeImg" :src="note.info.url" class="note-details-img" alt="">
        <section v-if="noteTypeTodos" class="todo-list" >
            <div class="todo-item" v-for="(todo, index) in note.info.todos">
                <div contenteditable="true" class="todo-text" @blur="event => onTodoInput(event, index)" @keydown.enter.prevent="event => onTodoInput(event, index)">{{todo.txt}}</div>
                <button @click="onDeleteTodo(index)">X</button>
            </div>
            <div class="last-todo-item">
                <div contenteditable="true" class="last-todo-text" @keydown.enter.prevent="event => onTodoInput(event, index)" @blur="event => onTodoInput(event, index)"></div>
            </div>
        </section>
        <section v-if="noteTypeImg" class="noteImgExplanation">
            <span>Enter/change image URL:</span> <a target="_blank" href="https://www.wikihow.com/Get-the-URL-for-Pictures">How?</a>
        </section>
        <section v-if="noteTypeImg" class="url-edit">
            <div contenteditable="true" class="img-text" @input="event => onUrlInput(event)">{{note.info.url}}</div>
        </section>
        <section v-if="noteTypeVideo" class="youtube-section">
            <iframe id="ytplayer" type="text/html" :src="note.info.videoUrl" frameborder="0"></iframe>
            <br><span>Enter a different Youtube URL:</span>
            <div contenteditable="true" aria-label="youtube URL" class="video-text" @blur="event => onVideoUrlInput(event)"></div>
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
            noteTypeVideo: null,
            noteTitle: null,
        };
    },
    created() {
        const noteId = this.noteId
        noteService.get(noteId)
            .then(note => {
                const noteType = note.type
                this.note = note
                if (noteType === 'txtNote') this.noteTypeTxt = noteType
                if (noteType === 'imgNote') this.noteTypeImg = noteType
                if (noteType === 'todosNote') this.noteTypeTodos = noteType
                if (noteType === 'videoNote') this.noteTypeVideo = noteType
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
            const value = event.target.innerText
            console.log('index', index)
            console.log('value', value)
            console.log('event.keyCode', event.keyCode)
            if (!index && index !== 0) {
                console.log('check');
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
        onDeleteTodo(index) {
            this.note.info.todos.splice(index, 1)
            this.$emit('note', this.note)
        },
        onUrlInput(event) {
            const value = event.target.innerText
            this.note.info.url = value
            this.$emit('note', this.note)
        },
        onVideoUrlInput(event) {
            const value = event.target.innerText
            const videoId = value.slice(value.length - 11)
            console.log('VideoId', videoId)

            this.note.info.videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`
            this.$emit('note', this.note)
        },
        onAddNewLine(event) {
            const value = event.target.innerText
            this.note.info.text = value + '\n'
            this.$emit('note', this.note)
        },
    },
};
