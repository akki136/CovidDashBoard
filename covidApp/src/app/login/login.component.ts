import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserCredentials } from '../user-credentials';
import { CovidUserApiService } from '../covid-user-api.service';
import { NotificationServiceService } from '../notification-service.service';
import { Status } from '../status';
import { LocalStorageService } from '../local-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  url: string;
 public loginForm:FormGroup;

  constructor(   private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,private http: HttpClient,public coviduserApi:CovidUserApiService,
    public notificationService:NotificationServiceService,public localstorage :LocalStorageService) { }

  ngOnInit() {
   this.url= this.router.url;
   if(this.localstorage.get("loginInfo")!=null)
   {
     this.router.navigateByUrl("/covidInfo/dashboard");
     this.localstorage.isEnabled=false;
   }
    this.loginForm=new FormGroup({
      name :new FormControl('', [Validators.required, Validators.minLength(5)]),
      password :new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
LocalStorageService
  public hasError = (controlName: string, errorName: string) =>{
    return this.loginForm.controls[controlName].hasError(errorName);
  }

public attemptLogin=(loginCredential) =>
{
if(this.loginForm.valid)
{
  let loginInfo :UserCredentials={
userName: loginCredential.name,
password :loginCredential.password,
name :"",
email :""
  };

  this.coviduserApi.attemptLogin(loginInfo).subscribe(res =>{
    const stat=res as UserCredentials;
    let out=JSON.stringify(stat);
    if(res==null)
    {
      console.error("login failed");
      this.notificationService.showError("Login Failed,Try again","Login");
     
    
    }else if(out=='"Login Failed"')
    {
      console.error("login failed");
      this.notificationService.showError("Login Failed,Try again","Login");
    }
    else
    {
      console.info("Logged In Successfully");
      this.notificationService.showSuccess("Logged In Successfully","Login");
      this.localstorage.set("loginInfo",loginInfo);
      this.router.navigateByUrl("/covidInfo/dashboard");
    }
  })
}


}


}
