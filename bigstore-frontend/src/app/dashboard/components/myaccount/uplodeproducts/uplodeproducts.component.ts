import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { Uplodeproducts } from '../../../../shared/models/uploadproducts.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { DashboardService } from '../../../../shared/services/dashboard.service';
import { JwtService } from '../../../../shared/services/jwt.service';
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";

@Component({
  selector: 'app-uplodeproducts',
  templateUrl: './uplodeproducts.component.html',
  styleUrls: ['./uplodeproducts.component.css']
})
export class UplodeproductsComponent implements OnInit {
  currentUser: any;
  subscription: Subscription;
  data:Uplodeproducts;
  constructor(
    private dashboardservice:DashboardService,
    private router:Router,
    private jwtservice:JwtService,
  ) { 
    
    this.data = {
      productname:'',
      // description:'',
      cost:'',
      weight:'',
      quantity:'',
      image:'',
      
    }
  }

  uploadProducts(data){
console.log(data)
  }
  cancel(){

  }
  ngOnInit() {
  }

}
