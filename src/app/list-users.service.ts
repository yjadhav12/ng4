import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import { environment } from '../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { User } from './users-mgmt/user.interface';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Injectable()
export class ListUsersService {

  //private searchUsersEndPoint = "https://api.github.com/search/users?q=";
  private searchUsersEndPoint =  environment.usersApiUrl;
  private getUserDetailsEndPoint = environment.usersApiUrl;
  private baseUrl = environment.baseUrl;
  private data;
  private  Response;
  constructor(private http: Http,
  private route: ActivatedRoute,
  private router: Router) { }
  static moduleName;
// Observable string sources
    private missionAnnouncedSource = new Subject<boolean>();
    private missionConfirmedSource = new Subject<boolean>();

    // Observable string streams
    missionAnnounced$ = this.missionAnnouncedSource.asObservable();
    missionConfirmed$ = this.missionConfirmedSource.asObservable();

    // Service message commands
    announceMission(mission: string) {
        console.log(mission);
       //this.missionAnnouncedSource.next(mission);
    }

    confirmMission(astronaut: string) {
        console.log(astronaut);
        //this.missionConfirmedSource.next(astronaut);
    }
  isAdmin = false;
  switchModule(){
      this.isAdmin= !this.isAdmin;
      this.missionConfirmedSource.next(this.isAdmin);
      console.log("returning isAdmin "+ this.isAdmin);
      return this.isAdmin;

    // if(this.isAdmin){
    //   this.isAdmin= false;
    //   this.missionConfirmedSource.next(this.isAdmin);
    //   console.log("returning admin "+ this.isAdmin);
    //   return this.isAdmin;
    //   //return "admin";
    // }
    // else{
    //   this.isAdmin= true;
    //   this.missionConfirmedSource.next(this.isAdmin);
    //   console.log("returning user "+ this.isAdmin);
    //   return this.isAdmin;
    //   ///return "user";
    // }
    
  }

  
  isAdminUser(){
    ListUsersService.moduleName = !ListUsersService.moduleName;
    return !ListUsersService.moduleName;
}
  getAllUsers() {
    let url;
    url = `${this.searchUsersEndPoint}listAllUsers`;
    console.log(url);

    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAllActivityLogs() {
    let url;
    url = `${this.baseUrl}logs/getAllLogs`;
    
    console.log(url);

    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getDetailsByUserName(username: number) {
    if (username) {
      let url = `${this.getUserDetailsEndPoint}${username}`;
      console.log(url);

      return this.http.get(url)
        .map((res: Response) => res.json())
        .catch(this.handleError);
    }
  }

  deleteUser(username: number) {
    if (username) {
      let url = `${this.getUserDetailsEndPoint}${username}`;
      console.log(url);

       this.http.delete(url)
      .catch(this.handleError).subscribe();

       return this.getAllUsers();
    }
  }

  updateUser(userUpdate: User) {
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (userUpdate) {
      let url = `${this.getUserDetailsEndPoint}${userUpdate.userDetailsId}`;
      console.log(url);
     // console.log(userUpdate.userDetailsId);

      return this.http.put(url,JSON.stringify(userUpdate), {headers: headers})
        .map(this.extractData)
      .catch(this.handleError);

      // this.router.navigate(['/user-logs']);

    }
  }

  addUser(user: User) {
    let headers = new Headers();
  headers.append('Content-Type', 'application/json');
    if (user) {
      let url = `${this.getUserDetailsEndPoint}addUser`;
      console.log(url);

     return this.http.post(url,JSON.stringify(user), {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
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