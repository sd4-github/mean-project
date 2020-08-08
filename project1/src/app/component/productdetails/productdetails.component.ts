import { Component, OnInit } from '@angular/core';

import { ProductServiceService } from '../../service/product-service.service';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {

  productlist:any;
  productarray:any;
    constructor(private rout:ProductServiceService,private router:ActivatedRoute) { }
  
  
      ngOnInit(){
        $(document).ready(function() {
 
          $('.color-choose input').on('click', function() {
              var headphonesColor = $(this).attr('data-image');
         
              $('.active').removeClass('active');
              $('.left-column img[data-image = ' + headphonesColor + ']').addClass('active');
              $(this).addClass('active');
          });
        });

        this.router.paramMap.subscribe(info => {
          // console.log(info.get('id'));
            this.rout.getproductId(info.get('id')).subscribe(c =>{
              // console.log(c);
              this.productlist = c;
              this.productarray= this.productlist.product;
              console.log(this.productarray);
           })   
          });
        }
    }

