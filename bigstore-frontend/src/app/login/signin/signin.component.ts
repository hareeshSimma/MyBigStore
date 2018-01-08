import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { DashboardService } from '../../shared/services/dashboard.service';
import { JwtService } from '../../shared/services/jwt.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

 token:String;  
 user:User;
 emailPattren:any;
 mobilePattren:any;
 invalidEmail:boolean = false;
 invalidMobile:boolean = false;
 noUsername: boolean = false;
 errors:string;
 
msg:any;
  constructor(
    private router:Router,
    private dashboardService:DashboardService,
        private jwtservice:JwtService,

  ) { 
    this.token= this.jwtservice.getToken();    
    
    this.user ={
      email:"",
      password:""
    }
    this.emailPattren="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
    this.mobilePattren="^[789]\d{9}$";
    
  }
  pattren(e){
    var firstChar = this.user.email.charAt(0);
    if(this.user.email.length === 0) {
      this.noUsername = true;
      this.invalidEmail = false;
      this.invalidMobile = false;   
    }
    if (firstChar.match(/[a-z]+$/)) {
      if(!this.user.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)){
        this.invalidEmail = true;
        this.noUsername = false;
        
      }else{
        this.invalidEmail = false;
        this.invalidMobile = false;
        this.noUsername = false;
      }
    }else if(firstChar.match(/[0-9]+$/)){
      if(!this.user.email.match(/^[6789]\d{9}$/)){
        this.invalidMobile = true;
        this.noUsername = false;
        
      }else{
        this.invalidMobile = false;
        this.invalidEmail = false; 
        this.noUsername = false;      
      }
    }
  }

cancel(){
  this.router.navigate(['']);
  
}
  ngOnInit() {
    
  }
  

  authUser(user){
    
     this.dashboardService.authentUser(user).subscribe(res=>{
       this.msg=res;

      //  console.log(this.msg);

       this.router.navigate(['']);
  
    
     },
     err => {
      this.errors = err.msg;
    }
    )
  }


}
