import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

 
@Injectable({
providedIn: 'root',

})

export class CycleService {
  constructor(private _http:HttpClient)

{}


getCycles()

{
  return this._http.get('http://localhost:8080/api/cycles');
}

addStock(cycleId: number) {
    const apiUrl = `http://localhost:8080/api/cycles/addStock/${cycleId}`;
    return this._http.put(apiUrl, {}, { headers: this.getHeader()});
  }

borrow(cycleId: number) {
      const apiUrl = `http://localhost:8080/api/cycles/borrow/${cycleId}`;
    return this._http.put(apiUrl,{}, { headers: this.getHeader()});
  }

addtocart(cycleId: number){
  const apiUrl = `http://localhost:8080/api/cycles/addToCart/${cycleId}`;
  return this._http.put(apiUrl,{}, { headers: this.getHeader()});
}

removefromcart(cycleId: number){
  const apiUrl = `http://localhost:8080/api/cycles/removeFromCart/${cycleId}`;
  return this._http.delete(apiUrl, { headers: this.getHeader()});
}

checkout() {
  const apiUrl = `http://localhost:8080/api/cycles/checkout`;
  return this._http.put(apiUrl, { headers: this.getHeader()});
 
  }

  clearToken() {

    localStorage.removeItem('token');

  }

  addCycle(newCycle: any): Observable<any> {
    const apiUrl = `http://localhost:8080/api/cycles/add`;
    return this._http.put(apiUrl, newCycle, { headers: this.getHeader()});
  }

  borrowedCycle(){
    const apiUrl = `http://localhost:8080/api/cycles/borrowed`;
    return this._http.get(apiUrl, { headers: this.getHeader()});
  }

  borrowedCycleReturn(borrowedCycleId:any){
    const apiUrl = `http://localhost:8080/api/cycles/returns/${borrowedCycleId}`;
    return this._http.put(apiUrl,{ headers: this.getHeader()});
  }

  getHeader()

  {

    const headers = new HttpHeaders({

      'Authorization': 'Bearer ' + localStorage.getItem('token')

    });

    return headers;

  }

}