import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../shared/models/user.model';
import { JwtService } from '../../../shared/services/jwt.service';
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";

@Component({
  selector: 'app-buynow',
  templateUrl: './buynow.component.html',
  styleUrls: ['./buynow.component.css']
})
export class BuynowComponent implements OnInit {
  @ViewChild("myForm") myForm: NgForm;

  currentUser: any;
  subscription: Subscription;
  token:String;
  userAddress: any;
  data: User;
  out: boolean = true;
  addressopen:boolean=false;
  address: any;
  errors: String;
  index:number=0;
  constructor(
    private dashboardservice:DashboardService,
    private activeRouter:ActivatedRoute,
    private router:Router,
    private jwtservice:JwtService,
  ) { 

    this.data = {
      fullname: '',
      pincode: '',
      mobile: '',
      address: '',
      city: '',
      state: ''

    }

    this.token= this.jwtservice.getToken();   
    
    this.subscription = dashboardservice.currentUser.subscribe(
      user => {
        this.currentUser = user;
        this.initData(this.currentUser)

      })


    }


  initData(currentUser: any) {

    let id = currentUser.id;
    if (id) {
      this.dashboardservice.getAddress().subscribe(
        res => {

          this.userAddress = res;
          console.log(this.userAddress)

        })
    }
  }

  save(data) {
    this.address = {
      fullname: data.fullname,
      mobile: data.mobile,
      address: data.address + "," + data.city + "," + data.state + " " + "-" + " " + data.pincode
    }
    this.myForm.reset();
    // this.collapse = "collapsed";
    this.out = true;
    console.log(this.address)
    this.dashboardservice.manageAddress(this.address).subscribe(res => {
      if (res) {
        this.dashboardservice.getAddress().subscribe(
          res => {

            this.userAddress = res;

          })
      }
    },
      err => {
        this.errors = err.msg;
        console.log(this.errors)
      })

  }

  myAddress(e){
  this.index=e;
  }

  deliver(address){
  console.log(address)
  this.addressopen=true;
  }
  
  cancel() {
 
      this.out = true;
    
  }

  ngOnInit() {
  
  }

}
