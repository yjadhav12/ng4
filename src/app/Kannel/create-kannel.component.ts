import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { KannelService } from './kannel.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Kannel } from './kannel.interface';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'create-kannel', 
  templateUrl: './create-kannel.component.html',
  styleUrls: ['../users-mgmt/list-users.component.css']
})
export class CreateKannelComponent implements OnInit {
  place: string;
  language: string;
  public kannelForm: FormGroup;
  results : any[]= [];
  //kannel : Kannel;
  kannel : any;
  selected: boolean = false; // Flag to check if a user is clicked or not
  selectedUser: any; // presently Selected user details
  error_text: string = ""; // So called error reporing text to the end user

  constructor(private kannelService : KannelService,
  private _fb: FormBuilder,
  private route: ActivatedRoute,
  private router: Router) {}
  ngOnInit() {
    console.log("In CreateKannelComponent");
 
  this.kannelForm = this._fb.group({
            server: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
            kannelUrl:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            kannelUsername:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            kannelPassword:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            fromAddress:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            poolMin:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            poolMax:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            monitorUrl:['', []],
            monitorUsername:['', []],
            monitorPassword:['', []],
            smppReplyRout:['', []],
            smppDeliveryReceiptUrl:['', []],
            smsReplyRoute:['', []],
            smsDeliveryReceiptUrl:['', []],
            deliveryUrl:['', []],
            kannelSettingsId:['', []]
        });
    
  }
  cancel(){
    console.log("Cancelled");

    this.router.navigate(['adminPage/kannel']);
  }
  
  addKannel(kannel  ) {
   console.log("adding kannel :"+kannel);
    
    
    this.kannelService.addKannel(kannel)
    .subscribe((response) => {
      console.log("Call went through");

     // this.router.navigate(['adminPage/kannel']);
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