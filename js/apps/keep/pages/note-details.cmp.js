export default {
    template: `
    <section class="note-details-modal">
        <p contenteditable>{{note.info.txt}}</p>
    </section>
`,
    props: ['note'],
    data() {
        return {
        };
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
    components: {}
};