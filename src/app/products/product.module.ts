import {NgModule} from '@angular/core';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';

import {RouterModule} from '@angular/router';
import {ProductDetailGuard} from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';
import {ProductEditComponent} from './product-edit/product-edit.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {path: 'products/:id', component: ProductDetailComponent, canActivate: [ProductDetailGuard]},
      {path: 'products/:id/edit', component: ProductEditComponent}
    ]),
    SharedModule
  ]
})
export class ProductModule {
}
