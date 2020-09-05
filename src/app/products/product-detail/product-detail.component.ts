import { Component, OnInit } from '@angular/core';
import {IProduct} from '../product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductDataServiceService} from '../../services/product-data-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: IProduct;
  pageTile = 'Product Detail';

  constructor( private currentRoute: ActivatedRoute,
               private router: Router,
               private productDataServiceService: ProductDataServiceService) {
  }
  ngOnInit(): void {
    const id = this.currentRoute.snapshot.paramMap.get('id');

    this.productDataServiceService.getProducts().subscribe({
      next: p => {
        this.product = p.filter((product) => '' + product.productId === id)[0];
      },
      error: e => {
        alert('error retrieving products');
        this.onBack();
      }
    });
    console.log( id);
  }
  onBack(): void {
    this.router.navigate(['/products']);
  }
}
