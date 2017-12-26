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
  errors:string;
  msg:string;
  otpcount=0;
  resendotp:boolean=true;
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
    this.router.navigate(['/login']);
    
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
    this.dashboardService.forgotPassword(user).subscribe(res=>{
      console.log(res);
      if(res.Success==true){
        this.msg=res.msg;
        console.log(this.msg)
      this.count++;
      }
     
    },
    err => {
      this.errors = err.msg;
    })
  }
  verifyOtp(verifyotp){
    verifyotp["email"]=this.user.email;
    this.dashboardService.verifyOtp(verifyotp).subscribe(res=>{
      console.log(res)
      if(res.Success==true){
        this.msg=res.msg;
        // console.log(this.msg)
      this.count++;
      }
    },
    err => {
      this.errors = err.msg;
    })

  }
  resendOTP(user){
if(this.otpcount <=2 ){
  this.otpcount++;
this.dashboardService.resendOtp(user).subscribe(res=>{
  
console.log(res);

},
err => {
  this.errors = err.msg;
})
  }
  else{
this.resendotp= false;
  }
}


  newPswd(newpswd){
  newpswd["email"]=this.user.email;
console.log(newpswd)
this.dashboardService.resetpassword(newpswd).subscribe(res=>{
  console.log(res);
  if(res.Success==true){
    this.msg=res.msg;
    setTimeout(() => {
    this.router.navigate(['/login']);
      
    }, 3000);
  }
},
err => {
  this.errors = err.msg;
})
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