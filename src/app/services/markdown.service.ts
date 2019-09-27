import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {

  public isMarkdownMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public optionChanged: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  constructor() { }



  formatMarkdown(option: any) {
  }


}
