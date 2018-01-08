import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { User } from '../../shared/models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { DashboardService } from '../../shared/services/dashboard.service';
import { JwtService } from '../../shared/services/jwt.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})

export class ChangepasswordComponent implements OnInit {
resetpassword:Resetpassword;
@ViewChild("myForm") myForm: NgForm;

currentUser: any;
subscription: Subscription;
  constructor(
    private dashboardservice:DashboardService,
    private router:Router,
    private jwtservice:JwtService,
  ) { 

    this.resetpassword={
      oldpassword:'',
      newpassword:'',
      confirmpassword:''
    }
  }
  Resetpassword(resetpassword){
  console.log(resetpassword)
  this.dashboardservice.updatePassword(resetpassword).subscribe(res=>{
    console.log(res);
  })
  this.myForm.reset();

  }
  cancel(){
    this.router.navigate(['']);
    
  }

  ngOnInit() {
  }

}

class Resetpassword{
  oldpassword:String;
  newpassword:String;
  confirmpassword:String;

}