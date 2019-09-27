import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {

  public optionChanged: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public emojiAdded: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public copyMarkdown: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public downloadMarkdown: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public saveMarkdown: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

}
