import { Component, OnInit,ViewChild } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { Uplodeproducts } from '../../../../shared/models/uploadproducts.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { DashboardService } from '../../../../shared/services/dashboard.service';
import { JwtService } from '../../../../shared/services/jwt.service';
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { FileUploader,ParsedResponseHeaders } from 'ng2-file-upload';

@Component({
  selector: 'app-uplodeproducts',
  templateUrl: './uplodeproducts.component.html',
  styleUrls: ['./uplodeproducts.component.css'],

})
export class UplodeproductsComponent implements OnInit {
  @ViewChild("myForm") myForm: NgForm;
  @ViewChild("file") file:any;
  currentUser: any;
  subscription: Subscription;
  data:Uplodeproducts;
  private uploader: FileUploader;
  options:any;
  constructor(
    private dashboardservice:DashboardService,
    private router:Router,
    private jwtservice:JwtService,
  ) { 
    
    this.data = {
      productname:'',
      description:'',
      cost:'',
      weight:'',
      quantity:'',
      image:'',
      
    }
  }

  uploadProducts(data){
    this.uploader.onAfterAddingFile = (file)=> { 
      console.log("called");
      file.withCredentials = false; };
  data.image=this.uploader.queue[0].file.name;
  console.log(data,this.uploader.queue[0]);
  
  this.uploader.queue[0].upload();
  this.dashboardservice.uploadProductDetials(data).subscribe(res=>{
    // console.log(res);
    if(res.Success==true){
   this.myForm.reset();
   this.data.image = "";
   console.log(this.file.nativeElement.files);
   this.file.nativeElement.value="";
   this.uploader = new FileUploader(this.options);
   this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
   console.log(this.file.nativeElement.files);
   
  } 
  })
  
  }
  cancel(){
  this.router.navigate(['/']);

  }
  ngOnInit() {
    this.options = { url:"http://localhost:3000/uploads" }
    this.uploader = new FileUploader(this.options);
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader._onCompleteItem = (item: any, response: string, status: number,
      headers: ParsedResponseHeaders) => {
        console.log("oncomplete call")
      // this.uploaded.emit(item.file.size);
      console.log(item);
    };

  }

}
