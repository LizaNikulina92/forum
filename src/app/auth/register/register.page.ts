import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormControl, Validators, NgForm, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  selector: 'form-field-prefix-suffix-example',
})
export class RegisterPage implements OnInit {
  @ViewChild('f') form!: NgForm;
  error = undefined;

  email = new FormControl('', [Validators.required, Validators.email]);
  value = new FormControl('', [Validators.required, Validators.required]);
  roleValue = 'user';
  roleAdmin = 'admin';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }
  onSubmit() {
    /* console.log(this.form.value); */
    this.authService
      .signup(this.form.value)
      .subscribe(resp => {
        console.log(resp);
        this.error = undefined;
        this.router.navigate(['login']);

      },
      err => {
        console.log(err.error);
        this.error =err.error;
      }
        );
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

