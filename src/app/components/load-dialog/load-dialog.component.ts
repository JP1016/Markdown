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
    private indexedDbService: IndexedDB,
    private snackBar: MatSnackBar
  ) {}

  deleteMarkdown(id) {
    console.log(id);
    this.indexedDbService.delete("markdown_store", id).subscribe(
      response => {
        this.getMarkdowns();
        this.snackBar.open("Markdown Deleted !! 🗑", " ", {
          duration: 1000
        });
        console.log("Deleted");
      },
      error => {
        this.snackBar.open("Error Occured while deleting markdown !!", " ", {
          duration: 1000
        });
      }
    );
  }

  getMarkdowns() {
    this.$list = this.indexedDbService.list("markdown_store");
  }

  loadMarkdown(item) {
    this.markDownService.loadMarkdown.next(item);
    this.loadDialog.close({ data: item });
  }

  ngOnInit() {
    this.getMarkdowns();
  }
}
