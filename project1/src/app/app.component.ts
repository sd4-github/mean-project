import { Component } from '@angular/core';

import * as $ from 'jquery';
import { StorageServiceService } from './service/storage-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project1';
  userToken=null;
constructor(private store:StorageServiceService,private router:Router){
   this.userToken=this.store.getToken();

}

   logout(){
    this.store.destroyToken();
    this.router.navigate(['/login'])
      
    }
}
