import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './appError/not-found/not-found.component';
import { ServerErrorComponent } from './appError/server-error/server-error.component';
import { TestErrorComponent } from './appError/test-error/test-error.component';
import { AuthGuard } from './appGuard/auth';
import { HomeComponent } from './appHome/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  { path: 'test-error', component: TestErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'shop', loadChildren: () => import('./appShop/shop/shop.module').then(mod => mod.ShopModule) },
  { path: 'basket', loadChildren: () => import('./appShopBasket/basket.module').then(mod => mod.BasketModule) },
  { path: 'checkout', loadChildren: () => import('./appShopCheckout/checkout.module').then(mod => mod.CheckoutModule), canActivate: [AuthGuard] },
  { path: 'account', loadChildren: () => import('./appAccount/account/account.module').then(mod => mod.AccountModule), data: { breadcrumb: { skip: true } } },
  // { path: 'orders', loadChildren: () => import('./appShopOrder/orders/orders.module').then(mod => mod.OrdersModule), data: { breadcrumb: 'orders' }, canActivate: [AuthGuard] },
  { path: 'orders', canActivate: [AuthGuard], loadChildren: () => import('./appShopOrder/orders/orders.module').then(mod => mod.OrdersModule) },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
