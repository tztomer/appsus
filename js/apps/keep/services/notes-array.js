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
            backgroundColor: "#00d"
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
        }
    }
];