import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { MarkdownService } from 'src/app/services/markdown.service';
import { TOOLBAR, SAMPLE } from 'src/app/constants/app-constants';
import { OPTION } from 'src/app/constants/app-constants';
import { HttpClient } from '@angular/common/http';
import { IndexedDB } from 'ng-indexed-db';

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
  markdownData = SAMPLE;

  saveMarkup() {
    this.indexedDbService.create('markdown_store', { title: 'todo name', data: this.markdownData }).subscribe(
      response => { console.log(response) },
      error => { console.log(error) }
    );
  }

  insertAtCursor(myField, myValue) {
    //IE support
    if ((document as any).selection) {
      myField.focus();
      let sel = (document as any).selection.createRange();
      sel.text = myValue;
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
      myField.value = myField.value.substring(0, startPos)
        + myValue
        + myField.value.substring(endPos, myField.value.length);
    } else {
      myField.value += myValue;
    }
  }

  constructor(private snackBar: MatSnackBar,
    private dialog: MatDialog, private markDownService: MarkdownService, private indexedDbService: IndexedDB) { }

  copyMarkDown() {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = this.markdownData;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);

    this.snackBar.open("Markdown Copied to Clipboard 📋", " ", {
      duration: 1000
    });
  }

  download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }



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

  clipboardListener() {
    this.markDownService.copyMarkdown.subscribe(value => {
      if (value) {
        this.copyMarkDown();
      }
    });
  }


  downloadListener() {
    this.markDownService.downloadMarkdown.subscribe(value => {
      if (value) {
        this.download("README.md", this.markdownData);
      }
    });
  }

  saveListener() {
    this.markDownService.saveMarkdown.subscribe(value => {
      if (value) {
        this.saveMarkup();
      }
    });
  }

  ngOnInit() {
    this.listenToToolbarEvents();
    this.emojiAdded();
    this.clipboardListener();
    this.downloadListener();
    this.saveListener();
  }

}
