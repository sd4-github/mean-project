import { Injectable } from '@angular/core';

import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable,throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AdminProductform } from '../class/admin-productform';
import { AdminProductlist } from '../class/admin-productlist';
import { AdminEdit } from '../class/admin-edit';
import { Deleteprod } from '../class/deleteprod';
import { StorageServiceService } from './storage-service.service';
@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  admin_prodform:any;
  admin_editProd:any;
  token=null;

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  adminprodform_routeUrl="http://localhost:4203/addproduct";
  
  adminproductview_routeUrl="http://localhost:4203/adminproduct";


  adminprodEdit_routeUrl="http://localhost:4203/admin/admin_edit_product";

  prodDelete_routeUrl="http://localhost:4203/admin/delete_prod";

  constructor(private http:HttpClient,private service:StorageServiceService) {this.token=this.service.getToken() }

  // addform(formData):Observable<AdminProductform>{
  //   var formData: any = new FormData();
  //   console.log(formData)
  //   return this.http.post<AdminProductform>(this.adminprodform_routeUrl,formData,{headers:new HttpHeaders({'Authorization':this.token})}).pipe(catchError(this.errorhandler))
  // }

  addform(admin_prodform):Observable<AdminProductform>{
    
    return this.http.post<AdminProductform>(this.adminprodform_routeUrl,admin_prodform);
  }

getadminproduct():Observable<AdminProductlist>{
  return this.http.get<AdminProductlist>(this.adminproductview_routeUrl,{headers:new HttpHeaders({'Authorization':this.token})}).pipe(catchError(this.errorhandler))
}
getproductId(pId){
  return this.http.get(`${this.adminproductview_routeUrl}/${pId}`) 
 }
 getprodId(pId){
  return this.http.get(`${this.adminprodEdit_routeUrl}/${pId}`).pipe(catchError(this.errorhandler))
 }
 adminedit(data):Observable<AdminEdit>{
  return this.http.post<AdminEdit>(this. adminprodEdit_routeUrl,data,{headers:new HttpHeaders({'Authorization':this.token})}).pipe(catchError(this.errorhandler))
 }

 deleteitem(delete_Prod):Observable<Deleteprod>{
  return this.http.post<Deleteprod>(this.prodDelete_routeUrl,delete_Prod,{headers:new HttpHeaders({'Authorization':this.token})}).pipe(catchError(this.errorhandler))
 }

//  deleteitem(pId:number):Observable<void> {
//    return this.http.delete<void>(`${this.adminproductview_routeUrl}/${pId}`).pipe(catchError(this.errorhandler))
//  }

 errorhandler(err:HttpErrorResponse){
   return throwError(err.error.message);
 }
}
