import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MarkdownService } from 'src/app/services/markdown.service';
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

  constructor(private dialog: MatDialog, private markDownService: MarkdownService) { }


  replaceSelectedText(startTag, endTag) {
    let sel;
    let range;
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
        document.execCommand('insertText', false, replaceDiv);
      }
    } else if ((document as any).selection && (document as any).selection.createRange) {
      range = (document as any).selection.createRange();
      range.text = startTag;
    }
  }


  emojiAdded() {
    this.markDownService.emojiAdded.subscribe(emoji => {
      console.log("Emoji " + emoji);
      this.markdownData += emoji;
    })
  }

  listenToToolbarEvents() {
    this.markDownService.optionChanged.subscribe(value => {
      if (value) {
        this.replaceSelectedText(TOOLBAR[value].startTag, TOOLBAR[value].endTag);
      }
    });
  }

  ngOnInit() {
    this.listenToToolbarEvents();
    this.emojiAdded();

  }

}
