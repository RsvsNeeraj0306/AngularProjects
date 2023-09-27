import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { NgChipsComponent } from '../ng-chips/ng-chips/ng-chips.component';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-getposts',
  templateUrl: './getposts.component.html',
  styleUrls: ['./getposts.component.css']
})
export class GetpostsComponent {
  postId: number = 10;
  post: any;
  comments : any;
  newCommentContent: string = '';
  selectedUser: string = '';

  constructor(private postService: AppService, private http: HttpClient) { }

  ngOnInit(): void {

    this.getPostDetail(this.postId);
  }

  getPostDetail(id: number): void {
    this.postService.getPostDetail(id)
      .subscribe((data) => {
        this.post = data;
        this.getCommentDetails(id);
      });
  }

  getCommentDetails(id:number): void{
    this.postService.getCommentDetails(id)
      .subscribe((data) => {
        this.comments = data;
        console.log(this.comments);
      });
  }



  onSubmit(): void {
    if (this.postId !== undefined) {
      this.getPostDetail(this.postId);
    }
}
addComment(): void {
  if (this.newCommentContent.trim() !== '') {
    const newComment = {
      content: this.newCommentContent,
    };

    console.log(newComment);
    this.postService.addCommentToPost(this.postId, newComment)
      .subscribe((response) => {
        console.log('Comment added successfully:', response);

        this.getCommentDetails(this.postId);

        this.newCommentContent = '';
      }, (error) => {
        console.error('Error adding comment:', error);
      });
  }
}

insertSelectedUser(): void {
  if (this.selectedUser) {
    this.newCommentContent += ` @${this.selectedUser}`;
  }
}

}
