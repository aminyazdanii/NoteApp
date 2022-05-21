import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

export default class App {
    constructor(root){
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers());
        this._refreshNotes();
    }

    _refreshNotes() {
        const notes = NotesAPI.getAllNotes();
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    }

    _handlers() {
        return {
            onNoteAdd() {
                console.log('note add');
            },
            onNoteEdit(newTitle,newBody) {
                console.log(newTitle,newBody);
            },
            onNoteSelect(noteId) {
                console.log(noteId);
            },
            onNoteDelete(noteId) {
                console.log(noteId);
            }
        }
    }
}


