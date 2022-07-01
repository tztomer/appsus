import { utilService } from '../../../services/util-service.js';
import { theNotes } from "../services/notes-array.js";
import { storageService } from '../../../services/async-storage-service.js';

const NOTES_KEY = 'notes'

_createNotes()

export const noteService = {
    query,
    get,
    saveNote,
    getEmptyTodo
}


function query() {
    return storageService.query(NOTES_KEY)
}


function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function saveNote(note) {
    if (note.id) return storageService.put(NOTES_KEY, note)
    else return storageService.post(NOTES_KEY, note)
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        notes = theNotes.getTheNotes()
        utilService.saveToStorage(NOTES_KEY, notes)
    }
}

function getEmptyTodo() {
    return {
        id: utilService.makeId(),
        txt: '',
        doneAt: null,
    }
}