import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AdminserviceService } from '../../service/adminservice.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  productlist:any;
  productarray:any;
    constructor(private service:AdminserviceService,private router:Router) { }
  
  
      ngOnInit(){
        this.service.getadminproduct().subscribe(data=>{
        this.productlist=data;
        this.productarray=this.productlist.product_data;
        console.log(this.productlist.product_data);
        })
    }

    delete(form){
      let prodId={productid:form.value.productid};
      if(window.confirm('are you sure')){
      
      console.log(prodId)
      this.service.deleteitem(prodId).subscribe(prod=>{
        console.log(prod);
        this.router.navigate(['/dashboard']);
      });
      }
    }

}
