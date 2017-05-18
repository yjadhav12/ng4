import { ErrorHandler } from '@angular/core';

export default class AppErrorHandler implements ErrorHandler {
   
 constructor() { 
   // The true paramter tells Angular to rethrow exceptions, so operations like 'bootstrap' will result in an error
   // when an error happens. If we do not rethrow, bootstrap will always succeed.
  
 }
 
  handleError(error) {
   // send the error to the server
   
   // delegate to the default handler
   this.handleError(error); 
  }
}
 
