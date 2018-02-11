import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {Config} from '../config';
import {formDataToUrl} from '../utils/utils';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {
  }

  getOrders(type: string, id: string): Promise<any> {
    let url;
    if (type === 'employer') {
      url = Config.prefix.wApi + '/interface/order/getCustOrderList.ht?custId=' + id;
    }
    if (type === 'employee') {
      url = Config.prefix.wApi + '/interface/order/getHousekeeperOrderList.ht?housekeeperId=' + id;
    }
    return this.http.get(url)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
