import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule, MatIconModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { IconsModule } from "./icons/icons.module";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NtkmeButtonModule } from "@ctrl/ngx-github-buttons";
import { AngularSplitModule } from "angular-split";
import { MarkdownModule } from "ngx-markdown";
import { MarkupComponent } from "./components/markup/markup.component";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { AddEmojiComponent } from "./components/add-emoji/add-emoji.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { KeyboardShortcutsModule } from "ng-keyboard-shortcuts";
import { IndexedDBModule } from "ng-indexed-db";
import { OptionsDialogComponent } from "./components/options-dialog/options-dialog.component";
import { SaveDialogComponent } from "./components/save-dialog/save-dialog.component";
import { LoadDialogComponent } from "./components/load-dialog/load-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MarkupComponent,
    AddEmojiComponent,
    OptionsDialogComponent,
    SaveDialogComponent,
    LoadDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    IconsModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    PickerModule,
    NtkmeButtonModule,
    MarkdownModule.forRoot(),
    KeyboardShortcutsModule.forRoot(),
    AngularSplitModule.forRoot(),
    IndexedDBModule.forRoot([
      {
        name: "markdown_db",
        stores: [{ name: "markdown_store" }]
      }
    ]),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
      registrationStrategy: "registerImmediately"
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddEmojiComponent,
    OptionsDialogComponent,
    SaveDialogComponent,
    LoadDialogComponent
  ]
})
export class AppModule {}
