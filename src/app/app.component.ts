import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NoteService } from './services/note.service';
import { MarkdownService } from './services/markdown.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notes';
  inputElement: ElementRef;
  noteText = "";
  public isSidebarVisible: Boolean = true;

  constructor(private element: ElementRef, private renderer: Renderer2, private swUpdate: SwUpdate, private noteService: NoteService, private markdownService: MarkdownService) { }

  ngAfterViewInit(): void {

    this.renderer.listen(this.element.nativeElement, 'paste', (event) => {
      navigator['clipboard'].readText().then(clipText => {
        this.noteText = clipText
      });
    });

  }


  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }


    this.markdownService.isMarkdownMode.subscribe(mode => {
      if (mode) {
        if (!this.noteService.isMobile()) {
          console.log("Changing side bar val")
          this.isSidebarVisible = false;
        }
      } else {
        this.isSidebarVisible = true;
      }
    })

    this.noteService.isSideBarVisible.subscribe((val) => {
      if (this.noteService.isMobile()) {
        this.isSidebarVisible = val;
      }
    });

    if (!this.noteService.isMobile()) {
      this.noteService.isSideBarVisible.next(true);
    } else {
      this.noteService.isSideBarVisible.next(false);
    }

  }

}
