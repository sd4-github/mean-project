import { Component, OnInit } from '@angular/core';

import { FormGroup,FormControl,Validators,FormBuilder,FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AdminserviceService } from '../../service/adminservice.service';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss']
})
export class AdminEditComponent implements OnInit {
product:any;
product_obj:any;
admineditproduct:FormGroup;
count_adminform:any;
count_editprod:any;
selectedImage:any;


constructor(private fb:FormBuilder,private service:AdminserviceService,private rout:Router,private router:ActivatedRoute) { 
  this.router.paramMap.subscribe(info => {
    // console.log(info.get('id'));
      this.service.getprodId(info.get('id')).subscribe(c =>{
        // console.log(c);
        this.product = c;
        this.product_obj=this.product.product_data;
        console.log(this.product_obj);
     })   
    });

  }


  ngOnInit() {
    this.admineditproduct= this.fb.group({
      productId:[null],
      prodname: [null],
      prod_img:[null],
      price:[null],
      description:[null]
      //alternateemail:this.fb.array([])
})
  
  }
  uploadFile(event){
    console.log(event);
  this.selectedImage=<File>event.target.files[0];
  }
  
    adminedit(){
     
    console.log(this.admineditproduct.value);
      let formData=new FormData();
   formData.append("productId", this.admineditproduct.value.productId);
  
   
    formData.append("prodname", this.admineditproduct.value.prodname);
    formData.append("price", this.admineditproduct.value.price);
    formData.append('prod_img',this.selectedImage,this.selectedImage.name);
     formData.append("description", this.admineditproduct.value.description);
    
     
      this.service.adminedit(formData).subscribe(
        prod=>{
          
          console.log(prod);
          this.rout.navigate(['/adminproduct']);
        }
      )
    }

}
