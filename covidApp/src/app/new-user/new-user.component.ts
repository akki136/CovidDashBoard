import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserCredentials } from '../user-credentials';
import { CovidUserApiService } from '../covid-user-api.service';
import { NotificationServiceService } from '../notification-service.service';
import { Status } from 'src/app/status';
import { LocalStorageService } from '../local-storage.service';
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  public saveUser:FormGroup;
  isEnabled=true;
   

  constructor(   private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,private http: HttpClient,public coviduserApi:CovidUserApiService,
    public notificationService:NotificationServiceService,public localstorage :LocalStorageService) { }

  ngOnInit() {
    if(this.localstorage.get("loginInfo")!=null)
    {
      this.router.navigateByUrl("/covidInfo/dashboard");
      this.isEnabled=false;
    }
    this.saveUser=new FormGroup({
      userName :new FormControl('', [Validators.required, Validators.minLength(6)]),
      password :new FormControl('', [Validators.required, Validators.minLength(6)]),
      name :new FormControl('', [Validators.required, Validators.minLength(2)]),
      email :new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.saveUser.controls[controlName].hasError(errorName);
  }


  public addUser=(userData) =>
{
if(this.saveUser.valid)
{
  let userInfo :UserCredentials={
userName: userData.userName,
password :userData.password,
name :userData.name,
email :userData.email
  };

  this.coviduserApi.saveUser(userInfo).subscribe(res =>{
    const stat=res as Status;
    if(res==null)
    {
      console.error("login failed");
      this.notificationService.showError("Failed ,Try again","Register User");
    
    }else if(stat.msg!=null&&stat.httpStatus!='OK')
    {
      this.notificationService.showError(stat.msg,"Register User");
    }
    else
    {
      console.error("Registered Succssfully");
      this.notificationService.showSuccess(stat.msg,"Register User");
      this.router.navigateByUrl("/covidInfo/login");
    }
  })
}


}


}
