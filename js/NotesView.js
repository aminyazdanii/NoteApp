export default class NotesView {
    constructor(root, handlers) {
    this.root = root;
    const { onNoteAdd , onNoteEdit , onNoteSelect , onNoteDelete } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.onNoteDelete = onNoteDelete;
    this.root.innerHTML = `
        <div class="notes__sidebar">
        <div class="notes__logo">NOTE APP</div>
        <div class="notes__list">
            <div class="notes__list-item">
                <div class="notes__small-title">New Note</div>
                <div class="notes_small-body">this is my first note</div>
                <div class="notes__small-updated">Monday 1:30pm</div>
            </div>
        </div>
        <button class="notes__add">ADD NOTE</button>
        </div>
        <div class="notes__preview">
        <input type="text" class="notes__title" placeholder="note title">
        <textarea name="" class="notes__body">take some note</textarea>
        </div>`;
    const addNoteBtn = this.root.querySelector('.notes__add');
    const inputTitle = this.root.querySelector('.notes__title');
    const inputBody = this.root.querySelector('.notes__body');
        addNoteBtn.addEventListener('click' ,() => {
            this.onNoteAdd();
        });
        [inputTitle,inputBody].forEach(inputField => {
            inputField.addEventListener('blur',()=>{
                const newBody = inputBody.value.trim(); 
                const newTitle = inputTitle.value.trim();
                this.onNoteEdit(newTitle,newBody);

            })
        })
    }
    
    _createListItemHTML(id, title, body, updated) {
        const maxBodyLength = 50;
        return  `
            <div class="notes__list-item" data-note-id='${id}'>
                <div class='notes__item-header'>
                <div class="notes__small-title">${title}</div>
                <span class='notes__list-trash' data-note-id='${id}'>
                    <i class="far fa-trash-alt"></i>
                </span>
                </div>
                <div class="notes_small-body">
                ${body.substring(0, maxBodyLength)}
                ${body.length > maxBodyLength ? '...' : ''}
                </div>
                <div class="notes__small-updated">
                ${new Date(updated)
                    .toLocaleString('en',{
                        dateStyle:'full',
                        timeStyle:'short'
                    })}
                </div>
            </div>
        `
    }

    updateNoteList(notes) {
        const notesContainer = this.root.querySelector('.notes__list');
        notesContainer.innerHTML = '';
        let notesList = '';
        for (note of notes) {
            const {id,title,body,updated} = note;
            const html = this._createListItemHTML(id, title , body , updated);
            notesList += html;
        }
        notesContainer.innerHTML = notesList;
        notesContainer.querySelectorAll('.notes__list-item').forEach((noteItem) => {
            noteItem.addEventListener('click',()=>{
                this.onNoteSelect(noteItem.dataset.noteId);
            })
        })

        notesContainer.querySelectorAll('.notes__list-trash').forEach((item)=>{
            item.addEventListener('click',(e)=> {
                e.stopPropagation();
                this.onNoteDelete(item.dataset.noteId)
            })
        })
    }
}