import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { KannelService } from './kannel.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Kannel } from './kannel.interface';


import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'create-user', 
  templateUrl: './kannel.component.html',
  styleUrls: ['../users-mgmt/list-users.component.css']
})
export class KannelComponent implements OnInit {
  place: string;
  language: string;

  public userForm: FormGroup;
  public submitted: boolean;
  kannelList;
  public events: any[] = [];

  //user: User; // This will hold the data coming from the service
  selected: boolean = false; // Flag to check if a user is clicked or not
  selectedUser: any; // presently Selected user details
  error_text: string = ""; // So called error reporing text to the end user

  constructor(private kannelService: KannelService,
  private _fb: FormBuilder,
  private route: ActivatedRoute,
  private router: Router
  ) {}

 
    //         userDetailsId: number; // required with minimum 5 chracters
    // userName : string;
    // password : string;
    // firstName : string;
    // lastName : string;
    // emailId : string;
    // role : string;


 
  ngOnInit() {
    console.log("In KannelComponent");
    this.getAllKannelSettings();

     this.userForm = this._fb.group({
            firstName: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
            lastName:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            userName:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            password:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            confirmPassword:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            emailId:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            role:['', [<any>Validators.required, <any>Validators.minLength(1)]]
        });

     this.subcribeToFormChanges();       
    
  }

     subcribeToFormChanges() {
        const myFormStatusChanges$ = this.userForm.statusChanges;
        const myFormValueChanges$ = this.userForm.valueChanges;
        
        myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    }

    getAllKannelSettings(){
      this.selected = false;
    this.error_text = "";
         
      this.kannelService.getAllKannelSettings().subscribe(
        response => {
          this.kannelList = response;
          console.log(response[0].server);
          console.log(this.kannelList[0].server);
        },
        error => {
          this.kannelList = [];
          this.error_text = "Sorry! No Users found. Try again";
          console.error(error);
        }
      )

    }
 
 viewAllBinds(kannelSettingsId){
  console.log("view binds for : "+kannelSettingsId);

  this.router.navigate(['../viewBinds', kannelSettingsId], { relativeTo: this.route });
  
 }

 updateKannel(kannelSettingsId){
  console.log("update kannel for : "+kannelSettingsId);

  this.router.navigate(['../updateKannel', kannelSettingsId], { relativeTo: this.route });
  
 }

addNewKannel(){
  this.router.navigate(['../addKannel'], { relativeTo: this.route });
}

addNewBind(){
  this.router.navigate(['../addBind'], { relativeTo: this.route });
}
  // createUser(user: User) {
  //  console.log("updating user"+user.firstName);
  //   this..addUser(user)
  //   .subscribe((response) => {
  //     this.router.navigate(['/users-list']);
  //   }
  //   );
    
  // }

cancel(){
    this.router.navigate(['adminPage/kannel']);
  }

//   getDetails(username: number) {
//     this.listUsersService.getDetailsByUserName(username).subscribe(
//       userDetails => {
//         this.selectedUser = userDetails;
//         this.selected = true;
//       },
//       error => {
//         this.selected = false;
//         console.error(error);
//       }
//     )
// }

}