import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute,Params,NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../shared/models/user.model';
import { JwtService } from '../../../shared/services/jwt.service';
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-buynow',
  templateUrl: './buynow.component.html',
  styleUrls: ['./buynow.component.css']
})
export class BuynowComponent implements OnInit {
  @ViewChild("myForm") myForm: NgForm;

  currentUser: any;
  subscription: Subscription;
  token:String;
  userAddress: any;
  data: User;
  out: boolean = true;
  addressopen:boolean=false;
  ordersopen:boolean=true;
  pamentoptions:boolean=true;
  loginopen:boolean=true;
  address: any;
  errors: String;
  index:number=0;
  items:any;
  length:number;
  url=environment.img_url;
  itemcount:string;
  orderDetials:any;
  cod:string;
  _removeItem:boolean=false;
  Orderprocess:boolean=true;
  Ordersuccess:boolean=false;
  manageOrders:boolean=true;
  paymentOptions:boolean=true;
  msg:any;
  totalPrice:number;
  constructor(
    private dashboardservice:DashboardService,
    private activeRouter:ActivatedRoute,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private jwtservice:JwtService,
  ) { 

    this.cod="";
    this.data = {
      fullname: '',
      pincode: '',
      mobile: '',
      address: '',
      city: '',
      state: '',
      addressid:''

    }

    this.token= this.jwtservice.getToken();   
    
    this.subscription = dashboardservice.currentUser.subscribe(
      user => {
        this.currentUser = user;
        this.initData(this.currentUser)

      })

    }

  initData(currentUser: any) {

    let id = currentUser.id;
    if (id) {
      this.dashboardservice.getAddress().subscribe(
        res => {

          this.userAddress = res;
          console.log(this.userAddress)

        })

    }

    if(id){
      setTimeout(()=>{
     this.dashboardservice.getItems(id).subscribe(
  res => { 
    this.items = res.items;
    this.totalPrice=0;
    
    (this.items).forEach(element => {
            
      this.totalPrice += parseInt(element.cost) * parseInt(element.qty)
         });
    this.length=this.items.length;
    if(this.length==1){
      this.itemcount="item";
    }else{
      this.itemcount="items";
    }
    console.log(res)
  })},1000)
}

  }
// add address field

  save(data) {
    let AddressId= "AD"+ Math.floor((Math.random() * 10000000) + 1);
    data.addressid=AddressId;

    // this.address = {
    //   addressid:AddressId,
    //   fullname: data.fullname,
    //   mobile: data.mobile,
    //   address: data.address + "," + data.city + "," + data.state + " " + "-" + " " + data.pincode
    // }
    this.out = true;
    console.log(data)
    this.dashboardservice.manageAddress(data).subscribe(res => {
      if (res) {
        this.dashboardservice.getAddress().subscribe(
          res => {

            this.userAddress = res;

          })
      }
    },
      err => {
        this.errors = err.msg;
        console.log(this.errors)
      })
      this.myForm.reset();

  }

  myAddress(e){
  this.index=e;
  }

  deliver(address){
  // console.log(address)
  this.address=address;
  this.addressopen=true;
  this.ordersopen=false;
  this.manageOrders=false;
  }

// Remove Items for orders

  remove(productid){
  // console.log(productid)
  let id = this.currentUser.id;
  this._removeItem=true;
  this.dashboardservice.deleteItem(productid) .subscribe(
      res => { 
        if(res.Success){
          
          setTimeout(()=>{
            this.dashboardservice.getItems(id).subscribe(res=>{
            this.items=res.items;
            console.log(this.items)            
            this.length=this.items.length;


            this.totalPrice=0;

            (this.items).forEach(element => {
            
         this.totalPrice += parseInt(element.cost) * parseInt(element.qty)
            });

            console.log(this.totalPrice);
            this.dashboardservice.sendPath(this.items.length);
            this._removeItem=false;
             
             setTimeout(() => {
              if(res){
                if(this.length==0){
                 window.alert("Your Cart is empty! plz add items to the cart. ");
                 this.router.navigate(['/']);
                }
               } 
             }, 300);
          
          })},1000);
       
         
        }
      
  })

  }
  placeOrder(){
    this.ordersopen=true;    
    this.pamentoptions=false;
    this.paymentOptions=false;
  }

  confirmOrder(){
    this.orderDetials={
      email:this.currentUser.email,
      address:this.address,
      items:this.items,  
      paymentMethod:this.cod,
      PayableAmount:this.totalPrice
    }
    console.log(this.orderDetials)
    this.dashboardservice.buyNow(this.orderDetials).subscribe(res=>{
    console.log(res);
   this.msg=res;
   if(this.msg.Success==true){
    this.Orderprocess=false;
    this.Ordersuccess=true;
    this.dashboardservice.deleteCart().subscribe(res=>{
      console.log(res);

      if(res.Success==true){
       let id = this.currentUser.id;        
        this.dashboardservice.getItems(id).subscribe(resp=>{
        this.items=resp.items;
        this.length=this.items.length;
        this.dashboardservice.sendPath(this.items.length);
         
        })
      }

    },
    err => {
      this.errors = err.msg;
      console.log(this.errors)
    })
    
  }
},
err => {
  this.errors = err.msg;
  console.log(this.errors)
})


  }
  cancel() {
 
      this.out = true;
    
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
  }

}
