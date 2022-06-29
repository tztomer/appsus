import notePreview from "../cmps/note-preview.cmp.js";

export default {
    template: `
 <section class="note-list">
    <ul>
        <li v-for="(note, idx) in notes" :key="note.id" class="note-preview-container">
            <note-preview :note="note"/>
            <button>
                <router-link :to="'/keep/'+note.id">Details</router-link>
            </button> 
        </li>
    </ul>
 </section>
`,
    props: ["notes"],
    methods: {
        select(note) {
            this.$emit("selected", note)
        }
    },
    components: {
        notePreview,
      },
};