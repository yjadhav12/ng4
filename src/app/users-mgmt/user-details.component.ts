import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { ListUsersService } from '../list-users.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from './user.interface';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'user-details', 
  templateUrl: './user-details.component.html',
  styleUrls: ['./list-users.component.css']
})
export class UserDetailsComponent implements OnInit {
  place: string;
  language: string;
  public userForm: FormGroup;
  results : any[]= [];
  user: User; // This will hold the data coming from the service
  selected: boolean = false; // Flag to check if a user is clicked or not
  selectedUser: any; // presently Selected user details
  error_text: string = ""; // So called error reporing text to the end user

  constructor(private listUsersService: ListUsersService,
  private _fb: FormBuilder,
  private route: ActivatedRoute,
  private router: Router) {}
  ngOnInit() {
    console.log("In UserDetailComponent");
     // (+) converts string 'id' to a number
    this.route.params     
      .switchMap((params: Params) => this.listUsersService.getDetailsByUserName(+params['id'])).subscribe(
        user => {
          this.user = user;
        },
        error => {
          
          this.error_text = "Sorry! No Users found. Try again";
          console.error(error);
        }
      );
      //console.log("Returnig User"+this.user.userDetailsId+" "+ this.user.firstName);
      //.subscribe((selectedUser: User) => this.hero = hero);
  }
  cancel(){
    this.router.navigate(['/users-list']);
  }
  updateUser(user: User) {
   console.log("updating user"+user.firstName);
    this.listUsersService.updateUser(user)
    .subscribe((response) => {
      //DO SOMETHING, THEN ----
      this.router.navigate(['/users-list']);
    }
    );
    
  }

  getDetails(username: number) {
    this.listUsersService.getDetailsByUserName(username).subscribe(
      userDetails => {
        this.selectedUser = userDetails;
        this.selected = true;
      },
      error => {
        this.selected = false;
        console.error(error);
      }
    )
}
}