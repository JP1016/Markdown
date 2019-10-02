import { Component, OnInit, Inject, Renderer2, ViewChild } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { MatDialog } from "@angular/material";
import { MarkdownService } from "src/app/services/markdown.service";
import { OPTION, TOOLBAR } from "src/app/constants/app-constants";
import { AddEmojiComponent } from "../add-emoji/add-emoji.component";
import { ShortcutInput, AllowIn } from "ng-keyboard-shortcuts";
import { Observable } from "rxjs";
import { IndexedDB } from "ng-indexed-db";
import { OptionsDialogComponent } from "../options-dialog/options-dialog.component";
import {
  CONTRIB_GUIDELINES_SELECT,
  CONTRIB_LIST,
  LICENCE_SELECT
} from "src/app/constants/form-constants";
import { SaveDialogComponent } from "../save-dialog/save-dialog.component";
import { LoadDialogComponent } from "../load-dialog/load-dialog.component";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  public isDarkMode = true;
  public options = OPTION;
  public toolbar = TOOLBAR;
  public fileName;
  shortcuts: ShortcutInput[] = [];
  $list: Observable<any>;

  public CONTRIB_GUIDELINES_SELECT = CONTRIB_GUIDELINES_SELECT;
  public CONTRIB_LIST = CONTRIB_LIST;
  public LICENCE_SELECT = LICENCE_SELECT;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private dialog: MatDialog,
    private markDown: MarkdownService,
    private indexedDbService: IndexedDB
  ) {
    this.$list = this.indexedDbService.list("markdown_table");
  }

  ngOnInit() {
    const theme = localStorage.getItem("theme") || "dark-mode";
    this.switchTheme(theme);
    this.loadedMarkupFromLocalStorage();
  }

  loadedMarkupFromLocalStorage() {
    this.markDown.markdownFromLocalStorage.subscribe(markdown => {
      if (markdown) {
        this.fileName = markdown.title;
      }
    })
  }
  copyMarkup() {
    this.markDown.copyMarkdown.next(true);
  }

  downloadMarkup() {
    this.markDown.downloadMarkdown.next(true);
  }

  newFile() {
    this.fileName = null;
    this.markDown.newMarkdown.next(true);
  }

  saveMarkup() {
    const dialogRef = this.dialog.open(SaveDialogComponent, {
      data: {
        text: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.hasOwnProperty("data")) {
        this.fileName = result.data;
      }
    });

  }

  loadMarkup() {
    const dialogRef = this.dialog.open(LoadDialogComponent, {
      data: {
        text: null
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.hasOwnProperty("data")) {
        this.fileName = result.data.title;
      }
    });
  }

  ngAfterViewInit(): void {
    this.shortcuts.push(
      {
        key: ["cmd + shift + b", "ctrl + shift + b"],
        allowIn: [AllowIn.Textarea],
        command: e => this.markDown.optionChanged.next(OPTION.BOLD),
        preventDefault: true
      },
      {
        key: ["cmd + shift + i", "ctrl + shift + i"],
        allowIn: [AllowIn.Textarea],
        command: e => this.markDown.optionChanged.next(OPTION.ITALIC),
        preventDefault: true
      },
      {
        key: ["cmd + shift + H", "ctrl + shift + H"],
        allowIn: [AllowIn.Textarea],
        command: e => this.markDown.optionChanged.next(OPTION.SIZE),
        preventDefault: true
      },
      {
        key: ["cmd + shift + L", "ctrl + shift + L"],
        allowIn: [AllowIn.Textarea],
        command: e => this.markDown.optionChanged.next(OPTION.LIST),
        preventDefault: true
      },
      {
        key: ["cmd + shift + C", "ctrl + shift + C"],
        allowIn: [AllowIn.Textarea],
        command: e => this.markDown.optionChanged.next(OPTION.CHECK_BOX),
        preventDefault: true
      },
      {
        key: ["cmd + shift + Q", "ctrl + shift + Q"],
        allowIn: [AllowIn.Textarea],
        command: e => this.markDown.optionChanged.next(OPTION.BLOCK_QUOTE),
        preventDefault: true
      },
      {
        key: ["cmd + shift + D", "ctrl + shift + D"],
        allowIn: [AllowIn.Textarea],
        command: e => this.markDown.optionChanged.next(OPTION.CODE),
        preventDefault: true
      },
      {
        key: ["cmd + shift + T", "ctrl + shift + T"],
        allowIn: [AllowIn.Textarea],
        command: e => this.markDown.optionChanged.next(OPTION.TABLE),
        preventDefault: true
      },
      {
        key: ["cmd + shift + K", "ctrl + shift + K"],
        allowIn: [AllowIn.Textarea],
        command: e => this.markDown.optionChanged.next(OPTION.LINK),
        preventDefault: true
      },
      {
        key: ["cmd + shift + G", "ctrl + shift + G"],
        allowIn: [AllowIn.Textarea],
        command: e => this.markDown.optionChanged.next(OPTION.IMAGE),
        preventDefault: true
      }
    );
  }

  openEmojiDialog() {
    const dialogRef = this.dialog.open(AddEmojiComponent, {
      data: {
        text: null
      },
      panelClass: "emoji-add"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.hasOwnProperty("success")) {
        this.markDown.emojiAdded.next(result.data);
      }
    });
  }

  //Hack to prevent default angular sorting
  sortNull() { }

  formatText(option) {
    console.log(option);

    if (option == OPTION.IMAGE || option == OPTION.LINK) {
      const dialogRef = this.dialog.open(OptionsDialogComponent, {
        data: {
          type: option
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if (result && result.hasOwnProperty("success")) {
          this.markDown.metaAdded.next(result.data);
        }
      });
    } else if (Object.values(OPTION).indexOf(option) == -1) {
      const dialogRef = this.dialog.open(OptionsDialogComponent, {
        data: {
          type: option
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result && result.hasOwnProperty("success")) {
          console.log("Success");
          console.log(result);
          this.markDown.metaAdded.next(result.data);
        }
      });
    } else {
      console.log("should not");
      this.markDown.optionChanged.next(option);
    }
  }

  toggleMode() {
    let mode;
    if (document.body.classList.contains("dark-mode")) mode = "light-mode";
    else mode = "dark-mode";

    this.switchTheme(mode);
    localStorage.setItem("theme", mode);
  }

  switchTheme(mode) {
    let oldMode;
    if (mode === "light-mode") {
      oldMode = "dark-mode";
      this.isDarkMode = false;
    }
    if (mode === "dark-mode") {
      this.isDarkMode = true;
      oldMode = "light-mode";
    }

    this.renderer.removeClass(this.document.body, oldMode);
    this.renderer.addClass(this.document.body, mode);
  }
}
