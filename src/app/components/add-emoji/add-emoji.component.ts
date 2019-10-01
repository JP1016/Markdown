import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-emoji',
  templateUrl: './add-emoji.component.html',
  styleUrls: ['./add-emoji.component.css']
})
export class AddEmojiComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEmojiComponent>) { }

  ngOnInit() {
  }

  addEmoji(event) {
    this.dialogRef.close({ success: true, data: event.emoji.native });
  }
}
