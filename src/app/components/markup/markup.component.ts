import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';
import { MatDialog } from '@angular/material';
import { MarkdownService } from 'src/app/services/markdown.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/internal/operators';
import { of } from 'rxjs';
import { TOOLBAR } from 'src/app/constants/app-constants';
import { OPTION } from 'src/app/constants/app-constants';

@Component({
  selector: 'app-markup',
  templateUrl: './markup.component.html',
  styleUrls: ['./markup.component.css']
})
export class MarkupComponent implements OnInit {
  options = OPTION;
  markupCtrl = new FormControl();
  @ViewChild('markupPad', { static: false }) markupPad: ElementRef;
  markdownMode: Boolean = true;
  action = {
    text: 50,
    markup: 50
  }
  markdownData = "Markupdata";

  constructor(private noteService: NoteService, private dialog: MatDialog, private markDownService: MarkdownService) { }


  replaceSelectedText(startTag, endTag) {
    let sel, range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        const selectedContent = sel.toString();
        range.deleteContents();
        let replaceDiv = startTag + selectedContent;
        if (endTag) {
          replaceDiv = replaceDiv + endTag
        }

        range.insertNode(document.createTextNode(replaceDiv));
      }
    } else if ((document as any).selection && (document as any).selection.createRange) {
      range = (document as any).selection.createRange();
      range.text = startTag;
      console.log("b")
    }
  }




  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }
  convertNewLine = (str, isXhtml = false) => {
    const isTable = (str) => {
      const pattern = /((\|[^|\r\n]*)+\|(\r?\n|\r)?)+/
      if (str.match(pattern)) {
        console.log("matched")
        return true;
      } else {
        // No match.
        console.log("no match")
        return false;
      }
    }
    console.log("Check isTable")
    console.log(isTable(str))
    console.log(str)
    if (str.indexOf("```") === -1 && !isTable(str)) {
      const breakTag = isXhtml ? '<br />' : '<br>';
      return String(str).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    }
    return str;
  }


  ngOnInit() {
    this.markupCtrl.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(value => {
          if (this.markupPad.nativeElement.innerText.length != 0) {
            this.markdownData = this.convertNewLine(this.markupPad.nativeElement.innerText);
          }
          return of(null);
        })
      )
      .subscribe();

    this.markDownService.optionChanged.subscribe(value => {
      console.log("Value Changed")
      console.log(value)
      if (value) {
        console.log("Toolbar Value for")
        console.log(value)
        console.log(TOOLBAR[value])
        this.replaceSelectedText(TOOLBAR[value].startTag, TOOLBAR[value].endTag)
      }
    })
  }

}
