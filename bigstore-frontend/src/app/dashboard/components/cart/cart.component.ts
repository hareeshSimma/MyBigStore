import { Component, OnInit,NgZone } from '@angular/core';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../shared/models/user.model';
import { Router } from '@angular/router';
import { JwtService } from '../../../shared/services/jwt.service';
import { environment } from '../../../../environments/environment';
import { window } from 'rxjs/operator/window';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  currentUser: any;
  subscription: Subscription;
  items:any;
  length:number;
  token:String;
  totalamount:number;
  _isLoder:boolean=true;
  _dotLoder:boolean;
  //url="https://mybigcart.herokuapp.com/images/";
  // url="http://localhost:3000/images/";
  
  url=environment.img_url;
  constructor(
    private dashboardservice:DashboardService,
    private router:Router,
    private jwtservice:JwtService,
    private zone:NgZone,
    
    
  ) { 
    this.token= this.jwtservice.getToken();
    
    this.subscription = dashboardservice.currentUser.subscribe(
      user => {
        this.currentUser = user;
         this.initData(this.currentUser)
      }
    );
  }

   initData(currentUser: any) {
    
    let id = currentUser.id;
    if(id){
    this.dashboardservice.getItems(id)
      .subscribe(
      res => {
        this._isLoder=false;
        this.items = res.items;
        this.length=this.items.length;

      })
    }
  }

  subtotal(items)
  { 
    
    var item=[];
      
      for (var i=0;i<items.length;i++)
      {
       item.push({
         pid:this.items[i].productId,
         qty:this.items[i].qty,
         cost:this.items[i].qty*this.items[i].cost
       })
    }
   
     this.dashboardservice.updateCartData(item).subscribe(
      res=>{
        console.log(res);
      }
    )
  }


getTotal() {
    let total = 0;
    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].cost) {
            total += this.items[i].cost*this.items[i].qty;
           this.totalamount = total;
        }
    }
    // console.log(total)
    return total;
}
  deleteCart(item){
   this._dotLoder=true;
  
    console.log(item);
      let id = this.currentUser.id;
    this.dashboardservice.deleteItem(item)
          .subscribe(
              res => {
                
                if(res.Success){
                  
                  setTimeout(()=>{
                    this.dashboardservice.getItems(id).subscribe(resp=>{
                    // console.log(resp.items);
                    this.items=resp.items;
                    this.length=this.items.length;
                     this.dashboardservice.sendPath(this.items.length);
                   this._dotLoder=false;
                   
                  })},1000);
                 
                }
                // this.removeByAttr(this.items,"orderId",itemId);
                this.router.navigate(['/cart']);
          })
  }

  checkout(total){
    // console.log(total)
    setTimeout(() => {
    this.router.navigate(['/buynow']);
      
    }, 1000);
  
  }





  // removeByAttr(arr, attr, value){
  //   var i = arr.length;
  //   while(i--){
  //       if( arr[i] 
  //           && arr[i].hasOwnProperty(attr) 
  //           && (arguments.length > 2 && arr[i][attr] === value ) ){ 
  //                 console.log(arguments);
  //           arr.splice(i,1);

  //       }
  //   }
  //   return arr;
  // }

   ngOnDestroy()
  {
    if(!this.token){
      this.router.navigate(['/login']);

    }else{
      this.subtotal(this.items);

    }
  }

  ngOnInit() {

  }

}
