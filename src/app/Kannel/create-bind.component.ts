import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { KannelService } from './kannel.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Kannel } from './kannel.interface';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'create-kannel', 
  templateUrl: './create-bind.component.html',
  styleUrls: ['../users-mgmt/list-users.component.css']
})
export class CreateBindComponent implements OnInit {
  place: string;
  language: string;
  public bindForm: FormGroup;
  public kannelSettings : FormGroup;

  results : any[]= [];
  //kannel : Kannel;
  kannel : any;
  kannelList : any[] = []; 
  selected: boolean = false; // Flag to check if a user is clicked or not
  selectedUser: any; // presently Selected user details
  error_text: string = ""; // So called error reporing text to the end user

  constructor(private kannelService : KannelService,
  private _fb: FormBuilder,
  private route: ActivatedRoute,
  private router: Router) {}
  ngOnInit() {
  console.log("In CreateBindComponent");
  this.getAllKannelSettings();
  this.bindForm = this._fb.group({
           // kannelSettingsId: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
            defaultRoute:  ['', [<any>Validators.required, <any>Validators.minLength(1)]],
            networkName:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            host:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            userName:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            password:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            noRpNumber: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
            bindonshore: ['', []],
            kannelSettings : this._fb.group({
                kannelSettingsId: ['', Validators.required]
            })
        });
    
  }
  cancel(){
    this.router.navigate(['adminPage/kannel']);
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

  addBind(bind) {
   console.log("Adding Bind :"+bind.kannelSettings.kannelSettingsId);
    
   //let url = `${this.baseUrl}kannel/deleteBind/${bind.kannelSettingsId}`;

  console.log("Bind : "+JSON.stringify(bind));
    this.kannelService.addBind(bind)
    .subscribe((response) => {
      console.log("Call went through");
      this.router.navigate([`adminPage/viewBinds/${bind.kannelSettings.kannelSettingsId}`]);
      }
    );
    
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