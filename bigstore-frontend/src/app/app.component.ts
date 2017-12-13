import { Component,OnInit } from '@angular/core';
import { DashboardService } from './shared/services/dashboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'app';
  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.dashboardService.populate();
    this.dashboardService.isAuthenticated.take(1).map(bool => {
      console.log(bool);
    });
  }
}
