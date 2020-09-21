import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductDataServiceService} from '../../services/product-data-service.service';
import {IProduct} from '../product';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators, ValidatorFn, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productID: number;
  product: IProduct;
  pageTitle: string;
  productFormGroup: FormGroup; // Variable that links html form with object in the component code

  validationMessages: { [key: string]: { [key: string]: string } } = {
    productName: {
                    required: 'Product name is required.',
                    minlength: 'Product name must be at least three characters.',
                    maxlength: 'Product name cannot exceed 30 characters.'},
    productCode: {
                    required: 'Product code is required.'},
    starRating: {
                    range: 'Rate the product between 1 (lowest) and 5 (highest).'}
  };
  errorMessage: any;

  constructor( private activateRoute: ActivatedRoute,
               private productDataServiceService: ProductDataServiceService,
               private formBuilder: FormBuilder
  ) {}


  ngOnInit(): void {

    this.productFormGroup = this.formBuilder.group({
      productName: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)]],
      productCode: ['', Validators.required],
      starRating: ['5', this.customizedRangeValidator(1, 5) ],
      tagsxx: this.formBuilder.array([]),
      description: ''
    });
    // ------------

    this.activateRoute.paramMap.subscribe({
      next: value => {
        this.productID = +value.get('id');
        this.loadProduct(this.productID);
      }, error: err => this.errorMessage = err
    });
  }

  loadProduct(ID: number): void {
    let resultFilter: IProduct[];

    this.productDataServiceService.getProducts().subscribe({
      next: allProducts => {
        resultFilter = allProducts.filter((one) => one.productId + '' === '' + ID);

        if (resultFilter.length > 0) {
          this.product = resultFilter[0];
          this.pageTitle = 'Edit Product';
        } else {
          this.product = {} as IProduct;
          this.pageTitle = 'Add Product';
        }
        // updating the form fields with Object retrieved fields
        this.productFormGroup.patchValue({
            productName: this.product.productName,
            productCode: this.product.productCode,
            starRating: this.product.starRating,
            description: this.product.description
          }
        );
      }, error: err => this.errorMessage = err
    });
  }

  saveProduct() {

  }

  deleteProduct() {

  }

  deleteTag(i: number) {
    this.tags.removeAt(i);
    this.tags.markAsDirty();
  }

  addTag() {
    this.tags.push(new FormControl() );
  }
  get tags(): FormArray {
    return this.productFormGroup.get('tagsxx') as FormArray;
}

  private customizedRangeValidator(min: number, max: number): ValidatorFn {

    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
        return { customizedOutOFRange: true };
      }
      return null;
    };

  }
}
