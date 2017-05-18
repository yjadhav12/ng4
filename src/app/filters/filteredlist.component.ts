import {Component,Input,Output,OnInit,ViewChild,EventEmitter,ChangeDetectionStrategy} from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any, filter: any): any {
      if (filter && Array.isArray(items)) {
          let filterKeys = Object.keys(filter);
          return items.filter(item =>
              filterKeys.reduce((memo, keyName) =>
                  (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
      } else {
          return items;
      }
    }
}

@Component({
    selector: 'filteredlist',
    templateUrl: 'filteredlist.html'
})

export class FilteredList implements OnInit {
  public _items: Array<any>;
  public enableFilter: boolean;
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  private _subscription: Subscription;
  @Input() items: Observable<any[]>;
  
  constructor() {
  }
  
  ngOnInit() {
    this._subscription = this.items.subscribe(res => this._items = res);
    this.enableFilter = true;
   
    this.filterPlaceholder = "Filter..";
     this.filterText = "";
    this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
        this.filterText = term;
        console.log(term);
      });
  }
}
