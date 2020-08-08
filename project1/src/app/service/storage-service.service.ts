import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor() { }

  setTokenwithInitialData(token:string,full_name:string,email:string,user_id:string,usertype:string){
    window.localStorage.setItem('token',token);
    window.localStorage.setItem('user_name',full_name);
    window.localStorage.setItem('user_email',email);
    window.localStorage.setItem('user_id',user_id);
    window.localStorage.setItem('usertype',usertype);
  }
   getUserType(){
    return window.localStorage.getItem('usertype')
  }
  
  getToken(){
    return window.localStorage.getItem('token')
  }
  getuserId(){
    return window.localStorage.getItem('user_id')
  }
  getAlldData(){
    const allData=[];

   allData.push(window.localStorage.getItem('user_name'),window.localStorage.getItem('user_email'),window.localStorage.getItem('user_id'))
    return allData;
  }

  destroyToken(){
    window.localStorage.clear();
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user_name');
    window.localStorage.removeItem('user_email');
    window.localStorage.removeItem('user_id');
   

  }
}
