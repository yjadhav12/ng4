import { ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core'
export interface Smsc {
    smscId: number;
    prefix : string;
    name : string;
    priority : number;   
    
    constructor(ref: ChangeDetectorRef) 
     
}
