import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private noteService: NoteService) { }

  ngOnInit() {

  }

  newNote() {
    if (this.noteService.isMobile) {
      this.noteService.isSideBarVisible.next(false);
      this.noteService.newNote();
    }
  }

}
