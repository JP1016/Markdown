import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MetaObject } from "../models/metadata";
import { MarkDownObject } from "../models/markdown";

@Injectable({
  providedIn: "root"
})
export class MarkdownService {
  public optionChanged: BehaviorSubject<string> = new BehaviorSubject<string>(
    null
  );
  public emojiAdded: BehaviorSubject<string> = new BehaviorSubject<string>(
    null
  );
  public copyMarkdown: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public downloadMarkdown: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
  public saveMarkdown: BehaviorSubject<string> = new BehaviorSubject<string>(
    null
  );
  public metaAdded: BehaviorSubject<MetaObject> = new BehaviorSubject<
    MetaObject
  >(null);
  public loadMarkdown: BehaviorSubject<MarkDownObject> = new BehaviorSubject<
    MarkDownObject
  >(null);
  public newMarkdown: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  public markdownFromLocalStorage: BehaviorSubject<MarkDownObject> = new BehaviorSubject<MarkDownObject>(
    null
  );

  constructor() {}
}
