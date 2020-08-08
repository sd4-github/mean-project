import { Component, OnInit } from '@angular/core';

import { ProductServiceService } from '../../service/product-service.service';
import { StorageServiceService } from 'src/app/service/storage-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {

productlist:any;
productarray:any;
userid:any;
  constructor(private rout: ProductServiceService,private service:StorageServiceService,private router:Router) { 
    this.userid=this.service.getuserId()
  }

  ngOnInit(){
    this.rout.getproductlist().subscribe(data=>{
    this.productlist=data;
    this.productarray=this.productlist.product_data;
    console.log(this.productlist.product_data);
    })
}



cart(form){
//let cartvalue={productId:form.value.productId,userId:form.value.userId};
let cartvalue={productId:form.value.productId,userId:form.value.userId,quantity:form.value.quantity};
console.log(cartvalue);
this.rout.postproductcart(cartvalue).subscribe(product=>{
  console.log(product)
  this.router.navigate(['/cart',this.userid])
})
 }
}
