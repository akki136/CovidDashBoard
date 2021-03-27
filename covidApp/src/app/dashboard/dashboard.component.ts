import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { NotificationServiceService } from '../notification-service.service';
import { ViewServiceService } from '../view-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(private route: ActivatedRoute,
    private router: Router,public localstorage :LocalStorageService,
    private viewService: ViewServiceService,public notificationService:NotificationServiceService) { }


  ngOnInit() {
    this.validateLoginInfo();
  }


  public validateLoginInfo() {
    if (this.localstorage.get("loginInfo") == null) {
      this.notificationService.showError("Please Login to explore", "Login Error");
      this.router.navigateByUrl("/covidInfo/login");

    }
    else if (this.localstorage.get("loginInfo") != null) {
      this.localstorage.isEnabled = false;
      this.viewService.triggerResizeEvent();

    }
  }
}
