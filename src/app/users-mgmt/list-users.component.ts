import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ListUsersService } from '../list-users.service';
import {   Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-list-users',
   providers: [HttpModule],
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  place: string;
  language: string;

  results: any[] = []; // This will hold the data coming from the service
  selected: boolean = false; // Flag to check if a user is clicked or not
  selectedUser: any; // presently Selected user details
  error_text: string = ""; // So called error reporing text to the end user

  constructor(
    private listUsersService: ListUsersService,
    //private route: ActivatedRoute,
    private router: Router
  
    
    
    )
   {}
  ngOnInit() {
    this.getAllUsers();
  }

  editUser(userDetailsId : number){
    console.log("EditUser"+userDetailsId);

    this.router.navigate(['/editUser', userDetailsId]);
  }

  deleteUser(userDetailsId : number){
    console.log("Deleting User : "+userDetailsId);
    this.listUsersService.deleteUser(userDetailsId).subscribe(
        users => {
          this.getAllUsers();;
        },
        error => {
          this.results = [];
          this.error_text = "Sorry! No Users found. Try again";
          console.error(error);
        }
    );
    
    
  }

  list(place: string, language: string) {
    this.place = place;
    this.language = language;
    console.log(this.place, this.language);
  }

  getAllUsers() {
    this.selected = false;
    this.error_text = "";
         
      this.listUsersService.getAllUsers().subscribe(
        users => {
          this.results = users;
        },
        error => {
          this.results = [];
          this.error_text = "Sorry! No Users found. Try again";
          console.error(error);
        }
      )
    
  }

  getDetails(username: number) {
    this.listUsersService.getDetailsByUserName(username).subscribe(
      userDatils => {
        this.selectedUser = userDatils;
        this.selected = true;
      },
      error => {
        this.selected = false;
        console.error(error);
      }
    )
}
}