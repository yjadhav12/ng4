import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';


import { CountrySmscService } from './country-smsc.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

class Smsc {
    smscId: number;
    prefix : string;
    name : string;
    priority : number;   
}

@Component({
  selector: 'country-comp',
  providers: [HttpModule],
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryAppComponent implements OnInit{
//smscForm : FormGroup;
@ViewChild('smscForm') smscForm: FormGroup
ngForm : NgForm;  
countries : any[] = []; 
smscList : any[] = []; 
error_text: string = ""; 
country = this.countries[1];
countryToAdd : string;
selectedValue: string;
smsc : Smsc;
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
 myState = 'AZ';
  states = [{code: 'AL', name: 'Alabama'}];
constructor( private countrySmscService: CountrySmscService,
  private route: ActivatedRoute,
  private router: Router,
  private _fb: FormBuilder){
  
  console.log("In CountryAppComponent" );
  //this.countries = this.countrySmscService.getAllCountries();
  //this.country = this.countries[1];
}
  ngOnInit() {
    console.log("Getting All list for Country Page" );
    this.getAllCountries();
    this.getAllSmscList();

    this.smscForm = this._fb.group({
            smscId: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
            prefix:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            name:['', [<any>Validators.required, <any>Validators.minLength(1)]],
            priority:['', [<any>Validators.required, <any>Validators.minLength(1)]]            
        });
  }

  getAllCountries() {
    this.error_text = "";
    
      this.countrySmscService.getAllCountries().subscribe(
        res => {
          this.countries = res;
        },
        error => {
          this.countries = [];
          this.error_text = "Sorry! No country found. Try again";
          console.error(error);
        }
      )

    console.log(this.countries);
  }
  
  smscProviderList;

  getAllSmscList() {
    this.error_text = "";
    console.log("Getting All smscList - 2  " );
      this.countrySmscService.getAllSmscList().subscribe(
        res => {
          this.smscProviderList = res;
        },
        error => {
          this.smscProviderList = [];
          this.error_text = "Sorry! No smscList found. Try again";
          console.error(error);
        }
      )

    console.log(this.countries);
  }

  addCountry(countryToAdd: String) {
   console.log("Adding New Country "+countryToAdd);
    this.countrySmscService.addUser(countryToAdd)
    .subscribe((response) => {
      //this.router.navigate(['/users-list']);
      this.getAllCountries();
    }
    );
    
  }
 
 addSmscMapping(smscForm){
  console.log("Add SMSC Mapping : "+smscForm.smscId);
  console.log("Add SMSC Mapping : "+this.country.countryId);
  this.countrySmscService.addSmscMapping(smscForm,this.country.countryId)
    .subscribe((response) => {
      //this.router.navigate(['/users-list']);
      this.getSmscMapping(this.country);
      this.smscForm.reset();
      
    }
    );
   
 }

onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
    f.resetForm();
  }

  getSmscMapping(country){
    console.log("Getting Countries SMSC mappings for : "+country.countryName);
    this.countrySmscService.getSmscMapping(country.countryId)
    .subscribe(
      res => {
          this.smscList = res;
        },
        error => {
          this.countries = [];
          this.error_text = "Sorry! No records found. Try again";
          console.error(error);
        }
    );

  }

  deleteSmscMapping(smsMappingId : number, smscSelectionId : number){
    console.log("deleteSmscMapping for : "+smsMappingId);
    this.countrySmscService.deleteSmscMapping(smsMappingId,smscSelectionId, this.country.countryId).subscribe(
        users => {
          this.getSmscMapping(this.country);
        }
    );
  }  
  
  resetForm(form : FormGroup) {
       form.reset();
   }

   reset(){
      this.smscForm.reset();
    
   }

}
