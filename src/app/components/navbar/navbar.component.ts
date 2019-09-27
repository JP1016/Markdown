import { Component, OnInit, Inject, Renderer2, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material';
import { MarkdownService } from 'src/app/services/markdown.service';
import { OPTION, TOOLBAR } from 'src/app/constants/app-constants';
import { AddEmojiComponent } from '../add-emoji/add-emoji.component';
import { ShortcutInput, AllowIn, ShortcutEventOutput, KeyboardShortcutsComponent } from 'ng-keyboard-shortcuts';
import { Observable } from 'rxjs';
import { IndexedDB } from 'ng-indexed-db';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isDarkMode = true;
  public options = OPTION;
  public toolbar = TOOLBAR;
  shortcuts: ShortcutInput[] = [];
  $list: Observable<any>;

  ngOnInit() {
    const theme = localStorage.getItem("theme") || "light-mode";
    this.switchTheme(theme);
  }

  copyMarkup() {
    this.markDown.copyMarkdown.next(true)
  }

  downloadMarkup() {
    this.markDown.downloadMarkdown.next(true)
  }

  saveMarkup() {
    this.markDown.saveMarkdown.next(true);
  }

  ngAfterViewInit(): void {
    this.shortcuts.push(
      {
        key: ["cmd + shift + b"],
        allowIn: [AllowIn.Textarea],
        command: e => this.markDown.optionChanged.next(OPTION.BOLD),
        preventDefault: true
      },
      {
        key: ["cmd + shift + i"],
        allowIn: [AllowIn.Textarea],
        command: e => this.markDown.optionChanged.next(OPTION.ITALIC),
        preventDefault: true
      },
      {
        key: ["cmd + shift + H"],
        allowIn: [AllowIn.Textarea],
        command: e => this.markDown.optionChanged.next(OPTION.SIZE),
        preventDefault: true
      },
      {
        key: ["cmd + shift + L"],
        allowIn: [AllowIn.Textarea],
        command: e => this.markDown.optionChanged.next(OPTION.LIST),
        preventDefault: true
      },
      {
        key: ["cmd + shift + C"],
        allowIn: [AllowIn.Textarea],
        command: e => this.markDown.optionChanged.next(OPTION.CHECK_BOX),
        preventDefault: true
      },
      {
        key: ["cmd + shift + Q"],
        allowIn: [AllowIn.Textarea],
        command: e => this.markDown.optionChanged.next(OPTION.BLOCK_QUOTE),
        preventDefault: true
      },
      {
        key: ["cmd + shift + D"],
        allowIn: [AllowIn.Textarea],
        command: e => this.markDown.optionChanged.next(OPTION.CODE),
        preventDefault: true
      },
      {
        key: ["cmd + shift + T"],
        allowIn: [AllowIn.Textarea],
        command: e => this.markDown.optionChanged.next(OPTION.TABLE),
        preventDefault: true
      },
      {
        key: ["cmd + shift + K"],
        allowIn: [AllowIn.Textarea],
        command: e => this.markDown.optionChanged.next(OPTION.LINK),
        preventDefault: true
      },
      {
        key: ["cmd + shift + G"],
        allowIn: [AllowIn.Textarea],
        command: e => this.markDown.optionChanged.next(OPTION.IMAGE),
        preventDefault: true
      },
    );
  }

  openEmojiDialog() {
    const dialogRef = this.dialog.open(AddEmojiComponent, {
      data: {
        text: null
      }, panelClass: "emoji-add"
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
    console.log(option)
    this.markDown.optionChanged.next(option);
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2, private dialog: MatDialog,
    private markDown: MarkdownService,
    private indexedDbService: IndexedDB) {
    this.$list = this.indexedDbService.list('markdown_table');

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
