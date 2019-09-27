import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {

  public optionChanged: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public emojiAdded: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor() { }

}
