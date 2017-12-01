import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { DashboardService } from '../../shared/services/dashboard.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

user:User;
  constructor(private router:Router,private dashboardService:DashboardService) {
    this.user = {
      fullname:'',
      email:'',
      mobile:'',
      password:'',
      confirmpass:''
    }
   }
  cancel(){
    this.router.navigate(['']);
    
  }
  ngOnInit() {
    
  }
  
  newUser(user){
     this.dashboardService.newUser(user).subscribe(res=>{
       console.log(res);
     console.log("hello",user);
     })

    }

}