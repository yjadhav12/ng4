import { BrowserModule } from '@angular/platform-browser';
import { NgModule , ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import AppErrorHandler from './errorsHandler/AppErrorHandler';
import {MaterialModule, MdNativeDateModule} from '@angular/material';

import { SelectFormExample } from './select-form-example';
import { AppComponent } from './app.component';
import { ListUsersComponent } from './users-mgmt/list-users.component';
import { GatewayNumbersComponent } from './msgHub/gatewayNumbers.component';


import { UserDetailsComponent } from './users-mgmt/user-details.component';
import { CreateUserComponent } from './users-mgmt/create-user.component';
import { ActivityLogComponent } from './users-mgmt/activity-logs.component';
import { MsgHubAppComponent } from './msgHub.component';
import { AdminHubAppComponent } from './adminHub.component';
import { CountryAppComponent } from './msgHub/country.component';

import {ListUsersService} from './list-users.service';
import {CountrySmscService} from './msgHub/country-smsc.service';
import {GatewayNumbersService} from './msgHub/gatewayNumbers-smsc.service';
import { PagerService } from './pagination.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdSelectModule} from '@angular/material';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import { FilteredList, FilterPipe } from './filters/filteredlist.component';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
//import { AppRoutingModule }        from './app-routing.module';

/*
$routeProvider.when('/user-list', {templateUrl: 'partials/user-list.html', controller: 'UserListCtrl'});
        $routeProvider.when('/user-detail/:id', {templateUrl: 'partials/user-detail.html', controller: 'UserDetailCtrl'});
        $routeProvider.when('/user-creation', {templateUrl: 'partials/user-creation.html', controller: 'UserCreationCtrl'});
		$routeProvider.when('/user-logs', {templateUrl: 'partials/activityLog.html', controller: 'UserLogsCtrl'});
        $routeProvider.otherwise({redirectTo: '/user-list'});

 */

const appRoutes: Routes = [
  { path: '', redirectTo: '/homePage',
      pathMatch: 'full' },
  
   { path: 'users-list', component: ListUsersComponent },
   { path: 'editUser/:id', component: UserDetailsComponent },
   { path: 'deleteUser/:id', component: UserDetailsComponent },
   { path: 'user-creation', component: CreateUserComponent },
   { path: 'user-logs', component: ActivityLogComponent },
  { path: 'homePage', component: MsgHubAppComponent, 
     children: [
      {
        path: '',
        children: [
          { path: 'country', component: CountryAppComponent },
          { path: 'gatewayNumbers', component: GatewayNumbersComponent },
          { path: 'deleteUser/:id', component: UserDetailsComponent },
          { path: 'user-creation', component: CreateUserComponent },
          { path: 'user-logs', component: ActivityLogComponent }
        ]
  }]},
  { path: 'adminPage', component: AdminHubAppComponent,
     children: [
      {
        path: '',
        children: [
          { path: 'users-list', component: ListUsersComponent },
          { path: 'editUser/:id', component: UserDetailsComponent },
          { path: 'deleteUser/:id', component: UserDetailsComponent },
          { path: 'user-creation', component: CreateUserComponent },
          { path: 'user-logs', component: ActivityLogComponent }
        ]
  }]},

  {  path:  "country", component: CountryAppComponent, 
     children: [
      {
        path: '',
        children: [
          { path: 'listCountries', component: CreateUserComponent },
          { path: 'getCountrySMSCDetails', component: ActivityLogComponent },
          { path: 'addCountry', component: ListUsersComponent },
          { path: 'addSMSC', component: UserDetailsComponent },
          { path: 'deleteSMSC/:id', component: UserDetailsComponent },
          
        ]
  }]}
  // ,

  // { path: 'module',
  //       children: [
  //          { path: 'homePage', component: MsgHubAppComponent },
  //          { path: 'adminPage', component: AppComponent }
  //       ]
  // }
  
];

@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    UserDetailsComponent,
    CreateUserComponent,
    ActivityLogComponent,
    MsgHubAppComponent,
    AdminHubAppComponent,
    CountryAppComponent,
    GatewayNumbersComponent,

    FilteredList,
    FilterPipe ,
    SelectFormExample
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    MdSelectModule,
    MdNativeDateModule,
    ReactiveFormsModule,
    Ng2FilterPipeModule
    //,AppRoutingModule
    ,RouterModule.forRoot(appRoutes)
  ],
  
  providers: [ListUsersService,CountrySmscService, GatewayNumbersService, PagerService, { provide: ErrorHandler, useClass: AppErrorHandler } ],
  bootstrap: [AppComponent],
  entryComponents: [MsgHubAppComponent, AdminHubAppComponent]
})
export class AppModule { 
  
}
