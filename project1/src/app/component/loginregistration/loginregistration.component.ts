import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { FormGroup,FormControl,Validators,FormBuilder,FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutServiceService } from '../../service/rout-service.service';
import { StorageServiceService } from '../../service/storage-service.service';
@Component({
  selector: 'app-loginregistration',
  templateUrl: './loginregistration.component.html',
  styleUrls: ['./loginregistration.component.scss']
})
export class LoginregistrationComponent implements OnInit {

  constructor(private fb:FormBuilder,private service:RoutServiceService,private service1:StorageServiceService,private router:Router) { }
  userForm:FormGroup;
  user:any;
  count_reg:any=0;
  errorvalue_reg:any;

  loginForm:FormGroup;
  logindetails;
  count:any=0;
  errorvalue:any;
  error:any;

  ngOnInit() {
    document.querySelector('.img__btn').addEventListener('click', function() {
      document.querySelector('.cont').classList.toggle('s--signup');
    });
    this.userForm = this.fb.group({
      
      firstname: [null, [Validators.required, Validators.minLength(4)]],
      lastname:[null, [Validators.required, Validators.minLength(4)]],
      email:[null,[Validators.required,Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]],
      //address:[null,Validators.required],
      password:[null,[Validators.required,Validators.minLength(6),Validators.pattern('^[a-zA-Z ]*$')]]
      //alternateemail:this.fb.array([])
})
this.loginForm= this.fb.group({
  email:[null,[Validators.required,Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]],
  password:[null,[Validators.required,Validators.minLength(6),Validators.pattern('^[a-zA-Z ]*$')]]
})

  }

  // get alternateemail(){
  //   return this.userForm.get('alternateemail') as FormArray;
  // }
  
  // addalternateemail(){
  //   this.alternateemail.push(this.fb.control(''))
  // }

  registrationUser(){
    let formobj=this.userForm.getRawValue();
    this.service.createUser1(formobj).subscribe(
      user=>{
        this.count_reg++;
        formobj=alert(this.userForm.value.firstname +' , '+this.count);
        (console.log(user));
      },
      
       err=>{
        this.errorvalue_reg=err;
       console.log(err);

     }
    )
    }

    loginUser(){
      let formobj=this.loginForm.getRawValue();
      console.log(formobj);
      this.service.loginUser(formobj).subscribe(
        user=>{
          this.count++;
          formobj=alert(this.loginForm.value.firstname +' , '+this.count);
          
          (console.log(user));
          this.logindetails=user;
          this.service1.setTokenwithInitialData(this.logindetails.token,this.logindetails.user_name,this.logindetails.user_email,this.logindetails.user_id,this.logindetails.usertype);
          this.router.navigate(['/dashboard'])
        },
        err=>{
          this.errorvalue=err;
          console.log(err);
          // this.error='go to registration page  and register your email'
          // console.log(err+"register your profile");
  
        }
         
  
      )
    
    }

    // removeaddress(i:number){
    //   this.alternateemail.removeAt(i);
    // }
 

}
