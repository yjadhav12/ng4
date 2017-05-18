import {Component} from '@angular/core';
import { ListUsersService } from '../app/list-users.service';

@Component({
	selector: 'app-two',
	template: '<a  routerLink="/switchModule" routerLinkActive="active" class="btn btn-default">Switch Module</a>  <h1>Hello from App Two</h1> '
})
export class AppTwoComponent {
	isAdmin;
 constructor(private listUsersService: ListUsersService) {
	 
	console.log("In App Two Comp");
	listUsersService.missionConfirmed$.subscribe(
            res => {
                console.log('AppTwoComponent is :'+res);
                this.isAdmin = res ;
                alert('Switiching to Module 2 ' );
            });

	
      
    }

	switchModule(){

    this.isAdmin = this.listUsersService.switchModule();

    //   if(this.switch="user" && !AppComponent.title){
    //     this.switch = "admin";
    //     AppComponent.title= false;
    //   }
    //   else if (this.switch="admin" && AppComponent.title){
    //   this.switch = "user";
    //   AppComponent.title = true;
    // }
      console.log("setting - "+this.isAdmin);
  }



 }