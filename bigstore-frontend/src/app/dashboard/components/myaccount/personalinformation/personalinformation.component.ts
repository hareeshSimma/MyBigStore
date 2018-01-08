import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { DashboardService } from '../../../../shared/services/dashboard.service';
import { JwtService } from '../../../../shared/services/jwt.service';
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";

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

  constructor(
    private dashboardservice:DashboardService,
    private router:Router,
    private jwtservice:JwtService,
  ) { 
    this.user={
      fullname:'',
      gender:'',
      mobile:'',
      email:''   
    }
  }

  ngOnInit() {
  }

}
