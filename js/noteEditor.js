export class NoteEditor {
    constructor() {
        this.noteEditorBlock = document.getElementById('note-events')
        let notes = JSON.parse(localStorage.getItem('notes'))
        this.noteItems = notes !== null ? notes : []
        this.init(this.noteItems)
        this.bindSaveNote = this.saveNote.bind(this)
    }

    init(noteItems) {
        this.createNoteHtml(noteItems)
        localStorage.setItem('notes', JSON.stringify(noteItems))
    }

    createNoteHtml(noteItems) {
        let notesContainer = document.createElement('div')
        notesContainer.className = 'notes'

        noteItems.forEach((itemNote) => {
            let noteBlock = document.createElement('div')
            noteBlock.className = 'item'
            noteBlock.setAttribute('data-note-id', itemNote.id)
            noteBlock.innerText = itemNote.title
            noteBlock.addEventListener('click', this.editNote.bind(this))

            notesContainer.appendChild(noteBlock)
            notesContainer.appendChild(noteBlock)

        })

        this.noteEditorBlock.innerText = ''
        this.noteEditorBlock.appendChild(notesContainer)
    }

    saveNote(e) {
        e.preventDefault()
        let titleNodeElement = document.getElementById('title')
        let descriptionNodeElement = document.getElementById('description')
        this.noteItems = JSON.parse(localStorage.getItem('notes'))

        let newDate = new Date()

        let newNote = {
            id: Date.now(),
            date: newDate.toLocaleString(),
            title: titleNodeElement.value,
            description: descriptionNodeElement.value
        }

        titleNodeElement.value = ''
        descriptionNodeElement.value = ''

        this.noteItems.push(newNote)
        this.init(this.noteItems)
    }

    editNote(e) {
        let noteId = e.currentTarget.getAttribute('data-note-id')
        let notes = JSON.parse(localStorage.getItem('notes'))
        this.noteItems = notes !== null ? notes : []
        let editNote = this.noteItems.filter((note) => {
            if (note.id === +noteId) {
                return true
            }
        }).shift()

        this.removeForm()
        this.createForm()

        let inputTitle = document.getElementById('title')
        inputTitle.value = editNote.title
        let descriptionTextarea = document.getElementById('description')
        descriptionTextarea.value = editNote.description
        let removeBtn = document.getElementById('remove-btn')
        removeBtn.setAttribute('data-note-id', editNote.id)
        removeBtn.removeEventListener('click', this.removeForm)
        removeBtn.addEventListener('click', this.removeNote.bind(this))
        let saveBtn = document.getElementById('save-btn')
        saveBtn.setAttribute('data-note-id', editNote.id)
        saveBtn.addEventListener('click', this.saveChangedNote.bind(this))
        saveBtn.removeEventListener('click', this.bindSaveNote)

    }

    saveChangedNote(e) {
        let noteId = e.currentTarget.getAttribute('data-note-id')
        let notes = JSON.parse(localStorage.getItem('notes'))
        let titleNodeElement = document.getElementById('title')
        let descriptionNodeElement = document.getElementById('description')
        this.noteItems = notes.map((note) => {
            if (note.id === +noteId) {
                note.title = titleNodeElement.value
                note.description =  descriptionNodeElement.value
            }
            return note
        })

        localStorage.setItem('notes', JSON.stringify(this.noteItems))
        this.init(this.noteItems)
        this.removeForm()
    }

    createForm() {
        let form = document.getElementsByClassName('block-right__block')
        if (form.length !== 0) {
            return
        }
        let rightBlockForm = document.createElement('div')
        rightBlockForm.className = 'block-right__block'
        let removeBtn = document.createElement('span')
        removeBtn.className = 'icon-delete'
        removeBtn.id = 'remove-btn'
        removeBtn.addEventListener('click', this.removeForm)
        let titleBlock = document.createElement('div')
        titleBlock.className = 'title-block'
        let titleLabel = document.createElement('label')
        titleLabel.innerText = 'Title'
        titleLabel.setAttribute('for','title')
        let titleInput = document.createElement('input')
        titleInput.setAttribute('type','text')
        titleInput.id = 'title'
        titleInput.name = 'title'
        titleInput.value = ''

        titleBlock.appendChild(titleLabel)
        titleBlock.appendChild(titleInput)

        rightBlockForm.appendChild(removeBtn)
        rightBlockForm.appendChild(titleBlock)

        let blockRight = document.getElementById('block-right')
        blockRight.appendChild(rightBlockForm)

        let descriptionBlock = document.createElement('div')
        descriptionBlock.className = 'description-block'
        let descriptionLabel = document.createElement('label')
        descriptionLabel.innerText = 'Description'
        descriptionLabel.setAttribute('for', 'title')
        let descriptionTextarea = document.createElement('textarea')
        descriptionTextarea.name = 'description'
        descriptionTextarea.id = 'description'
        descriptionTextarea.rows = 5
        descriptionTextarea.cols = 25
        descriptionTextarea.value = ''

        descriptionBlock.appendChild(descriptionLabel)
        descriptionBlock.appendChild(descriptionTextarea)
        titleBlock.appendChild(descriptionBlock)

        let submitBtnElement = document.createElement('div')
        submitBtnElement.className = 'submit-btn'
        let saveBtn = document.createElement('button')
        saveBtn.className = 'save-btn'
        saveBtn.id = 'save-btn'
        saveBtn.innerText = 'Save'
        saveBtn.addEventListener('click', this.bindSaveNote)
        submitBtnElement.appendChild(saveBtn)
        descriptionBlock.appendChild(submitBtnElement)
    }

    removeForm() {
        let formBlock = document.getElementById('block-right')
        formBlock.innerText = ''
    }

    removeNote(e) {
        let noteId = e.currentTarget.getAttribute('data-note-id')
        let notes = JSON.parse(localStorage.getItem('notes'))

        this.noteItems = notes.filter((note) => {
            if (note.id !== +noteId) {
                return true
            }
        })

        localStorage.setItem('notes', JSON.stringify(this.noteItems))
        this.init(this.noteItems)
        this.removeForm()
    }

    searchTitle() {
        let inputSearch = document.getElementById('search')
        let searchValue = inputSearch.value
        let notes = JSON.parse(localStorage.getItem('notes'))
        this.noteItems = notes.filter((note) => {
            if (note.title.indexOf(searchValue) !== -1) {
                return true
            }
        })

        this.createNoteHtml(this.noteItems)
    }

    SortTitleAsc(x, y){
        if (x.title < y.title) {return -1;}
        if (x.title > y.title) {return 1;}
        return 0;
    }

    SortTitleDesc(x, y){
        if (x.title > y.title) {return -1;}
        if (x.title < y.title) {return 1;}
        return 0;
    }

    filterTitle(e) {
        let sortType = e.currentTarget.getAttribute('data-sort')
        let notes = JSON.parse(localStorage.getItem('notes'))
        if (sortType === 'asc') {
            this.noteItems = notes.sort(this.SortTitleAsc)
            e.currentTarget.setAttribute('data-sort', 'desc')
        }
        if (sortType === 'desc') {
            this.noteItems = notes.sort(this.SortTitleDesc)
            e.currentTarget.setAttribute('data-sort', 'asc')
        }
        this.createNoteHtml(this.noteItems)

    }

    SortDataAsc(x, y){
        if (x.id < y.id) {return -1;}
        if (x.id > y.id) {return 1;}
        return 0;
    }

    SortDataDesc(x, y){
        if (x.id > y.id) {return -1;}
        if (x.id < y.id) {return 1;}
        return 0;
    }

    filterData(e) {
        let sortType = e.currentTarget.getAttribute('data-sort')
        let notes = JSON.parse(localStorage.getItem('notes'))
        if (sortType === 'asc') {
            this.noteItems = notes.sort(this.SortDataAsc)
            e.currentTarget.setAttribute('data-sort', 'desc')
        }
        if (sortType === 'desc') {
            this.noteItems = notes.sort(this.SortDataDesc)
            e.currentTarget.setAttribute('data-sort', 'asc')
        }

        this.createNoteHtml(this.noteItems)
    }

}