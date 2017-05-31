import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { User } from '../users-mgmt/user.interface';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Kannel } from './kannel.interface';

@Injectable()
export class KannelService {

  //private searchUsersEndPoint = "https://api.github.com/search/users?q=";
  private baseUrl = environment.baseUrl;
  private data;
  private  Response;
  constructor(private http: Http,
  private route: ActivatedRoute,
  private router: Router) { }
  static moduleName;

  getAllKannelSettings() {
    let url;
    url = `${this.baseUrl}kannel/getSettings`;
    console.log(url);

    return this.http.get(url)
      .map(this.extractData)
      ;
  }

  getKannelSetting(id : number) {
    let url;
    url = `${this.baseUrl}kannel/getSetting/${id}`;
    console.log(url);

    return this.http.get(url)
      .map(this.extractData)
      ;
  }

  getAllBindsForKannelId(id : number) {
   if (id) {
      let url = `${this.baseUrl}kannel/getBindings/${id}`;
      console.log(url);

      return this.http.get(url)
        .map((res: Response) => res.json())
        .catch(this.handleError);
    }
  }

  getBind(id : number) {
   if (id) {
      let url = `${this.baseUrl}kannel/getBind/${id}`;
      console.log(url);

      return this.http.get(url)
        .map((res: Response) => res.json())
        .catch(this.handleError);
    }
  }

  // deleteKannel(id : number) {
   
  //     let url = `${this.baseUrl}kannel/deleteKannel/${id}`;
  //     console.log(url);

  //      return this.http.delete(url)
  //     .catch(this.handleError);      
    
  // }

  deleteBind(id : number) {
   
      let url = `${this.baseUrl}kannel/deleteBind/${id}`;
      console.log(url);

       return this.http.delete(url)
      .catch(this.handleError);      
    
  }

  addKannel(kannel ) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.baseUrl}kannel/addSetting`;

    console.log(url +" , DATA :" +JSON.stringify(kannel));

    return this.http.post(url,JSON.stringify(kannel), {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);

    }
  

 updateKannel(kannel) {
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (kannel) {
      let url = `${this.baseUrl}kannel/updateKannel`;
      console.log(url);
     // console.log(userUpdate.userDetailsId);

      return this.http.put(url,JSON.stringify(kannel), {headers: headers})
        .map(this.extractData)
      .catch(this.handleError);

      // this.router.navigate(['/user-logs']);

    }
  }

  addBind(bind) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (bind) {
      let url = `${this.baseUrl}kannel/addBinding`;
      console.log(url);

     return this.http.post(url,JSON.stringify(bind), {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
    }
  }

  updateBind(bind) {
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (bind) {
      let url = `${this.baseUrl}kannel/updateBind`;
      console.log(url);
      console.log(JSON.stringify(bind));


      return this.http.put(url,JSON.stringify(bind), {headers: headers})
        .map(this.extractData)
      .catch(this.handleError);

      // this.router.navigate(['/user-logs']);

    }
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}