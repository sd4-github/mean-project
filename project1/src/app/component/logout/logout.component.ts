import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { StorageServiceService } from '../../service/storage-service.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private serv2:StorageServiceService,private rout1:Router) { }
//constructor(){}
  var1:any;
name:any;
email:any;

  ngOnInit(){
    this.var1=this.serv2.getAlldData();
    this.name=this.var1[0];
    this.email=this.var1[1];
    console.log(this.var1);
  }

  // logout(){
  //   this.serv2.destroyToken();
  //   this.rout1.navigate(['/login'])
  //     console.log(this.var1);
  //  }
}

