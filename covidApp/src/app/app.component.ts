import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { NotificationServiceService } from './notification-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'covidDashBoard';
 private id :any;
  constructor(private route: ActivatedRoute,
    private router: Router,public localstorage :LocalStorageService,public notificationService:NotificationServiceService)
  {
 
  }
  ngOnDestroy(): void {
    
  }
  ngOnInit() {
  
    if(this.localstorage.get("loginInfo")!=null)
    {
      this.localstorage.isEnabled=false;
      
    }
    
   }


   LogOut(){
    this.localstorage.remove("loginInfo");
    this.localstorage.isEnabled=true;
    this.notificationService.showSuccess("Logged Out Successfully","Logged Out");
    this.router.navigateByUrl("/covidInfo/login");
  }
}
