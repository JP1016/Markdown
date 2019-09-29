import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
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
  markdownMode: Boolean = true;
  action = {
    text: 50,
    markup: 50
  };
  markdownData = SAMPLE;
  currentMarkdown = null;
  constructor(
    private cd: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private markDownService: MarkdownService,
    private indexedDbService: IndexedDB
  ) { }

  textAreaEmpty() {
    if (this.markdownData.length == 0) {
      console.log("triggering")
      this.insertAtCaret(" ")
      this.cd.detectChanges();
    }
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
      this.markdownData = localStorage.getItem("tempMarkdown") || "";
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
        this.markdownData = "";

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
        console.log("listener");
        console.log(val);
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
    var element = document.createElement("a");
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
    this.cd.detectChanges();
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
      var txtarea = document.getElementById("mArea");
      if (!txtarea) {
        return;
      }

      var scrollPos = txtarea.scrollTop;
      var strPos = 0;
      var br =
        (txtarea as any).selectionStart ||
          (txtarea as any).selectionStart == "0"
          ? "ff"
          : (document as any).selection
            ? "ie"
            : false;
      if (br == "ie") {
        txtarea.focus();
        var range = (document as any).selection.createRange();
        range.moveStart("character", -(txtarea as any).value.length);
        strPos = range.text.length;
      } else if (br == "ff") {
        strPos = (txtarea as any).selectionStart;
      }

      var front = (txtarea as any).value.substring(0, strPos);
      var back = (txtarea as any).value.substring(
        strPos,
        (txtarea as any).value.length
      );
      (txtarea as any).value = front + text + back;
      strPos = strPos + text.length;
      if (br == "ie") {
        txtarea.focus();
        var ieRange = (document as any).selection.createRange();
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
      this.cd.detectChanges();
    }
  }
}
