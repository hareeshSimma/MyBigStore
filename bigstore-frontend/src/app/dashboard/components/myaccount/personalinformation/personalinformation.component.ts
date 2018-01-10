import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { Router,NavigationEnd } from '@angular/router';
import { DashboardService } from '../../../../shared/services/dashboard.service';
import { JwtService } from '../../../../shared/services/jwt.service';
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-personalinformation',
  templateUrl: './personalinformation.component.html',
  styleUrls: ['./personalinformation.component.css']
})
export class PersonalinformationComponent implements OnInit {
  currentUser: any;
  subscription: Subscription;
  user:User;
  errors:String;
  isEdit:boolean=true;

  constructor(
    private dashboardservice:DashboardService,
    private router:Router,
    private jwtservice:JwtService,
  ) { 
    this.subscription = dashboardservice.currentUser.subscribe(
      user => {
        this.user = user;   
        // console.log(this.user);
    })

    // this.router.events
    // .filter(e => e instanceof NavigationEnd)
    // .pairwise().subscribe((e) => {
    //     console.log(e);
    // });
    
  }
  enableEdit(){
    this.isEdit=false;
  }

  onSave(user){
  //  this.user["gender"]=user.gender;
   this.dashboardservice.updateUser(this.user).subscribe(
        res => {
          console.log(res.msg);
    
    })
    this.isEdit=true;

  }
  cancel(){
    this.isEdit=true;
    
    // this.router.navigate(['/']);

  }
  ngOnInit() {
    // let currentUrl = this.router.url;
    // console.log(currentUrl)

    

  }

}
