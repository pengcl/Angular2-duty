import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/catch';

import {Config} from '../config';

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Promise<any> {
    return this.http.get(Config.prefix.api + '/lists').toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getProduct(id): Promise<any> {
    return this.http.get(Config.prefix.api + '/lists/' + id).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
