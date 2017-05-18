import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentFactory } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from './users-mgmt/user.interface';

import { MsgHubAppComponent } from './msgHub.component';
import { AdminHubAppComponent } from './adminHub.component';
import { ListUsersService } from './list-users.service';
import {AppTwoComponent} from '../app-two/app-two.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedValue: string;

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  
  static title =false;
  switch =true ;
    @ViewChild('subContainer1', {read: ViewContainerRef}) subContainer1: ViewContainerRef;
    @ViewChild('subContainer2', {read: ViewContainerRef}) subContainer2: ViewContainerRef;
    constructor(
      private compFactoryResolver: ComponentFactoryResolver,
      private listUsersService: ListUsersService) {
      console.log("1App"+this.switch);
      //this.switchModule();
      console.log("App"+this.switch);
      
      if (this.tab = 1) {
        this.tab = 2;
      }
      if (this.tab = 2)  {
        this.tab = 1;
      }
    }
  tab = 0;

  setTab(num: number) {
    this.tab = num;
  }
  
  isSelected(num: number) {
    return this.tab === num;
  }
  switchModule(){

    this.switch = this.listUsersService.switchModule();

    //   if(this.switch="user" && !AppComponent.title){
    //     this.switch = "admin";
    //     AppComponent.title= false;
    //   }
    //   else if (this.switch="admin" && AppComponent.title){
    //   this.switch = "user";
    //   AppComponent.title = true;
    // }
      console.log("setting - "+this.switch);
  }
    addComponents() {
      
      let compFactory;
      if(AppComponent.title) {
      compFactory = this.compFactoryResolver.resolveComponentFactory(MsgHubAppComponent);
        this.subContainer1.createComponent(compFactory);
        this.subContainer2.createComponent(null);
        AppComponent.title=false;
      }
     else { 
      compFactory = this.compFactoryResolver.resolveComponentFactory(AdminHubAppComponent);
        this.subContainer2.createComponent(compFactory);
        this.subContainer1.createComponent(null);
        AppComponent.title=true;
     }
    }

}
