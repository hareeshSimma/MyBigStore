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
  out:boolean = true;
  show:boolean=false;
  address:any;
  index:number;
  editForm:boolean=false;
  userAddress: any;
  errors: String;
  _isAddressLoading:boolean=true;
  myAddress:User;
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
      state: '',
      addressid:''
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
          this._isAddressLoading=false;

        })
    }
  }

// add address foeld

  save(data) {

    let AddressId= "AD"+ Math.floor((Math.random() * 10000000) + 1);
    data.addressid=AddressId;
    // this.address = {
    //   addressid:AddressId,
    //   fullname: data.fullname,
    //   mobile: data.mobile,
    //   address:data.address,
    //   city:data.city,
    //   state:data.state,
    //   pincode:data.pincode
    //   // address: data.address + "," + data.city + "," + data.state + " " + "-" + " " + data.pincode
    // }
    
    // this.collapse = "collapsed";
    this.out = true;
    console.log(data);

    this.dashboardservice.manageAddress(data).subscribe(res => {
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
      this.myForm.reset();

  }

  editaddress(address,i){
     console.log("helloo....",address);
     this.out = true;     
      this.editForm=true;
      this.show=false;
      this.index=i;
      this.myAddress=address;
     
  }
  updateAddress(data)
  {
    console.log("hari",data);
     this.dashboardservice.updateAddress(data).subscribe(
          res => {
          
            console.log(res);
            if (res) {
        this.dashboardservice.getAddress().subscribe(
          res => {

            this.userAddress = res;

          })
      }
            
       })

       this.index=-1;

  }

  deleteaddress(id){
     this.dashboardservice.deleteAddress(id).subscribe(res=>{
       console.log(res);
       if (res.Success) {
        setTimeout(() => {
          this.dashboardservice.getAddress().subscribe(
            res => {
              this.userAddress = res;
  
            })
        }, 1000);
      
      }
     })

  }
  cancel() {
 
      this.out = true;
      this.index=-1;
        
  }
  ngOnInit() {
  }

}
