import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { OptionsDialogComponent } from "../options-dialog/options-dialog.component";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MarkdownService } from "src/app/services/markdown.service";
import { IndexedDB } from "ng-indexed-db";
import { Observable } from "rxjs";

@Component({
  selector: "app-save-dialog",
  templateUrl: "./save-dialog.component.html",
  styleUrls: ["./save-dialog.component.css"]
})
export class SaveDialogComponent implements OnInit {
  public saveOption: FormGroup;
  public fileName = "";
  $list: Observable<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public saveDialog: MatDialogRef<OptionsDialogComponent>,
    private markdownService: MarkdownService
  ) { }

  ngOnInit() { }

  saveFile() {
    this.markdownService.saveMarkdown.next(this.fileName);
    this.saveDialog.close({ data: this.fileName });
  }
}
