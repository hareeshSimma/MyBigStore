import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { DashboardService } from '../../shared/services/dashboard.service';
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

user:User;
msg:any;
errors:any;
  constructor(
    private router:Router,
    private dashboardService:DashboardService) {
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
      
       this.msg=res;
       console.log(this.msg);
  setTimeout(() => {
    this.router.navigate(['/login']);
  }, 3000);  
    
     },
     err => {
      this.errors = err.msg;
      console.log(this.errors)
    }
    )

    }

}