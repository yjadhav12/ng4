
import { ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core'
export class User {
    userDetailsId: number; // required with minimum 5 chracters
    userName : string;
    password : string;
    firstName : string;
    lastName : string;
    emailId : string;
    role : string;

    constructor( ref: ChangeDetectorRef) {
  
  };
    
}