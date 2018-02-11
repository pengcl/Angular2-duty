import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../config';
import {formDataToUrl} from '../utils/utils';

@Injectable()
export class EventService {

  constructor(private http: HttpClient) {
  }

  getEventTypeList(): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/event/getEventTypeList.ht')
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  /**
   * 新增事件
   *
   * @body {
   *    eventTitle:string;
   *    eventTypeId:number;
   *    custId:string;
   *    isNeedHousekeeper:boolean;
   *    startDate:string;
   *    endDate:string;
   * }
   */

  addEvent(body): Promise<any> {
    const prams = formDataToUrl(body);
    return this.http.post(Config.prefix.wApi + '/interface/event/addEvent.ht' + prams, {}, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getEventList(custId): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/event/getEventList.ht?custId=' + custId).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getEventDetail(eventId): Promise<any> {
    return this.http.get(Config.prefix.wApi + '/interface/event/getEventDetail.ht?eventId=' + eventId).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  /**
   * feedback
   *
   * @body {
   *    eventId:string;
   *    eventTitle:string;
   * }
   */
  feedback(body): Promise<any[]> {
    const prams = formDataToUrl(body);
    return this.http.post(Config.prefix.wApi + '/interface/event/feedBack.ht' + prams, {}, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
