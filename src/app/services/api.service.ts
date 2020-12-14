import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import * as _ from 'lodash'
// import "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  private handleError(error: HttpErrorResponse) {
    console.log('API Error Handler', error)
  }

  async signup(body: { email: string, password: string }) {

    const httpOptions = {
      headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
      })
    }

    return this.http
      .post<any>(environment.api_store.signup, body, httpOptions)
      .pipe(
        catchError(this.handleError.bind(this))
      )
      .pipe(
        map(response => {
          return response;
        })
      )
      .toPromise();
  }

  async login(body: { email: string, password: string }) {

    const httpOptions = {
      withCredentials: true
    }

    return this.http
      .post<any>(environment.api_store.login, body, httpOptions)
      .pipe(
        catchError(this.handleError.bind(this))
      )
      .pipe(
        map(response => {
          console.log(response)
          return response;
        })
      )
      .toPromise();
  }

  async add(type: String, body: any) {

    const url = environment.api_store[`add${_.upperFirst(type)}`]

    const httpOptions = {
      withCredentials: true
    }

    return this.http
      .post<any>(url, body, httpOptions)
      .pipe(
        catchError(this.handleError.bind(this))
      )
      .pipe(
        map(response => {
          console.log(response)
          return response;
        })
      )
      .toPromise();
  }

  async get(type: String) {

    const url = environment.api_store[`get${_.upperFirst(type)}`]

    const httpOptions = {
      withCredentials: true
    }

    return this.http
      .get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError.bind(this))
      )
      .pipe(
        map(response => {
          console.log(response)
          return response.data;
        })
      )
      .toPromise();
  }

  async watchlist(){
    const httpOptions = {
      withCredentials: true
    }

    return this.http
      .get<any>(environment.api_store.watchlist, httpOptions)
      .pipe(
        catchError(this.handleError.bind(this))
      )
      .pipe(
        map(response => {
          console.log(response)
          return response.data;
        })
      )
      .toPromise();
    
  }

  async logout(){
    const httpOptions = {
      withCredentials: true
    }

    return this.http
      .delete<any>(environment.api_store.logout, httpOptions)
      .pipe(
        catchError(this.handleError.bind(this))
      )
      .pipe(
        map(response => {
          console.log(response)
          return response;
        })
      )
      .toPromise();
    
  }

}
