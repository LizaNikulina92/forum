import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Icomment } from 'src/app/auth/interfaces/icomment';

@Component({
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss']
})
export class PostPage implements OnInit {
  @ViewChild('f') form!: NgForm;
  APIpost = "http://localhost:4201/post/";
  APIcomments = "http://localhost:4201/comments/";
  error = undefined;
  postTitle = undefined;
  postContent = undefined;
  postUsername = undefined;
  postId:any = undefined;

  commentPostId = undefined;
  commentUserId = undefined;
  commentUsername = undefined;

  allComments: any[] = [];
  loggedUserId = undefined;
  roleAdmin = undefined;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getDetailPost();
    this.getDataComment();
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

  getDetailPost() {
    this.route.paramMap.subscribe(params => {
      var URLid = Number(params.get('id'));
      this.postId = Number(URLid);
      fetch(this.APIpost + URLid)
        .then(res => res.json())
        .then(obj => {
          this.postTitle = obj.title;
          this.postContent = obj.content;
          this.postUsername = obj.username;
          this.commentPostId = obj.id;
        })
      });
    }

    getDataComment(){
      fetch(this.APIcomments)
      .then(res=>res.json())
      .then(commentArr => {
        this.allComments = commentArr;
        this.allComments = this.allComments.filter(comment => comment.postId === this.postId);
            })
  }

  newComment(){
    let jsonData = localStorage.getItem('authenticated');
    if (jsonData) {
      let user = JSON.parse(jsonData);
      this.commentUserId = user.user.id;
      this.commentUsername = user.user.username;
    }
    let newComment: Icomment = {
      content: this.form.value.comment || '',
      username: this.commentUsername || '',
      userId: Number(this.commentUserId),
      postId: Number(this.commentPostId)
    }
    let newCommVal:any = document.querySelector('#comment');
    newCommVal.value = '';
    this.authService
    .addComment(newComment)
    .subscribe(resp => {
      this.error = undefined;
      this.getDataComment();
    },
      err => {
        console.log(err.error);
        this.error = err.error;
      }
    );
  }
  deleteComment(id: number) {
    fetch(this.APIcomments + id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(json => {
        this.getDataComment();
      });
  }
}
