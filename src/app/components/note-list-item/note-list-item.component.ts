import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/models/note.model';
import { FormattedNote } from 'src/app/models/formatted-note.model';

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.css']
})
export class NoteListItemComponent implements OnInit {

  formattedNotes: FormattedNote[] = [];
  currentNoteId: string;
  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.getNotes();
    this.noteService.currentNote.subscribe(note => {
      if (note) {
        this.currentNoteId = note.id;
      }
    })
    this.noteService.notesList.subscribe(noteList => {
      this.splitOnLineBreak(noteList);
    })
  }

  splitOnLineBreak(notes: Note[]) {
    this.formattedNotes = []
    const removeTags = (item) => item.replace(/<(.|\n)*?>/g, '').replace(/&nbsp;/gi, '');

    if (notes) {
      notes.map(note => {
        if (note && note.hasOwnProperty("text")) {
          const noteLines = note.text.split("<div");
          const [firstLine, remainingLines] = noteLines;

          const individualNote: FormattedNote = {
            firstLine: firstLine ? removeTags(firstLine) : null,
            nextLines: remainingLines ? removeTags(remainingLines) : null,
            id: note.id
          }
          this.formattedNotes.push(individualNote);
        }
      });
    }

  }

  changeNote(id: string) {
    if (this.noteService.isMobile()) {
      this.noteService.isSideBarVisible.next(false);
    }
    this.noteService.changeNote(id);

  }

}
