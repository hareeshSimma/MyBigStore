import { Component, OnInit ,NgZone} from '@angular/core';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { JwtService } from '../../../shared/services/jwt.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../shared/models/user.model';
import { Router,NavigationEnd } from '@angular/router';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
token:String;
currentUser: any;
subscription: Subscription;
items:any;
itemslength:string;
mySidenav:string;
totalProducts:any;

  constructor(
    private router:Router,
    private dashboardService:DashboardService,
    private jwtservice:JwtService,
    private zone:NgZone,
    
    
    
  ) { 
    this.token= this.jwtservice.getToken();
    this.subscription = dashboardService.currentUser.subscribe(
      user => {
        this.currentUser = user;
         this.initData(this.currentUser)
      }
    );
  }


  public url = 'http://suggestqueries.google.com/complete/search';
  public params = {
    hl: 'en',
    ds: 'yt',
    xhr: 't',
    client: 'youtube'
  };
  public api = 'http';
  public search = '';
 
  handleResultSelected (result) {
    this.search = result;
  }


  openNav() {
   this.mySidenav="mySidenav"
  }
  closeNav() {
    this.mySidenav="mySidenav1"
   }

   initData(currentUser: any) {
    
    let id = currentUser.id;
    if(id){
      this.dashboardService.getItems(id)
      .subscribe(
      res => {
        this.items = res.items;
        this.itemslength=this.items.length;
        // console.log(this.itemslength)

      })
      this.dashboardService.getPath().subscribe(res=>{
        console.log(res);
      });
      
        

    
    
  }
   }
 
  logout(){
    
    this.dashboardService.purgeAuth();
    this.router.navigate(['/login']);
}


  ngOnInit() {
    // console.log()
    this.dashboardService.getProducts().subscribe(res=>{
      this.totalProducts = res;
      
    })

    this.dashboardService.caseNumber$.subscribe(res=>{
      this.itemslength=res;
    });
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
  }

}
