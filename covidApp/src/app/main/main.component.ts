import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public sidebarOpened: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  public sidebarToggle($event: any): void {
    this.sidebarOpened = !this.sidebarOpened;
  }
}
