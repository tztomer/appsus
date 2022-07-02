export const theNotes = {
    getTheNotes
}

function getTheNotes() {
    return notes
}

const notes = [
    {
        id: "n101",
        type: "txtNote",
        isPinned: true,
        info: {
            title: "sometime in the future",
            txt: "Fullstack Me Baby!"
        },
        style: {
            backgroundColor: 'rgb(48, 244, 244)'
        }
    },
    {
        id: "n102",
        type: "imgNote",
        info: {
            url: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2Farchive%2F8cfbcbb2919742682345681d469b7417a73e4dfe",
            title: "Yesterday's Pancake"
        },
        style: {
            backgroundColor: 'rgb(48, 244, 244)'
        }
    },
    {
        id: "n103",
        type: "todosNote",
        info: {
            label: "Get my stuff together",
            title: "Crazy Ideas",
            todos: [
                { 
                    id: "ti101",
                    txt: "Driving liscence",
                    doneAt: null
                },
                { 
                    id: "ti102",
                    txt: "Coding power",
                    doneAt: 187111111
                }]
        },
        style: {
            backgroundColor: 'rgb(48, 244, 244)'
        }
    },
    {
        id: "n104",
        type: "videoNote",
        info: {
            videoUrl: "https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1",
            title: 'watch later'
        },
        style: {
            backgroundColor: 'rgb(48, 244, 244)'
        }
    }
];