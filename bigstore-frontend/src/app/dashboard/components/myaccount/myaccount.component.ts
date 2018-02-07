import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { JwtService } from '../../../shared/services/jwt.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../shared/models/user.model';
@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  currentUser: any;
  subscription: Subscription;
  role:string;
  constructor(
    private router:Router,
    private dashboardService:DashboardService,
    private jwtservice:JwtService,
  ) { 
    this.subscription = dashboardService.currentUser.subscribe(
      user => {
        this.currentUser = user;
        this.role=this.currentUser.role;
        //  this.initData(this.currentUser)
      }
    );
  }
  onActivate(e, outlet){
    outlet.scrollTop = 0;
    // window.scrollTo(0, 0)
  }
  logout(){
    
    this.dashboardService.purgeAuth();
    this.router.navigate(['/login']);
}

  ngOnInit() {
  }

}
