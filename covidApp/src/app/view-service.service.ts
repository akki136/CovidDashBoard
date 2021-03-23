import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewServiceService {

  constructor() { }

  public triggerResizeEvent(): void {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }


}
