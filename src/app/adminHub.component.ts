import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from './users-mgmt/user.interface';
import { ListUsersService } from './list-users.service';

@Component({
  selector: 'adminHub-root',
  templateUrl: './adminHub.component.html',
  styleUrls: ['./app.component.css']
})
export class AdminHubAppComponent {
title ;

constructor(private listUsersService: ListUsersService,
  private route: ActivatedRoute,
  private router: Router){
  this.title = listUsersService.switchModule();
  console.log(this.title);
  
  this.router.navigate(['adminPage/kannel']);
}

  
}
