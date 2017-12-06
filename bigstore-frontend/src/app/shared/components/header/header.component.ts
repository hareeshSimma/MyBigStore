import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { JwtService } from '../../../shared/services/jwt.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
token:String;
  constructor(
    private router:Router,
    private dashboardService:DashboardService,
    private jwtservice:JwtService,
    
  ) { 
    this.token= this.jwtservice.getToken();
  }
  logout(){
    
    this.dashboardService.purgeAuth();
    this.router.navigate(['/login']);
}


  ngOnInit() {

  }

}
