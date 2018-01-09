import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { DashboardService } from '../../../../shared/services/dashboard.service';
import { JwtService } from '../../../../shared/services/jwt.service';
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";

@Component({
  selector: 'app-manageaddress',
  templateUrl: './manageaddress.component.html',
  styleUrls: ['./manageaddress.component.css']
})
export class ManageaddressComponent implements OnInit {
  @ViewChild("myForm") myForm: NgForm;

  currentUser: any;
  subscription: Subscription;
  data: User;
  collapse: string;
  out: boolean;
  // myForm: FormGroup;
  address: any;
  userAddress: any;
  errors: String;

  constructor(
    private dashboardservice: DashboardService,
    private router: Router,
    private jwtservice: JwtService,
    private ngzone: NgZone
  ) {
    this.data = {
      fullname: '',
      pincode: '',
      mobile: '',
      address: '',
      city: '',
      state: ''

    }


    this.subscription = dashboardservice.currentUser.subscribe(
      user => {
        this.currentUser = user;
        this.initData(this.currentUser)
      }
    );
  }

  initData(currentUser: any) {

    let id = currentUser.id;
    if (id) {
      this.dashboardservice.getAddress().subscribe(
        res => {

          this.userAddress = res;

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
    this.collapse = "collapsed";
    this.out = false;
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
  cancel() {
    this.ngzone.run(() => {
      this.collapse = "collapsed";
      this.out = false;
      console.log(this.collapse)
    })
  }
  ngOnInit() {
  }

}
