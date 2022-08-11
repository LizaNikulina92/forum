import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss']
})
export class ForumPage implements OnInit {


  APIpost = "http://localhost:4201/post/";
  loggedUserId = undefined;
  roleAdmin = undefined;
  allPost: any[] = [];
  postNDP: any[] = [];
  postJCS: any[] = [];


  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    this.getPostData();
    this.jsonData();
  }
  jsonData() {
    let jsonData = localStorage.getItem('authenticated');
    if (jsonData) {
      let user = JSON.parse(jsonData);
      this.loggedUserId = user.user.id;
      this.roleAdmin = user.user.role;
    }
  }

  getPostData() {
    fetch(this.APIpost)
      .then((response) => response.json())
      .then(postArr => {
        this.allPost = postArr
        let filterNDP = this.allPost.filter(post => post.section === 'notre dame de paris');
        let filterJCS = this.allPost.filter(post => post.section === 'jesus christ superstar');
        this.postNDP = filterNDP;
        this.postJCS = filterJCS;
      })

  }

  close() {
    let newPost = document.querySelector('#new_post');
    let btnClose = document.querySelector('#close');
    newPost?.classList.add('d-none');
    btnClose?.classList.add('d-none')
    sessionStorage.removeItem('postSection');
  }

  newPost(musical: string) {
    let newPost = document.querySelector('#new_post');
    let btnClose = document.querySelector('#close');
    newPost?.classList.remove('d-none');
    btnClose?.classList.remove('d-none');
    sessionStorage.setItem('postSection', JSON.stringify(musical))
  }

  deletePost(id: number) {
    fetch(this.APIpost + id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(json => {
        this.getPostData();
      });
  }
}
