import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AboutComponent } from '../../component/about/about.component';
import { LoginregistrationComponent } from '../../component/loginregistration/loginregistration.component';
import { ProductdetailsComponent } from '../../component/productdetails/productdetails.component';
import { NavigationComponent } from '../../component/navigation/navigation.component';
import { AdminProductFormComponent } from '../../component/admin-product-form/admin-product-form.component';
import { AdminProductComponent } from '../../component/admin-product/admin-product.component';
import { AdminEditComponent } from '../../component/admin-edit/admin-edit.component';
import { ProductlistComponent } from '../../component/productlist/productlist.component';
import {  CartComponent } from '../../component/cart/cart.component';
import { OrderComponent } from '../../component/order/order.component';
//import { ProfileComponent } from '../../component/profile/profile.component';
import { LogoutComponent } from '../../component/logout/logout.component';
import { CheckoutComponent } from '../../component/checkout/checkout.component';


import { RouterModule,Routes } from '@angular/router';
import { AuthguardGuard } from '../../authguard.guard';




const routes:Routes=[{ path:'about',component:AboutComponent},
                      {path:'login',component:LoginregistrationComponent},
                      {path:'product',component:ProductlistComponent},
                      {path:'product/:id',component:ProductdetailsComponent},
                      {path:'dashboard',component:NavigationComponent,canActivate:[AuthguardGuard]},
                      {path:'addproduct',component:AdminProductFormComponent},
                      {path:'adminproduct',component:AdminProductComponent},
                      {path:'adminedit/:id',component:AdminEditComponent},
                      {path:'cart/:id',component:CartComponent,canActivate:[AuthguardGuard]},
                      {path:'order',component:OrderComponent},
                     // {path:'logout',component:ProfileComponent,canActivate:[AuthguardGuard]},
                     {path:'logout',component:LogoutComponent,canActivate:[AuthguardGuard]},
                     {path:'checkout',component:CheckoutComponent,canActivate:[AuthguardGuard]},
                      {path:'',redirectTo:'/login',pathMatch:'full'}
                    ]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],exports:[RouterModule]
})
export class RouteModule { }
