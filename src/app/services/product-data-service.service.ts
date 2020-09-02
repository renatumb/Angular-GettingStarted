import {Injectable} from '@angular/core';
import {IProduct} from '../products/product';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductDataServiceService {

  private productUtl = 'api/products.json';


  constructor(private varHttp: HttpClient) {
  }

  getProducts(): Observable<IProduct[]> {
    return this.varHttp.get<IProduct[]>(this.productUtl).pipe(
      tap(data => console.log()),
      catchError(this.errorHandler)
    );
  }

  private errorHandler(err: HttpErrorResponse) {

    console.log(err);
    return throwError(err);
  }
}
