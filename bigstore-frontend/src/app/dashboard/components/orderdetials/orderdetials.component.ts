import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-orderdetials',
  templateUrl: './orderdetials.component.html',
  styleUrls: ['./orderdetials.component.css']
})
export class OrderdetialsComponent implements OnInit {
viewOrderDetials:any;
url=environment.img_url;

  constructor() { }

  ngOnInit() {
    let data=sessionStorage.getItem("viewOrder")
    this.viewOrderDetials=JSON.parse(data)
    setTimeout(() => {
    
    console.log(this.viewOrderDetials)
      
    }, 1000);
  }

}
