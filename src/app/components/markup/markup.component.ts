import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, HostListener } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog, MatSnackBar } from "@angular/material";
import { MarkdownService } from "src/app/services/markdown.service";
import { TOOLBAR, SAMPLE } from "src/app/constants/app-constants";
import { OPTION } from "src/app/constants/app-constants";
import { HttpClient } from "@angular/common/http";
import { IndexedDB } from "ng-indexed-db";
import { interval } from "rxjs";

@Component({
  selector: "app-markup",
  templateUrl: "./markup.component.html",
  styleUrls: ["./markup.component.css"]
})
export class MarkupComponent implements OnInit {
  options = OPTION;
  markupCtrl = new FormControl();
  @ViewChild("markupPad", { static: false }) markupPad: ElementRef;

  @ViewChild('scrollRaw', { static: true }) scrollRaw: ElementRef;
  @ViewChild('scrollMarkup', { static: true }) scrollMarkup: ElementRef;
  markdownMode: Boolean = true;
  action = {
    text: 50,
    markup: 50
  };
  markdownData;
  currentMarkdown = null;
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private markDownService: MarkdownService,
    private indexedDbService: IndexedDB
  ) { }

  //Hack to change markdown on empty/dynamic insertion
  triggerMarkdownChange() {
    this.markdownData = `
`
  }


  updateScroll() {
    const scrollOne = this.scrollRaw.nativeElement as HTMLElement;
    const scrollTwo = this.scrollMarkup.nativeElement as HTMLElement;

    console.log(scrollOne)
    console.log(scrollTwo)
    // do logic and set
    scrollTwo.scrollLeft = scrollOne.scrollLeft;
  }

  appendMarkdownChange() {
    const markdownCopy = (' ' + this.markdownData).slice(1);
    this.triggerMarkdownChange();
    this.markdownData = markdownCopy;
    const escapeEvent: any = document.createEvent('CustomEvent');
    escapeEvent.which = 27;
    escapeEvent.initEvent('keypress', true, true);
    document.getElementById("mArea").dispatchEvent(escapeEvent);
    // this.markdownData = `${this.markdownData}
    // `
  }
  textAreaEmpty() {
    if (this.markdownData.length == 0) {
      this.triggerMarkdownChange();
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    localStorage.setItem("recentItem", this.currentMarkdown.id);
  }

  saveFile() {
    interval(200).subscribe(_ => {
      if (this.currentMarkdown) {
        localStorage.setItem("recentItem", this.currentMarkdown.id);
        this.indexedDbService
          .update("markdown_store", {
            title: this.currentMarkdown.title,
            id: this.currentMarkdown.id,
            data: this.markdownData
          })
          .subscribe(response => { }, error => { });
      } else {
        localStorage.setItem("tempMarkdown", this.markdownData);
      }
    });
  }

  loadRecent() {
    const id = localStorage.getItem("recentItem");
    if (id) {
      this.indexedDbService.list("markdown_store").subscribe(res => {
        for (const markdown of res) {
          if (markdown.id == id) {
            this.currentMarkdown = markdown;
            this.markDownService.markdownFromLocalStorage.next(markdown);
          }
        }
      });
    } else {
      this.markdownData = localStorage.getItem("tempMarkdown") || SAMPLE;
    }
  }

  ngOnInit() {
    this.listenToToolbarEvents();
    this.emojiAdded();
    this.clipboardListener();
    this.downloadListener();
    this.saveListener();
    this.metaListener();
    this.loadMarkdownListener();
    this.newMarkdownListener();
    this.saveFile();
    this.loadRecent();
  }

  newMarkdownListener() {
    this.markDownService.newMarkdown.subscribe(newFile => {
      if (newFile) {
        localStorage.removeItem("recentItem");
        this.currentMarkdown = null;
        this.triggerMarkdownChange();

      }
    });
  }

  loadMarkdownListener() {
    this.markDownService.loadMarkdown.subscribe(markdown => {
      if (markdown) {

        this.markdownData = markdown.data;
        this.currentMarkdown = markdown;

      }
    });
  }

  metaListener() {
    this.markDownService.metaAdded.subscribe(val => {
      if (val && val.hasOwnProperty("type") && val.type != "text") {
        const imageDiv =
          TOOLBAR[val.type].startTag.replace(
            "enter description here",
            val.description
          ) +
          val.link +
          TOOLBAR[val.type].endTag;
        this.insertAtCaret(imageDiv);
      } else if (val && val.hasOwnProperty("type") && val.type == "text") {
        this.insertAtCaret((val as any).descr);
      }
    });
  }

  saveMarkup(fileName) {
    this.indexedDbService
      .create("markdown_store", { title: fileName, data: this.markdownData })
      .subscribe(
        response => {
          this.snackBar.open("Markdown Saved !! 💾", " ", {
            duration: 1000
          });
        },
        error => {
          this.snackBar.open("Error Occured while saving markdown !! 🛑", " ", {
            duration: 1000
          });
        }
      );
  }

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
    let element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  replaceSelectedText(startTag, endTag) {
    let sel;
    let range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel && sel.anchorNode.parentElement.id != "splitMain") {
        return;
      }
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        const selectedContent = sel.toString();
        range.deleteContents();
        let replaceDiv = startTag + selectedContent;
        if (endTag) {
          replaceDiv = replaceDiv + endTag;
        }
        document.execCommand("insertText", false, replaceDiv);
      }
    } else if (
      (document as any).selection &&
      (document as any).selection.createRange
    ) {
      range = (document as any).selection.createRange();
      range.text = startTag;
    }
  }

  emojiAdded() {
    this.markDownService.emojiAdded.subscribe(emoji => {
      if (emoji) {
        this.insertAtCaret(emoji);
      }
    });
  }

  listenToToolbarEvents() {
    this.markDownService.optionChanged.subscribe(value => {
      if (value) {
        this.replaceSelectedText(
          TOOLBAR[value].startTag,
          TOOLBAR[value].endTag
        );
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
        this.saveMarkup(this.markDownService.saveMarkdown.getValue());
      }
    });
  }

  insertAtCaret(text) {
    if (text) {
      const txtarea = document.getElementById("mArea");
      if (!txtarea) {
        return;
      }

      let scrollPos = txtarea.scrollTop;
      let strPos = 0;
      let br =
        (txtarea as any).selectionStart ||
          (txtarea as any).selectionStart == "0"
          ? "ff"
          : (document as any).selection
            ? "ie"
            : false;
      if (br == "ie") {
        txtarea.focus();
        let range = (document as any).selection.createRange();
        range.moveStart("character", -(txtarea as any).value.length);
        strPos = range.text.length;
      } else if (br == "ff") {
        strPos = (txtarea as any).selectionStart;
      }

      let front = (txtarea as any).value.substring(0, strPos);
      let back = (txtarea as any).value.substring(
        strPos,
        (txtarea as any).value.length
      );
      this.markdownData = front + text + back;
      strPos = strPos + text.length;
      if (br == "ie") {
        txtarea.focus();
        let ieRange = (document as any).selection.createRange();
        ieRange.moveStart("character", -(txtarea as any).value.length);
        ieRange.moveStart("character", strPos);
        ieRange.moveEnd("character", 0);
        ieRange.select();
      } else if (br == "ff") {
        (txtarea as any).selectionStart = strPos;
        (txtarea as any).selectionEnd = strPos;
        txtarea.focus();
      }

      txtarea.scrollTop = scrollPos;

    }


  }
}
