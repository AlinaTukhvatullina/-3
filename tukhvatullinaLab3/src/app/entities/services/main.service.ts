import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

import {BehaviorSubject, Observable} from 'rxjs';
import {Pipe} from '../interfaces/pipe.interface'
import {Factory} from '../interfaces/factory.interface'


@Injectable()

export class mainService {

  public environment = 'https://localhost:5001/api/';

  private Pipe$$: BehaviorSubject<Pipe[]> = new BehaviorSubject([]);
  public Pipe$: Observable<Pipe[]> = this.Pipe$$.asObservable();

  private Factory$$: BehaviorSubject<Factory[]> = new BehaviorSubject([]);
  public Factory$: Observable<Factory[]> = this.Factory$$.asObservable();



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

  public setPipe(item): Observable<string> {
    return this.http.post(`${this.environment}${'Pipes'}`, item, {responseType: 'text', headers: new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')})});
  }

 
  public getPipes():void {
    this.get('Pipes')
    .toPromise()
    .then((p: Pipe[])=> {
        this.Pipe$$.next(p)
    });
   }

   public getFactory():void {
    this.get('Factorys')
    .toPromise()
    .then((u: Factory[])=> {
        this.Factory$$.next(u)
    });
   }

   public setFactory(item): Observable<string> {
    return this.http.post(`${this.environment}${'Factorys'}`, item, {responseType: 'text', headers: new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')})});
  }

  public getFactoryPipe(id): Observable<string> {
    return this.http.get(`${this.environment}${'Pipes/FactoryOfPipe/'}${id}`, {responseType: 'text'});
  }

  public getOnePipe(id:string):Observable<Pipe> {
    return this.get("Pipes"+id);
}

public getPipesOfFact(id):Observable<string[]> {
  return this.get('Factorys/pipesFromFactory/'+id);
}

public getOneFactory(id):Observable<Factory> {
  return this.get('Factorys'+id);
}

public CheckRights(): boolean {
    if (!(localStorage.getItem('login') === 'admin')) {
      alert('Для этого действия вы должны войти как admin');
      return false;
    }
    else {
      return true;
    }
}
}
    


