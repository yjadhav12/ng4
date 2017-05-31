import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { KannelService } from './kannel.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


import 'rxjs/add/operator/switchMap';

export class BindForm {
  id:any;
}

@Component({
  selector: 'update-bind', 
  templateUrl: './bind-details.component.html',
  styleUrls: ['../users-mgmt/list-users.component.css']
})
export class BindDetailsComponent implements OnInit {
  place: string;
  language: string;
  public userForm: FormGroup;

  bindForm : BindForm;
  results : any[]= [];
  bind;
  selected: boolean = false; // Flag to check if a user is clicked or not
  selectedUser: any; // presently Selected user details
  error_text: string = ""; // So called error reporing text to the end user
  kannelList : any[] = []; 
  
  list: [boolean,string][];
  constructor(private kannelService : KannelService,
  private _fb: FormBuilder,
  private route: ActivatedRoute,
  private router: Router) {
this.list = [
          
          [false, "Apple"],
          [false, "Banana"], 
          [false, "Grapes"],
          [true, "Mango"]
        ];

  }
  ngOnInit() {
    console.log("In BindDetailsComponent");
    // (+) converts string 'id' to a number
    this.getAllKannelSettings();
   
    this.route.params     
      .switchMap((params: Params) => this.kannelService.getBind(+params['id'])).subscribe(
        res => {
          console.log(res.kannelSettings.kannelSettingsId);
          
          this.bind = res;
        },
        error => {
          
          this.error_text = "Sorry! No Binds found. Try again";
          console.error(error);
        }
      );
  }
  cancel(){
    this.router.navigate(['adminPage/kannel']);
  }
  
  updateBind(bind) {
   // bind.kannelSettings.kannelSettingsId = this.kannelSettingsId ;
   console.log("updating bind :"+bind.kannelSettings.kannelSettingsId +" with ");
    this.kannelService.updateBind(bind)
    .subscribe((response) => {
      //DO SOMETHING, THEN ----
      this.router.navigate(['adminPage/kannel']);
    }
    );
    
  }
trackByIdx(index: number, obj: any): any {
  console.log("index:"+index+" , Obj: "+obj);
        return index;
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

  getDetails(id: number) {
    this.kannelService.getKannelSetting(id).subscribe(
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