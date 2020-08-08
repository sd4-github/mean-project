import { Component, OnInit } from '@angular/core';

import { FormGroup,FormControl,Validators,FormBuilder,FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AdminserviceService } from '../../service/adminservice.service';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent implements OnInit {

  constructor(private fb:FormBuilder,private service:AdminserviceService,private router:Router,private rout:ActivatedRoute ) { }
  adminprodForm:FormGroup;
  count_adminform:any=0;
  errorvalue_adminform:any;
  fileInputLabel:String;
  selectedImage=null;
  data:any;

  ngOnInit(): void {
    this.adminprodForm = this.fb.group({
      
      prodname: [null,Validators.required],
      prod_img:[''],
      prod_price:[null,Validators.required],
      prod_desc:[null,Validators.required]
      //alternateemail:this.fb.array([])
})
  }

  uploadFile(event){
    console.log(event);
  this.selectedImage=<File>event.target.files[0];     //entire value is stored in files array
  }
  



    addproduct(){
      let formobj=this.adminprodForm.getRawValue();
     
  let formData=new FormData();
  
  formData.append('prod_img',this.selectedImage,this.selectedImage.name);
  
    formData.append("prodname", this.adminprodForm.value.prodname);
    formData.append("prod_price", this.adminprodForm.value.prod_price);
     formData.append("prod_desc", this.adminprodForm.value.prod_desc);
      this.service.addform(formData).subscribe(
        user=>{
          this.data=user;
          (console.log( this.data));
          this.router.navigate(['/adminproduct']);
        }
      )
  
    }

  }
  