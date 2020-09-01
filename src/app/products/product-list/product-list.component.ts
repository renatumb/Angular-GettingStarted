import {Component, OnInit} from '@angular/core';
import {IProduct} from '../product';
import {ProductDataServiceService} from '../../services/product-data-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage: boolean;

  __listFilter01 = '';

  get listFilter01(): string {
    console.log( 'get ' + new Date());
    return this.__listFilter01;
  }

  set listFilter01(value: string) {
    console.log('set ' + new Date());
    this.__listFilter01 = value;
    this.filteredProducts = this.products.filter( (element: IProduct ) => {
        return element.productName.toLowerCase().indexOf( this.listFilter01.toLowerCase() ) > -1;
    } );
  }
  filteredProducts: IProduct[];
  products: IProduct[];

  constructor( private _productDataServiceService: ProductDataServiceService ) {
  }

  ngOnInit(): void {
    this.products = this._productDataServiceService.getProducts();
    this.listFilter01 = this.__listFilter01;
  }

  toggleImage() {
    this.showImage = !this.showImage;
  }

  productListLister($event: string) {
    this.pageTitle = $event;
  }
}
