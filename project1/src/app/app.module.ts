import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AboutComponent } from './component/about/about.component';
import { LoginregistrationComponent } from './component/loginregistration/loginregistration.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { AdminProductFormComponent } from './component/admin-product-form/admin-product-form.component';
import { AdminProductComponent } from './component/admin-product/admin-product.component';
import { AdminEditComponent } from './component/admin-edit/admin-edit.component';
import { ProductlistComponent } from './component/productlist/productlist.component';
import { ProductdetailsComponent } from './component/productdetails/productdetails.component';
//import { ProfileComponent } from './component/profile/profile.component';
import { LogoutComponent } from './component/logout/logout.component';

import { RouteModule } from './router/route/route.module';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthguardGuard } from './authguard.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';
import { CheckoutComponent } from './component/checkout/checkout.component';






@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginregistrationComponent,
    NavigationComponent,
    AdminProductFormComponent,
    AdminProductComponent,
    AdminEditComponent,
    ProductlistComponent,
    ProductdetailsComponent,
    CartComponent,
    OrderComponent,
    LogoutComponent,
    CheckoutComponent
    //ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouteModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule

  ],
  providers: [AuthguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
