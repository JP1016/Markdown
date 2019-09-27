import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  public currentNote: BehaviorSubject<Note> = new BehaviorSubject<Note>(null);
  public notesList: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>(null);
  public isSideBarVisible: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor() { }

  isMobile() {
    var isMobile = (/iphone|ipod|android|ie|blackberry|fennec/).test
      (navigator.userAgent.toLowerCase());
    return isMobile;
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  saveNote(noteContent: Note) {
    this.setNote(noteContent);
  }

  deleteNote(id: string) {
    const notes: Note[] = (this.getNotes()) as Note[] || []
    let indexToSplice;
    if (notes && notes.length !== 0) {
      for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === id) {
          indexToSplice = i;
        }
      }
    }
    notes.splice(indexToSplice, 1);

    localStorage.setItem("notes", JSON.stringify(notes));
    this.getNotes();
  }

  getNotes() {
    const noteJSON = localStorage.getItem("notes");
    const noteListFromJSON = JSON.parse(noteJSON);
    this.notesList.next(noteListFromJSON);
    return noteListFromJSON;
  }

  setNote(note: Note) {
    if (note) {
      let freshNote: boolean = true;
      const notes: Note[] = (this.getNotes()) as Note[] || []

      if (notes && notes.length !== 0) {
        for (let i = 0; i < notes.length; i++) {
          if (notes[i].id === note.id) {
            notes[i] = note;
            freshNote = false;
          }
        }
      }

      if (freshNote) {
        notes.push(note)
      }

      localStorage.setItem("notes", JSON.stringify(notes));

      this.getNotes(); //Refresh the note from localstorage and update sidebar
    }
  }


  changeNote(id: string) {
    const notes: Note[] = (this.getNotes()) as Note[];
    for (const note of notes) {
      if (note.id === id) {
        this.currentNote.next(note);
      }
    }
  }

  newNote(text = null) {
    const note: Note = {
      id: this.uuidv4(),
      text: text ? text : "",
      timestamp: new Date().toString()
    };
    this.currentNote.next(note);
  }


}
