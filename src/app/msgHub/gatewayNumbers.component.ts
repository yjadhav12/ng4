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

smscList : any[] = []; 
error_text: string = ""; 

@ViewChild('smscForm') smscForm: FormGroup
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
    

    this.smscForm = this._fb.group({
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
        this.pager = this.pagerService.getPager(this.gatewayNumbers.length, page);
 
        // get current page of items
        this.pagedItems = this.gatewayNumbers.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
  getAllGatewayNumbers() {
    this.error_text = "";
    
      this.gatewayNumbersService.getAllGatewayNumbers().subscribe(
        res => {
          this.gatewayNumbers = res;
          this.setPage(1);
          console.log("Result +"+ res.source[0].gatewayAddress);

        },
        error => {
          this.gatewayNumbers = [];
          this.error_text = "Sorry! No country found. Try again";
          console.error(error);
        }
      )

    
  }

  updateGateWay(input){
    console.log("event1");
    console.log("event + "+input);
  }
  
  smscProviderList;

  getAllSmscList() {
    this.error_text = "";
    console.log("Getting All smscList - 2  " );
      this.gatewayNumbersService.getAllSmscList().subscribe(
        res => {
          this.smscProviderList = res;
        },
        error => {
          this.smscProviderList = [];
          this.error_text = "Sorry! No smscList found. Try again";
          console.error(error);
        }
      )

    
  }

  addCountry(countryToAdd: String) {
   console.log("Adding New Country "+countryToAdd);
    this.gatewayNumbersService.addUser(countryToAdd)
    .subscribe((response) => {
      //this.router.navigate(['/users-list']);
      this.getAllGatewayNumbers();
    }
    );
    
  }
 
//  addSmscMapping(smscForm){
//   console.log("Add SMSC Mapping : "+smscForm.smscId);
//   console.log("Add SMSC Mapping : "+this.country.countryId);
//   this.gatewayNumbersService.addSmscMapping(smscForm,this.country.countryId)
//     .subscribe((response) => {
     
//       this.getSmscMapping(this.country);
//       this.smscForm.reset();
      
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
      this.smscForm.reset();
    
   }

}
