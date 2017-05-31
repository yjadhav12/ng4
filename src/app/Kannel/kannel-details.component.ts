import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { KannelService } from './kannel.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'update-kannel', 
  templateUrl: './kannel-details.component.html',
  styleUrls: ['../users-mgmt/list-users.component.css']
})
export class KannelDetailsComponent implements OnInit {
  place: string;
  language: string;
  public kannelForm: FormGroup;
  results : any[]= [];
  kannel;
  selected: boolean = false; // Flag to check if a user is clicked or not
  selectedUser: any; // presently Selected user details
  error_text: string = ""; // So called error reporing text to the end user

  constructor(private kannelService : KannelService,
  private _fb: FormBuilder,
  private route: ActivatedRoute,
  private router: Router) {}
  ngOnInit() {
    console.log("In KannelDetailsComponent");
    // (+) converts string 'id' to a number
     this.kannelForm = this._fb.group({
            server: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
            kannelUrl:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            kannelUsername:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            kannelPassword:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            fromAddress:['', []],
            poolMin:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            poolMax:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            monitorUrl:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            monitorUsername:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            monitorPassword:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            smppReplyRout:['', []],
            smppDeliveryReceiptUrl:['', []],
            smsReplyRoute:['', []],
            smsDeliveryReceiptUrl:['', []],
            deliveryUrl:['', []],
            kannelSettingsId:['', []]
        });
    this.route.params     
      //.switchMap((params: Params) => this.kannelService.getAllBindsForKannelId(+params['id'])).subscribe(
        .switchMap((params: Params) => this.kannelService.getKannelSetting(+params['id'])).subscribe(
        res => {
          this.kannel = res;
          this.kannelForm = res;
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
  
  updateKannel(kannel) {
   console.log("updating kannel :"+kannel.server);
    this.kannelService.updateKannel(kannel)
    .subscribe((response) => {
      //DO SOMETHING, THEN ----
      this.router.navigate(['adminPage/kannel']);
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