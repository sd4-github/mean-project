import { Component, OnInit } from '@angular/core';
import { RoutServiceService } from '../../service/rout-service.service';
import { StorageServiceService } from '../../service/storage-service.service';
import * as $ from 'jquery';

import { FormGroup,FormControl,Validators,FormBuilder,FormArray } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
