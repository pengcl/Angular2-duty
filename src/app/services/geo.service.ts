import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoaderService} from './loader.service';
import {Config} from '../config';

@Injectable()
export class GeoService {

  constructor(private http: HttpClient, private load: LoaderService) {
  }

  get(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.load.loadScript('https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js ').then((res) => {
        resolve(res.loaded === true);
      }).catch(() => {
        resolve(false);
      });
    });
  }

  getLocation(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(callback);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  getPosition(location): Promise<any> {
    return this.http.get(Config.prefix.api + '/location/location?location=' + location).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getMap(location): Promise<any> {
    return this.http.get(Config.prefix.api + '/location/map?title=' + location.title + '&address=' + location.address + '&location=' + location.location).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
