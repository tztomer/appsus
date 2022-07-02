export default {
    template: `
    <section class="color-picker sb10">
        <div @click="changeToRed" class="red-color"></div>
        <div @click="changeToGreen" class="green-color"></div>
        <div @click="changeToWhite" class="white-color"></div>
        <div @click="changeToPink" class="pink-color"></div>
        <div @click="changeToYellow" class="yellow-color"></div>
        <div @click="changeToLightBlue" class="light-blue-color"></div>
    </section>
`,
    methods: {
        changeToRed() {
            this.$emit('changeNoteBackground', 'red')
        },
        changeToGreen() {
            this.$emit('changeNoteBackground', 'rgb(89, 177, 62)')
        },
        changeToWhite() {
            this.$emit('changeNoteBackground', 'rgb(216, 216, 216)')
        },
        changeToPink() {
            this.$emit('changeNoteBackground', 'rgb(249, 13, 241)')
        },
        changeToYellow() {
            this.$emit('changeNoteBackground', 'rgb(251, 248, 25)')
        },
        changeToLightBlue() {
            this.$emit('changeNoteBackground', 'rgb(25, 183, 251)')
        },
    },
};