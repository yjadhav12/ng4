import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { GatewayNumbersService } from './gatewayNumbers-smsc.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { PagerService } from '../pagination.service';

class Smsc {
    smscId: number;
    prefix : string;
    name : string;
    priority : number;   
}

@Component({
 providers: [HttpModule],
  templateUrl: './gatewayNumbers.component.html',
  styleUrls: ['./country.component.css']
})
export class GatewayNumbersComponent implements OnInit{

gatewayNumbers : any[] = [];
gateway = this.gatewayNumbers[1];

response ;

smscList : any[] = []; 
error_text: string = ""; 

@ViewChild('gatewayForm') gatewayForm: FormGroup
ngForm : NgForm;  

countryToAdd : string;
selectedValue: string;
smsc : Smsc;



constructor( private gatewayNumbersService: GatewayNumbersService,
  private route: ActivatedRoute,
  private router: Router,
  private _fb: FormBuilder,
  private http: Http, private pagerService: PagerService){
  
  console.log("In GatewayNumbersComponent" );

}



 // array of all items to be paged
   // private allItems: any[];
 
    // pager object
    pager: any = {};
 
    // paged items
    pagedItems: any[];

ngOnInit() {
    console.log("Getting All GatewayNumbers" );
    this.getAllGatewayNumbers();
    

    this.gatewayForm = this._fb.group({
            smscId: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
            prefix:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            name:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            priority:['', [<any>Validators.required, <any>Validators.minLength(1)]]            
        });
  }

 setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
 
        

        // get pager object from service
        this.pager = this.pagerService.getPager(this.response.source.length, page);
        
        console.log("All Length:"+this.response.source.length+" pager"+this.pager.pages+" "+this.pager.pages.length);
        
        console.log("start n end:"+this.pager.startIndex, this.pager.endIndex);
        // get current page of items
        this.pagedItems = this.response.source.slice(this.pager.startIndex, this.pager.endIndex + 1);
        this.gatewayNumbers  = this.response.source.slice(this.pager.startIndex, this.pager.endIndex + 1);
         console.log("pagedItems are:"+this.pagedItems.length);
    }
  
  getAllGatewayNumbers() {
    this.error_text = "";
    
      this.gatewayNumbersService.getAllGatewayNumbers().subscribe(
        res => {
          this.gatewayNumbers = res;
          this.response = res;
          this.setPage(1);        

        },
        error => {
          this.gatewayNumbers = [];
          this.error_text = "Sorry! No country found. Try again";
          console.error(error);
        }
      )

    
  }
  alertDisplayed;
resStatusMsg ="";

  updateGateWay(gatewayNumbersId, routingKey, isEnabled){
    
    this.gatewayNumbersService.updateGateWay(gatewayNumbersId, routingKey, isEnabled)
    .subscribe((response) => {
      this.response = response;   
      this.resStatusMsg = response.status;
      this.getAllGatewayNumbers();
      this.alertDisplayed = true;
      setTimeout(() => {this.alertDisplayed = false;this.resStatusMsg = "";
      }
      , 1000);
    }
    );
    
  }

  deleteGateWay(gatewayNumbersId){
    
    this.gatewayNumbersService.deleteGateWay(gatewayNumbersId)
    .subscribe((response) => {
      this.response = response;   
      this.resStatusMsg = response.status;
      this.getAllGatewayNumbers();
      this.alertDisplayed = true;
      setTimeout(() => {this.alertDisplayed = false;this.resStatusMsg = "";
      }
      , 1000);
    }
    );
  }
 
  addGateway(gatewayForm) {
    console.log("AgatewayForm "+gatewayForm.gatewayAddress);

     this.gatewayNumbersService.addGateway(gatewayForm)
    .subscribe((response) => {
      //this.router.navigate(['/users-list']);
      this.getAllGatewayNumbers();
      this.gatewayForm.reset();
      
      this.response = response;   
      this.resStatusMsg = response.status;
      
      this.alertDisplayed = true;
      setTimeout(() => {this.alertDisplayed = false;this.resStatusMsg = "";
      }
      , 1000);

    }
    );

  }
 
//  addSmscMapping(gatewayForm){
//   console.log("Add SMSC Mapping : "+gatewayForm.smscId);
//   console.log("Add SMSC Mapping : "+this.country.countryId);
//   this.gatewayNumbersService.addSmscMapping(gatewayForm,this.country.countryId)
//     .subscribe((response) => {
     
//       this.getSmscMapping(this.country);
//       this.gatewayForm.reset();
      
//     }
//     );
   
//  }

// onSubmit(f: NgForm) {
//     console.log(f.value);  // { first: '', last: '' }
//     console.log(f.valid);  // false
//     f.resetForm();
//   }

//   getSmscMapping(country){
//     console.log("Getting Countries SMSC mappings for : "+country.countryName);
//     this.gatewayNumbersService.getSmscMapping(country.countryId)
//     .subscribe(
//       res => {
//           this.smscList = res;
//         },
//         error => {
//           this.countries = [];
//           this.error_text = "Sorry! No records found. Try again";
//           console.error(error);
//         }
//     );

//   }

//   deleteSmscMapping(smsMappingId : number, smscSelectionId : number){
//     console.log("deleteSmscMapping for : "+smsMappingId);
//     this.gatewayNumbersService.deleteSmscMapping(smsMappingId,smscSelectionId, this.country.countryId).subscribe(
//         users => {
//           this.getSmscMapping(this.country);
//         }
//     );
//   }  
  
  resetForm(form : FormGroup) {
       form.reset();
   }

   reset(){
      this.gatewayForm.reset();
    
   }

}
