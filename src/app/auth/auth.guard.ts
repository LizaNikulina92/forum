import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoggedin: boolean= false;

  constructor(private authService: AuthService, private router: Router) {  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
/*
    return this.authService.isAuthenticated(); */
    return this.authService.authSubject.pipe(
      map(user => {
        console.log(user);
        return !!user;
      }),
      map(userBool => {
        console.log(userBool)
        if(userBool){
          return true;
        }
        return this.router.createUrlTree(['/login'])
      })
    )

  }
}
