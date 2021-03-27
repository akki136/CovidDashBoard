import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;
  isEnabled=true;
  changes$ = new Subject();
  public state:string;
  public totalCase=-1;
   public activeCases=-1;
   public newCase=-1;
   public newCured=-1;
   public curedCases=-1;
   public newlDeath=-1;
   public totalDeath=-1;
   public selected:string;
   public userName:string;
   public tableSelected:string;
  public isScreenLoaded:boolean;
  public dataBase=new Map();

  constructor() {
    this.localStorage   = window.localStorage;
   }
   private subject = new Subject<any>();
   private updateEvent = new Subject<any>();
   get(key: string): any {
    if (this.isLocalStorageSupported) {
      return JSON.parse(this.localStorage.getItem(key));
    }

    return null;
  }

  sendEvent(value:any,type:string) {
    this.subject.next({"selection":value,"type":type});
  }
  getEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }
  
  
  get isLocalStorageSupported(): boolean {
    return !!this.localStorage
  }

  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      this.changes$.next({
        type: 'set',
        key,
        value
      });
      return true;
    }

    return false;
  }

  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      this.changes$.next({
        type: 'remove',
        key
      });
      return true;
    }

    return false;
  }
}
