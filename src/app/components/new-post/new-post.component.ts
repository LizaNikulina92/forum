import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Ipost } from 'src/app/auth/interfaces/ipost';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  error = undefined;
  usernamePost = ''


  constructor(private authService: AuthService, private router: Router) {

    this.authService.authSubject.subscribe(val => {
      this.usernamePost = `${val?.user.username}`;
    })

  }

  ngOnInit(): void {
  }

  jsonData() {
    let jsonData = localStorage.getItem('authenticated');
    if (jsonData) {
      let user = JSON.parse(jsonData);
      let userIdPost = user.user.id
      return userIdPost
    }
  }
  sendPost() {
    let JSONsectionName: any = sessionStorage.getItem('postSection');
    let sectionName = JSON.parse(JSONsectionName);
    let newPost: Ipost = {
      title: this.form.value.title || '',
      content: this.form.value.content || '',
      username: this.usernamePost || '',
      userId: this.jsonData(),
      section: sectionName || ''
    }
    this.authService
      .newPost(newPost)
      .subscribe(resp => {
        let obj:any = resp
        this.error = undefined;
        sessionStorage.setItem('post', JSON.stringify(obj))
        this.router.navigate([`forum/${obj.id}`]);

      },
        err => {
          console.log(err.error);
          this.error = err.error;
        }
      );
  }
}
