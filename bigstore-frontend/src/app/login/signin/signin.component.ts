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
msg:any;
  constructor(
    private router:Router,
    private dashboardService:DashboardService,
    
  ) { 
    this.user ={
      email:"",
      password:""
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

       console.log(this.msg);
       
       this.router.navigate(['']);
  
    
     })
  }


}
