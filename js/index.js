import { NoteEditor } from './noteEditor'

const noteEditor = new NoteEditor()

document.addEventListener("DOMContentLoaded", function(event) {
    let addEventBtn = document.getElementById('add-event-btn')
    addEventBtn.addEventListener('click', noteEditor.addEvent.bind(noteEditor))
});