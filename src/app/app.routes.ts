import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViewlistComponent } from './viewlist/viewlist.component';
import { SigninComponent } from './signin/signin.component';
import { CustomerComponent } from './customer/customer.component';
import { SellerComponent } from './seller/seller.component';
import { ProductlistComponent } from './productlist/productlist.component';

import { RoleComponent } from './role/role.component';
import { RolelistComponent } from './rolelist/rolelist.component';
import { HomeComponent } from './home/home.component';
import { CustomerproductComponent } from './customerproduct/customerproduct.component';
import { DescibeproductComponent } from './descibeproduct/descibeproduct.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'home',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'admin',component:ViewlistComponent},
    {path:'signin',component:SigninComponent},
    {path:'edit/:id',component:SigninComponent},
    {path:'customer',component:CustomerComponent},
    {path:'seller',component:SellerComponent},
    {path:'productlist',component:ProductlistComponent},
    {path:'prodedit/:id',component:SellerComponent},
    {path:'customprod',component:CustomerproductComponent},
    {path:'describeprod/:id',component:DescibeproductComponent},
    { path: 'product/:id', component: DescibeproductComponent },
    { path: 'cart', component: CartComponent },
    {path:'wish',component:WishlistComponent},
    {path:'role',component:RoleComponent},
    {path:'rolelist',component:RolelistComponent}
    
];
