import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl = 'http://localhost:8080/forum';

  constructor(private http: HttpClient) {}

  getPostDetail(id: number): Observable<any> {
    const url = `${this.baseUrl}/post/${id}`;
    return this.http.get(url);
  }

  getCommentDetails(id:number):Observable<any> {
    const url = `${this.baseUrl}/comments/${id}`;
    return this.http.get(url);
  }

  addCommentToPost(id: number, comment: any): Observable<any> {
    const url = `${this.baseUrl}/addComment/${id}`;
    return this.http.post(url, comment ,{responseType: 'text'} );
  }

}
