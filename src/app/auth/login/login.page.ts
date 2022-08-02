import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;
  json = localStorage.getItem('authenticated');

  email = new FormControl('', [Validators.required, Validators.email]);
  value = new FormControl('', [Validators.required, Validators.required]);

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.authSubject.subscribe(val => console.log(val?.user.firstname))
  }

/*   login(){
    this.authService.login();
  } */

  onSubmit() {
    /* console.log(this.form.value); */
    this.authService.login(this.form.value).subscribe(
      resp => {
        console.log(resp);
        this.error = undefined;
        this.router.navigate(['/forum']);
      },
      err  => {
        console.log(err.error);
        this.error = err.error;
      }
    )
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getErrorMessageValue() {
    return this.value.hasError('required') ? 'You must enter a value' :
            '';
  }
}
