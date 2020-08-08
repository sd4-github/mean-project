import { Injectable } from '@angular/core';


import { LoginClass } from '../class/login-class';
import { RegistrationClass } from '../class/registration-class';


import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoutServiceService {

  login_user:any;
  registration_user:any;
  
  login_routeUrl="http://localhost:4203/login";
  registration_routeUrl="http://localhost:4203/sign-up";
 

  constructor(private http:HttpClient) { }

  loginUser(login_user:LoginClass):Observable<LoginClass>{
    return this.http.post<LoginClass>(this.login_routeUrl,login_user).pipe(catchError(this.errorhandler))
  }

  createUser1(registration_user:RegistrationClass):Observable<RegistrationClass>{
    return this.http.post<RegistrationClass>(this.registration_routeUrl,registration_user).pipe(catchError(this.errorhandler))
  }
  
   errorhandler(err:HttpErrorResponse){
     return throwError(err.error.message);
   }

}
