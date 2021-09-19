import { NoteEditor } from './noteEditor.js'

const noteEditor = new NoteEditor()

document.addEventListener("DOMContentLoaded", function(event) {
    let addNewNoteBtn = document.getElementById('add-note-btn')
    addNewNoteBtn.addEventListener('click', noteEditor.createForm.bind(noteEditor))
    let inputSearch = document.getElementById('search')
    inputSearch.addEventListener('keyup', noteEditor.searchTitle.bind(noteEditor))
    let filterTitle = document.getElementsByClassName('filter__title')
    filterTitle[0].addEventListener('click', noteEditor.filterTitle.bind(noteEditor))
    let filterData = document.getElementsByClassName('filter__date')
    filterData[0].addEventListener('click', noteEditor.filterData.bind(noteEditor))
});
