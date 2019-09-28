import { Component, OnInit } from "@angular/core";
import { MatSnackBar, MatDialog, MatDialogRef } from "@angular/material";
import { MarkdownService } from "src/app/services/markdown.service";
import { IndexedDB } from "ng-indexed-db";
import { Observable } from "rxjs";

@Component({
  selector: "app-load-dialog",
  templateUrl: "./load-dialog.component.html",
  styleUrls: ["./load-dialog.component.css"]
})
export class LoadDialogComponent implements OnInit {
  $list: Observable<any>;

  constructor(
    public loadDialog: MatDialogRef<LoadDialogComponent>,
    private markDownService: MarkdownService,
    private indexedDbService: IndexedDB
  ) {}

  ngOnInit() {
    this.$list = this.indexedDbService.list("markdown_store");
  }
}
