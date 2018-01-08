import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { JwtService } from '../../../shared/services/jwt.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  currentUser: any;
  subscription: Subscription;
  constructor(
    private dashboardservice:DashboardService,
    private router:Router,
    private jwtservice:JwtService,
  ) { }

  ngOnInit() {
  }

}
