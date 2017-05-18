import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from './users-mgmt/user.interface';
import { ListUsersService } from './list-users.service';

@Component({
  selector: 'msgHub-root',
  templateUrl: './msgHub.component.html',
  styleUrls: ['./app.component.css']
})
export class MsgHubAppComponent {
title ;

constructor(private listUsersService: ListUsersService){
  this.title = listUsersService.switchModule();
  console.log(this.title);
}

  
}
