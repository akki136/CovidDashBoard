import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'covidDashBoard';
 
  constructor(private route: ActivatedRoute,
    private router: Router,public localstorage :LocalStorageService)
  {

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
    this.router.navigateByUrl("/covidInfo/login");
  }
}
