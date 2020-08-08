import { Injectable } from '@angular/core';

import { Productlist, Cart } from '../class/productlist';

import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartDelete } from '../class/cart-delete';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  product_list_routeUrl="http://localhost:4203/product_list_path";

  product_cart_routeUrl="http://localhost:4203/addcart";

  product_getcart_routeUrl="http://localhost:4203/cart_path";

product_deleteCart_routeUrl="http://localhost:4203/cart-delete-item";


  constructor(private http:HttpClient) { }

  getproductlist():Observable<Productlist>{
    return this.http.get<Productlist>(this. product_list_routeUrl).pipe(catchError(this.errorhandler))
  }
  getproductId(pId){
    return this.http.get(`${this.product_list_routeUrl}/${pId}`) 
   }
   postproductcart(cartvalue):Observable<Cart>{
    return this.http.post<Cart>(this. product_cart_routeUrl,cartvalue).pipe(catchError(this.errorhandler))
  }
  // getcart():Observable<Cart>{
  //   return this.http.get<Cart>(this. product_getcart_routeUrl).pipe(catchError(this.errorhandler))
  // }
  // getcart(){
  //   return this.http.get(this.product_getcart_routeUrl,user_id) 
  // }
  getcart(id){
    return this.http.get(`${this. product_getcart_routeUrl}/${id}`)
  }
  
  deleteitem(delete_Prod):Observable<CartDelete>{
    return this.http.post<CartDelete>(this.product_deleteCart_routeUrl,delete_Prod).pipe(catchError(this.errorhandler))
   }
   errorhandler(err:HttpErrorResponse){
     return throwError(err.error.message);
   }
}
