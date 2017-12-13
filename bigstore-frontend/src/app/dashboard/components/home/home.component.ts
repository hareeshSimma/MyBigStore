import { Component, OnInit } from '@angular/core';
import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
images:any;
productdata:any;
  constructor(
    private dashboardservice:DashboardService,
    private router:Router
  ) { 

    this.images=[
      {
        "name":"Lalitha Brand ","href":"assets/images/lalitha.jpg","cost":1200,"weight":25
      },
      {
        "name":"Lohitha Rice","href":"assets/images/lohitahbrand.jpg","cost":1300,"weight":25
      },
      {
        "name":"India Gate","href":"assets/images/indiagate.jpg","cost":1000,"weight":25
      },
      {
        "name":"Bell ","href":"assets/images/bell.jpg","cost":1350,"weight":25
      },
      {
        "name":"Lohitha ","href":"assets/images/lohitha2.jpg","cost":1250,"weight":25
      },
      {
        "name":"Daawat","href":"assets/images/daawath.jpg","cost":1350,"weight":25
      },
      {
        "name":"Daawat ","href":"assets/images/daawath2.jpg","cost":1350,"weight":25
      },
      {
        "name":"Lalitha Brand","href":"assets/images/lalithabrand.jpg","cost":1550,"weight":25
      }

    
    ]
    
   
  }
  public imageSources: string[] = [
    './assets/images/img1.jpg',
    './assets/images/img2.jpg',
    './assets/images/img3.jpg',
    './assets/images/img5.jpg',
    
 ];
 
 public config: ICarouselConfig = {
   verifyBeforeLoad: true,
   log: false,
   animation: true,
   animationType: AnimationConfig.SLIDE,
   autoplay: true,
   autoplayDelay: 4000,
   stopAutoplayMinWidth: 768
 };

show(data){
  //console.log(data)
this.productdata=localStorage.setItem("data",JSON.stringify(data));
  // this.dashboardservice.sendPath(data);
  this.router.navigate(['/productdata'])

}
  ngOnInit() {
    //console.log(this.images)
  }

}
