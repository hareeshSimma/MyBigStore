import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { DashboardService } from '../../shared/services/dashboard.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

 user:User;
 emailPattren:String;
 mobilePattren:String;
 error:string;

msg:any;
  constructor(
    private router:Router,
    private dashboardService:DashboardService,
    
  ) { 
    this.user ={
      email:"",
      password:""
    }
    this.emailPattren="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
    this.mobilePattren="^[789]\d{9}$";
    
  }

  // pattren(e){
  //   if (this.emailPattren && !e.match(this.user.email)) {
  //     this.error = "email"
  //     console.log(this.error)
      
  //   }
  //   if (this.mobilePattren && !e.match(this.user.email)) {
  //     this.error = "mobile"
  //     console.log(this.error)
  //   }
  // }

cancel(){
  this.router.navigate(['']);
  
}
  ngOnInit() {
    
  }
  

  authUser(user){
    
     this.dashboardService.authentUser(user).subscribe(res=>{
       this.msg=res;

       console.log(this.msg);

       this.router.navigate(['']);
  
    
     })
  }


}
