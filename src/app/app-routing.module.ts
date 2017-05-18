import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { ListUsersComponent } from './users-mgmt/list-users.component';
import { UserDetailsComponent } from './users-mgmt/user-details.component';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
//import { PageNotFoundComponent } from './not-found.component';
const appRoutes: Routes = [
  { path: 'users-list', component: ListUsersComponent },
  { path: 'user-creation', component: ListUsersComponent },
  { path: 'user-logs', component: ListUsersComponent },
  { path: 'user-details', component: UserDetailsComponent },
  { path: '/users/:**', component: UserDetailsComponent },
  { path: '/editUser/:**', component: UserDetailsComponent },
  
 // { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,
      { preloadingStrategy: SelectivePreloadingStrategy })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}