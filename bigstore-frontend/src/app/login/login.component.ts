import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
  onActivate(e, outlet){
    outlet.scrollTop = 0;
    // window.scrollTo(0, 0)
  }
  ngOnInit() {
  }

}
