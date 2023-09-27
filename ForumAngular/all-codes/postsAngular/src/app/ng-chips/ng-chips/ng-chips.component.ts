import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TagModel } from 'ngx-chips/core/tag-model';


@Component({
  selector: 'app-ng-chips',
  templateUrl: './ng-chips.component.html',
  styleUrls: ['./ng-chips.component.css'],
})
export class NgChipsComponent {
  items = ['sidhart', 'aaa', 'sss'];
  name: any;

  constructor(private http: HttpClient) {}

  requestAutocompleteItems = (text: any): Observable<any> => {
    const url = `./assets/data/states.json?q=${text}`;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data.states;
      })
    );
  };


}