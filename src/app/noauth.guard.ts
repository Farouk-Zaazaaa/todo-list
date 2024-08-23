import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const noauthGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  if(typeof localStorage !== "undefined"){
    if(!localStorage.getItem('toke')){
      return true
    }else{
      router.navigate(['/home'])
      return false
    }
  }else{
    return false
  }
};
