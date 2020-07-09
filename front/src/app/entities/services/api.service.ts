import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';


@Injectable()

export class ApiService {

  public environment = 'https://localhost:5001/api/';

  constructor(
    private http: HttpClient,
  ) {
  }


  private CreateHeader(): {headers: HttpHeaders} {
    return {headers: new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')}) };
  }

  public get<T>(url: string): Observable<any> {
    return this.http.get(`${this.environment}${url}`);
  }
  

  public post<T>(url: string, body: any): Observable<any> {
    return this.http.post(`${this.environment}${url}`, body, this.CreateHeader());
  }

  public setAppforUser(url: string, item):Observable<string> {
    //console.log(item);
    return this.http.post(`${this.environment}${url}`, item, {responseType: 'text'});
  }

  public delete<T>(url: string):void {
      this.http.delete(`${this.environment}${url}`, this.CreateHeader()).toPromise();
      //console.log(`${this.environment}${url}`);
  }

  public put<T>(url: string, body: any): Observable<any> {
    return this.http.put(`${this.environment}${url}`, body, this.CreateHeader());
  }

  public GetToken(user: any) {
    return this.http.post(`${this.environment}${'auth/token/'}`, user, {responseType: 'text'}).toPromise();
  }
}
