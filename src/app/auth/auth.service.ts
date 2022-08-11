import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, tap } from 'rxjs';
import { Ipost } from './interfaces/ipost';
import { Iregister } from './interfaces/iregister';
import { Iusers } from './interfaces/iusers';
import { Icomment } from './interfaces/icomment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

/* private loggedIn = false; */
authSubject = new BehaviorSubject<Iusers | null>(null);
private urlJsonServer = 'http://localhost:4201';
helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUserLogin();
  }

 /*  isAuthenticated():boolean {
    return this.loggedIn;
  } */

  restoreUserLogin() {
    const json = localStorage.getItem('authenticated');
    if(json) {
      const user = JSON.parse(json);
      if(this.helper.isTokenExpired(user.accessToken)) {
        localStorage.removeItem('authenticated');
        return
      } else {
        this.authSubject.next(user);
      }
    }
  }

  login(obj: Iregister) {
    /*     this.loggedIn = true; */
        return this.http.post<Iusers>(this.urlJsonServer+'/login', obj).pipe(
          tap(data => {
            this.authSubject.next(data);
            localStorage.setItem('authenticated', JSON.stringify(data))
          })
        )
      }

      signup(obj: Iregister) {
        return this.http.post(this.urlJsonServer+'/register', obj)
      }

      logout() {
        /* this.loggedIn = false; */
        this.authSubject.next(null);
        localStorage.removeItem('authenticated');
        this.router.navigate(['/login']);
      }

      newPost(obj: Ipost){
        return this.http.post(this.urlJsonServer+'/post', obj)
      }

      addComment(obj: Icomment){
        return this.http.post(this.urlJsonServer+'/comments', obj)
      }
}
