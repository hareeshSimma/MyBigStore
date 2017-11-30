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

 user:any;
 emailmobile:'';
 password:'';
 

  constructor(private router:Router,private dashboardService:DashboardService) { }

  createAccount(){
  // this.router.navigate(['login/signup']);
  console.log("registred")
}
cancel(){
  this.router.navigate(['']);
  
}
  ngOnInit() {
    

  }
  authUser(){
    this.user={
      emailmobile:this.emailmobile,
      password:this.password
    }
     this.dashboardService.authentUser(this.user).subscribe(res=>{
       console.log(res);
    
     })
  }


}
