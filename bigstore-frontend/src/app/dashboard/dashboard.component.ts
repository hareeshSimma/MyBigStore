import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  onActivate(e, outlet){
    outlet.scrollTop = 0;
    // window.scrollTo(0, 0)
  }
  ngOnInit() {
  }

}
