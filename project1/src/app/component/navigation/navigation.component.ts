import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RoutServiceService } from '../../service/rout-service.service';
import { StorageServiceService } from '../../service/storage-service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
   productlist:any;
   userToken=null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    constructor(private breakpointObserver: BreakpointObserver,private rout:RoutServiceService,private getToken:StorageServiceService) {
      this.userToken=this.getToken.getUserType();
      console.log(this.userToken);
      }

}

