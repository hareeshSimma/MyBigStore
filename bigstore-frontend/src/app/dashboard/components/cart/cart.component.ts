import { Component, OnInit,NgZone } from '@angular/core';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../shared/models/user.model';
import { Router } from '@angular/router';
import { JwtService } from '../../../shared/services/jwt.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  currentUser: any;
  subscription: Subscription;
  items:any;
  length:string;
  token:String;
  totalamount:number;
  _isLoder:boolean=true;
  _dotLoder:boolean;
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
      //  this.dashboardservice.sendPath(this.length);

      })
    }
  }
//   ngAfterContentChecked()  {
//   //  let total = 0;
//    this.totalamount = this.items.reduce(funtion(runningValue: number, this.items)=> {
//       runningValue = runningValue + (item.cost * item.qty);
//     }, 0);

//     // for (var i = 0; i < this.items.length; i++) {
//     //     if (this.items[i].amount) {
//     //         total += this.items[i].amount;
//     //         this.totalamount = total;
//     //     }
//     // }
//     // return total;
// }
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
                  
                  // console.log("updated view",res);
                  setTimeout(()=>{this.dashboardservice.getItems(id).subscribe(resp=>{
                    // console.log(resp.items);
                    this.items=resp.items;
                    this.length=this.items.length;
                     this.dashboardservice.sendPath(this.items.length);
                   this._dotLoder=false;
                   
                  })},1000);
                 
                }
                // this.removeByAttr(this.items,"orderId",itemId);
                this.router.navigate(['/cart'])
          })
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

  ngOnInit() {

  }

}
