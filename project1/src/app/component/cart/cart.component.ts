import { Component, OnInit } from '@angular/core';


import * as $ from 'jquery';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { Router } from '@angular/router';
import { StorageServiceService } from 'src/app/service/storage-service.service';
import { NgForOf } from '@angular/common';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  productlist:any;
  productarray:any;
  userid:any;
  cartid:any;
  a:any;
  constructor(private service:ProductServiceService,private router:Router,private s_service:StorageServiceService) {
 
    this.userid=this.s_service.getuserId()
     this.service.getcart(this.userid).subscribe(data=>{
        this.productlist=data;
        this.productarray=this.productlist.product;
       //console.log(this.productlist);
        console.log(this.productarray);
        var total=0;
        for(var i=0;i<this.productarray.length;i++){
          let p=this.productarray[i].price;
          let quan=this.productarray[i].quantity;
          let mul=(p*quan);
           total=total+mul;
        }

        console.log(total);
   
        // console.log(p);
        // console.log(quan);
        // console.log(total)
        // var b=this.productarray[0].price;
        // document.getElementById("cart-subtotal").innerHTML="ivy";
        })

      }


  ngOnInit() {}

  prodquantity(form){
    let quan={quantity:form.value.quantity};
    console.log(quan);
    this.service.postproductcart(quan).subscribe(product=>{
      console.log(product)
   
     // this.router.navigate(['/cart',this.userid])
    })
    }

    delete(cart){
      let cartId={cartid:cart.value.cartid};
      console.log(cartId)
      if(window.confirm('are you sure'))
      {
     // console.log(cartId)
      this.service.deleteitem(cartId).subscribe(prod=>{
        console.log(prod);
        this.router.navigate(['/product']);
      });
      }
    }


















//   /* Calculate line price */
//   var productRow = $(quantityInput).parent().parent();
//   // var price = parseFloat(productRow.children('.product-price').text());
//   var price=this.productarray.price;
//   console.log(price)
//   var quantity = $(quantityInput).val();
//   var linePrice = price * quantity;




//  /* Set rates + misc */
// var taxRate = 0.05;
// var shippingRate = 15.00; 
// var fadeTime = 300;


// // /* Assign actions */
// $('.product-quantity input').change( function() {
//   updateQuantity(this);
// });

// $('.product-removal button').click( function() {
//   removeItem(this);
// });


// /* Recalculate cart */
// function recalculateCart()
// {
//   var subtotal = 0;
  
//   /* Sum up row totals */
//   $('.product').each(function () {
//     subtotal += parseFloat($(this).children('.product-line-price').text());
//   });
  
// //   /* Calculate totals */
//   var tax = subtotal * taxRate;
//   var shipping = (subtotal > 0 ? shippingRate : 0);
//   var total = subtotal + tax + shipping;
  
// //   /* Update totals display */
//   $('.totals-value').fadeOut(fadeTime, function() {
//     $('#cart-subtotal').html(subtotal.toFixed(2));
//     $('#cart-tax').html(tax.toFixed(2));
//     $('#cart-shipping').html(shipping.toFixed(2));
//     $('#cart-total').html(total.toFixed(2));
//     if(total == 0){
//       $('.checkout').fadeOut(fadeTime);
//     }else{
//       $('.checkout').fadeIn(fadeTime);
//     }
//     $('.totals-value').fadeIn(fadeTime);
//   });
// }


// /* Update quantity */
// function updateQuantity(quantityInput)
// {
//   /* Calculate line price */
//   var productRow = $(quantityInput).parent().parent();
//   var price = parseFloat(productRow.children('.product-price').text());
//   var price=parseFloat(this.productarray.product.price);
//   console.log(price)
//   var quantity = $(quantityInput).val();
//   var linePrice = price * quantity;
  
// //   /* Update line price display and recalc cart totals */
//   productRow.children('.product-line-price').each(function () {
//     $(this).fadeOut(fadeTime, function() {
//       $(this).text(linePrice.toFixed(2));
//       recalculateCart();
//       $(this).fadeIn(fadeTime);
//     });
//   });  
// }


// /* Remove item from cart */
// function removeItem(removeButton)
// {
//   /* Remove row from DOM and recalc cart total */
//   var productRow = $(removeButton).parent().parent();
//   productRow.slideUp(fadeTime, function() {
//     productRow.remove();
//     //recalculateCart();
//   });
// }

//  }



  // this.router.paramMap.subscribe(info => {
  //   // console.log(info.get('id'));
  //     this.rout.getproductId(info.get('id')).subscribe(c =>{
  //       // console.log(c);
  //       this.productlist = c;
  //       this.productarray= this.productlist.product;
  //       console.log(this.productarray);
  //    })   
  //   });

}


