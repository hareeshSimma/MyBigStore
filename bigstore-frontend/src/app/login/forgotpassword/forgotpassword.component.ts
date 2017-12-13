import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';
import { DashboardService } from '../../shared/services/dashboard.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  invalidEmail:boolean = false;
  invalidMobile:boolean = false;
  noUsername: boolean = false;
  user:User;
  count=0;
  verifyotp:Otp;
  newpswd:Newpassword;
  constructor(
    private router:Router,
    private dashboardService:DashboardService,
  ) { 
    this.user ={
      email:""
    }

    this.verifyotp={
      otp:""
    }
    this.newpswd={
      password:""
    }
  }

  cancel(){
    this.router.navigate(['']);
    
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
      if(!this.user.email.match(/^[789]\d{9}$/)){
        this.invalidMobile = true;
        this.noUsername = false;
        
      }else{
        this.invalidMobile = false;
        this.invalidEmail = false; 
        this.noUsername = false;      
      }
    }
  }
  forgotpassword(user){
    this.count++;
    console.log(user)
  }
  verifyOtp(verifyotp){
    this.count++;
    console.log(verifyotp)

  }
  newPswd(newpswd){
console.log(newpswd)
  }
  ngOnInit() {
  }

}
class Otp{
  otp:string;
}
class Newpassword{
  password:string;
}