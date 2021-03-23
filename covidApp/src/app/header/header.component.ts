 
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ViewServiceService } from "../view-service.service";


@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  @Output() toogleSidebarEvent: EventEmitter<any> = new EventEmitter();

  constructor(private viewService: ViewServiceService) {}

  ngOnInit(): void {}

  public triggerToggleSidebar(): void {
    this.toogleSidebarEvent.emit();
    this.viewService.triggerResizeEvent();
  }
}
