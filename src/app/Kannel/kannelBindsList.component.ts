import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { KannelService } from './kannel.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../users-mgmt/user.interface';


import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'create-user', 
  templateUrl: './kannelBindsList.component.html',
  styleUrls: ['../users-mgmt/list-users.component.css']
})
export class KannelBindListComponent implements OnInit {
  place: string;
  language: string;

  public userForm: FormGroup;
  public submitted: boolean;
  kannelList : any[]= [];
  public events: any[] = [];

  binds;
  kannelSettingsId;

  user: User; // This will hold the data coming from the service
  selected: boolean = false; // Flag to check if a user is clicked or not
  selectedUser: any; // presently Selected user details
  error_text: string = ""; // So called error reporing text to the end user

  constructor(private kannelService: KannelService,
  private _fb: FormBuilder,
  private route: ActivatedRoute,
  private router: Router
  ) {}

 private sub: any;
  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {
       this.kannelSettingsId = +params['id']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
    });

    console.log("In KannelBindListComponent"+this.kannelSettingsId);

    // (+) converts string 'id' to a number - [key: string]: any;
    this.route.params     
      .switchMap((params: Params) => this.kannelService.getAllBindsForKannelId(+params['id'])).subscribe(
        res => {
          this.binds = res;
          //this.kannelSettingsId = params['id'];
          console.log("Bind Result : "+res.length);
        },
        error => {
          
          this.error_text = "Sorry! No Binds found. Try again";
          console.error(error);
        }
      );

  
    
  }

getAllBindsByKannel(kannelSettingsId){

  this.kannelService.getAllBindsForKannelId(kannelSettingsId).subscribe(
        res => {
          this.binds = res;
          console.log("Bind Result : "+res.length);
        },
        error => {
          
          this.error_text = "Sorry! No Binds found. Try again";
          console.error(error);
        }
      )
}

  
editBind(kannelMappingId){
  console.log("Editing Bind"+ kannelMappingId);
  
  //this.router.navigate(['./editBind', kannelMappingId]);
  this.router.navigate(['adminPage/editBind', kannelMappingId]);
}

deleteBind(kannelMappingId){
  console.log("Deleteing Bind"+ kannelMappingId);
console.log("Redirecting to binds for :"+this.kannelSettingsId);
this.kannelService.deleteBind(kannelMappingId).subscribe(
        users => {
          this.getAllBindsByKannel(this.kannelSettingsId);
         //this.router.navigate(['../viewBinds', this.kannelSettingsId], { relativeTo: this.route });
        },
        error => {
          this.binds = [];
          this.error_text = "Sorry! No Users found. Try again";
          console.error(error);
        }
    );
}


cancel(){
    this.router.navigate(['/kannel']);
  }

}