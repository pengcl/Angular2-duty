import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {Config} from '../config';

@Injectable()
export class MessagesService {

  constructor(private http: HttpClient) {
  }

  getMessages(customerId, type) {
    return this.http.get(Config.prefix.wApi + '/interface/message/getList.ht?custId=' + customerId + '&type=' + type)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
