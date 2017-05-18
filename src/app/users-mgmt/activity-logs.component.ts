import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { ListUsersService } from '../list-users.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from './user.interface';
import { FilteredList } from '../filters/filteredlist.component';
import {Observable} from 'rxjs/Rx';
import {FilterArrayPipe} from '../filters/filter.pipe';
import 'rxjs/add/operator/switchMap';

@Component({  
  moduleId: module.id,
  selector: 'activity-logs', 
  templateUrl: './activity-logs.component.html',
  styleUrls: ['./list-users.component.css']
  
})

export class ActivityLogComponent implements OnInit {
  public items: Observable<Array<any>>;
  private _items: Array<any>;
  place: string;
  language: string;
  userFilter: any = { userDetails: {userName: ''} };
  public userForm: FormGroup;
  public submitted: boolean;
  results : any[]= [];
  public events: any[] = [];

  public enableFilter: boolean;
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();

  user: User; // This will hold the data coming from the service
  selected: boolean = false; // Flag to check if a user is clicked or not
  selectedUser: any; // presently Selected user details
  error_text: string = ""; // So called error reporing text to the end user

  constructor(private listUsersService: ListUsersService,
  private _fb: FormBuilder,
  private route: ActivatedRoute,
  private router: Router
  ) {
    this._items = [];
    this.items = Observable.of(this.results);
    
    this.results.forEach(u => {
    u.filterTerm = `${(u.userName || '').toUpperCase()} }`;
    });
  
   

  }

 
    //         userDetailsId: number; // required with minimum 5 chracters
    // userName : string;
    // password : string;
    // firstName : string;
    // lastName : string;
    // emailId : string;
    // role : string;


 
  ngOnInit() {
    console.log("In ActivityLogComponent");
     this.getAllActivityLogs();

      this.filterPlaceholder = "Filter..";
     this.filterText = "";
    this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
        this.filterText = term;
        console.log(term);
       
       this.results.filter(u => {
        return u.userName.filterTerm.includes(this.filterText);
        });
      });
    
  }
 
 getAllActivityLogs() {
   console.log("getAllActivityLogs()");
  this.listUsersService.getAllActivityLogs().subscribe(
        users => {
          this.results = users;
        },
        error => {
          this.results = [];
          this.error_text = "Sorry! No logs found. Try again";
          console.error(error);
        }
      )
 }


}