import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public login = '';
  public password = '';
  public tittle: string;
  public isLogged: boolean;
  public token:any;

  constructor(private mainService: ApiService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('login')) {
      console.log('false');
      this.tittle = 'Введите логин и пароль:';
      this.isLogged = false;
    }
    else {
      this.isLogged = true;
    }
  }

  public ButtonCheck() {
    return !(this.login && this.password);
  }

  public LogIn() {
    this.mainService.GetToken({login: this.login, password: this.password}).then( (token: any) => {
      localStorage.setItem('token', token);
      if (token) {
        localStorage.setItem('login', this.login);
        this.isLogged = true;
      }
      else {
        this.tittle = 'Неправильный логин или пароль';
      }
    });
   
  }

  public LogOut() {
    this.tittle = 'Введите логин и пароль:';
    this.isLogged = false;
    localStorage.clear();
  }

}
