import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { User } from '../users-mgmt/user.interface';
import { ActivatedRoute, Router, Params } from '@angular/router';

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

  // // Observable string sources
  // private missionAnnouncedSource = new Subject<boolean>();
  // private missionConfirmedSource = new Subject<boolean>();

  // // Observable string streams
  // missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  // missionConfirmed$ = this.missionConfirmedSource.asObservable();

  // // Service message commands
  // announceMission(mission: string) {
  //     console.log(mission);
  //     //this.missionAnnouncedSource.next(mission);
  // }

  // confirmMission(astronaut: string) {
  //     console.log(astronaut);
  //     //this.missionConfirmedSource.next(astronaut);
  // }
  

  getAllGatewayNumbers() {
    let url;
    url = `${this.baseUrl}addgatewaynumber/numbers`;
    console.log(url);

    return this.http.get(url)
      .map(this.extractData)
      ;
  }

  getAllSmscList() {
    let url;
    url = `${this.baseUrl}country/smsc`;
    console.log(url);

    return this.http.get(url)
      .map(this.extractData)
      ;
  }

  addUser(country: String) {
    let headers = new Headers();
  headers.append('Content-Type', 'application/json');

    if (country) {
      let url = `${this.baseUrl}country/add/${country}`;
      console.log(url);
     
    return this.http.get(url)
       .map(this.extractData)
       .catch(this.handleError);

    }
  }

  getSmscMapping(countryId: number) {
    if (countryId) {
      let url = `${this.baseUrl}country/${countryId}`;
      console.log(url);

      return this.http.get(url)
        .map((res: Response) => res.json())
        .catch(this.handleError);
    }
  }

  deleteSmscMapping(smsMappingId : number, smscSelectionId : number, countryId : number) {
   
      let url = `${this.baseUrl}country/delete/${smsMappingId}/${smscSelectionId}`;
      console.log(url);

       this.http.get(url)
      .catch(this.handleError).subscribe();

       return this.getSmscMapping(countryId);
    
  }
  //create/{countryId}/{prefix}/{priority}/{smscId}

addSmscMapping(smscForm, countryId) {
   
      let url = `${this.baseUrl}country/create/${countryId}/${smscForm.prefix}/${smscForm.priority}/${smscForm.smscId}`;
      console.log(url);

       this.http.get(url)
      .catch(this.handleError).subscribe();

       return this.getSmscMapping(countryId);
    
  }


  updateGateWay(gatewayNumbersId, routingKey, isEnabled){
    
    routingKey = (routingKey==null||routingKey=='')?0:routingKey;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
      let url = `${this.baseUrl}addgatewaynumber/update?gatewayNumbersId=${gatewayNumbersId}&routingKey=${routingKey}&isEnabled=${isEnabled}`;
      console.log(url);

//update?gatewayNumbersId=206&routingKey=http://app7.dev1.whispir.net:8080/KannelEntrance?&isEnabled=false

     return this.http.post(url,JSON.stringify(gatewayNumbersId,routingKey,isEnabled), {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
    
  
  }

  deleteGateWay(gatewayNumbersId){
     let headers = new Headers();
    headers.append('Content-Type', 'application/json');
      let url = `${this.baseUrl}addgatewaynumber/delete?gatewayNumbersId=${gatewayNumbersId}`;
      console.log(url);

//update?gatewayNumbersId=206&routingKey=http://app7.dev1.whispir.net:8080/KannelEntrance?&isEnabled=false

     return this.http.post(url,{headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  // getAllActivityLogs() {
  //   let url;
  //   url = `${this.baseUrl}logs/getAllLogs`;
    
  //   console.log(url);

  //   return this.http.get(url)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  // getDetailsByUserName(username: number) {
  //   if (username) {
  //     let url = `${this.getUserDetailsEndPoint}${username}`;
  //     console.log(url);

  //     return this.http.get(url)
  //       .map((res: Response) => res.json())
  //       .catch(this.handleError);
  //   }
  // }

  // deleteUser(username: number) {
  //   if (username) {
  //     let url = `${this.getUserDetailsEndPoint}${username}`;
  //     console.log(url);

  //      this.http.delete(url)
  //     .catch(this.handleError).subscribe();

  //      return this.getAllUsers();
  //   }
  // }

  // updateUser(userUpdate: User) {
    
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   if (userUpdate) {
  //     let url = `${this.getUserDetailsEndPoint}${userUpdate.userDetailsId}`;
  //     console.log(url);
  //    // console.log(userUpdate.userDetailsId);

  //     return this.http.put(url,JSON.stringify(userUpdate), {headers: headers})
  //       .map(this.extractData)
  //     .catch(this.handleError);

  //     // this.router.navigate(['/user-logs']);

  //   }
  // }

 
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