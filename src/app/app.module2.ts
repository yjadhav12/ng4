import { BrowserModule } from '@angular/platform-browser';
import { NgModule , ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import AppErrorHandler from './errorsHandler/AppErrorHandler';

import { AppComponent } from './app.component';
import { ListUsersComponent } from './users-mgmt/list-users.component';
import {ListUsersService} from './list-users.service';
import { UserDetailsComponent } from './users-mgmt/user-details.component';
import { CreateUserComponent } from './users-mgmt/create-user.component';
import { ActivityLogComponent } from './users-mgmt/activity-logs.component';
import { MsgHubAppComponent } from './msgHub.component';
import { AdminHubAppComponent } from './adminHub.component';
import { TabComponent } from './tab-component';
import { Tab3Component } from './tab3.component';
import { TabContentComponent } from './tab-content.component'

import {AppTwoComponent} from '../app-two/app-two.component'

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
  //{ path: '', component: AppComponent },
  { path: 'users-list', component: ListUsersComponent },
  { path: 'editUser/:id', component: UserDetailsComponent },
  { path: 'deleteUser/:id', component: UserDetailsComponent },
  { path: 'user-creation', component: CreateUserComponent },
  { path: 'user-logs', component: ActivityLogComponent },
  { path: 'homePage', component: AppComponent },
  { path: 'adminPage', component: AppComponent },
  { path: 'switchModule', component: AppComponent }
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
    FilteredList,
    FilterPipe ,
    Tab3Component,
    TabComponent,
    TabContentComponent,
    AppTwoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    Ng2FilterPipeModule
    //,AppRoutingModule
    ,RouterModule.forRoot(appRoutes)
  ],
  providers: [ListUsersService, { provide: ErrorHandler, useClass: AppErrorHandler } ],
  bootstrap: [AppTwoComponent],
  entryComponents: [MsgHubAppComponent, AdminHubAppComponent]
})
export class AppModule2 { 
  
}
