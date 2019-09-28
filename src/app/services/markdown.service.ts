import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MetaObject } from '../models/metadata';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {

  public optionChanged: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public emojiAdded: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public copyMarkdown: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public downloadMarkdown: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public saveMarkdown: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public metaAdded: BehaviorSubject<MetaObject> = new BehaviorSubject<MetaObject>(null);

  constructor() { }


}
