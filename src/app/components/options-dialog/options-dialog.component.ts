import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FORM_OPTIONS } from "src/app/constants/form-constants";
import { MarkdownService } from "src/app/services/markdown.service";

@Component({
  selector: "app-options-dialog",
  templateUrl: "./options-dialog.component.html",
  styleUrls: ["./options-dialog.component.css"]
})
export class OptionsDialogComponent implements OnInit {
  public addOption: FormGroup;

  public options = FORM_OPTIONS;
  public formOption;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public optionsDialog: MatDialogRef<OptionsDialogComponent>,
    private fb: FormBuilder,
    private markService: MarkdownService
  ) { }

  ngOnInit() {
    this.formOption = FORM_OPTIONS[this.data.type];
    this.populateFormControl();
  }

  populateFormControl() {
    this.addOption = this.fb.group({});
    const form = FORM_OPTIONS[this.data.type];
    let value = "";
    let preVal = localStorage.getItem(this.data.type);
    if (FORM_OPTIONS[this.data.type].hasOwnProperty("default")) {
      value = FORM_OPTIONS[this.data.type]["default"];
    }
    if (preVal) {
      value = preVal;
    }

    form.fields.map(column => {
      this.addOption.addControl(column.name, new FormControl(value, []));
    });
  }


  executeFormAction() {
    if (this.data.type == "image") {
      this.optionsDialog.close({
        success: true,
        data: { type: "image", ...this.addOption.value }
      });
    } else if (this.data.type == "link") {
      this.optionsDialog.close({
        success: true,
        data: { type: "link", ...this.addOption.value }
      });
    } else {
      localStorage.setItem(this.data.type, this.addOption.value.descr)
      this.optionsDialog.close({
        success: true,
        data: { type: "text", ...this.addOption.value }
      });
    }
  }
}
