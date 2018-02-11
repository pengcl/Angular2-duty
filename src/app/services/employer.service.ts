import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {Config} from '../config';
import {formDataToUrl} from '../utils/utils';

@Injectable()
export class EmployerService {

  constructor(private http: HttpClient) {
  }

  getEmployer(id): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/cust/getCustDetail.ht?custId=' + id)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  getMyEmployees(employerId): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/housekeeper/getMyHousekeeper.ht?custId=' + employerId)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getOrders(id: string): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/order/getCustOrderList.ht?custId=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getProtocol(id: string): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/order/getProtocolContent.ht?contId=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getMyRates(id: string): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/housekeeper/getCustEvaluate.ht?custId=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  /*pay(id): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/order/getProtocolContent.ht?contId=' + id)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }*/

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
