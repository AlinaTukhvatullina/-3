import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './entities/components/header/header.component';
import {PipeComponent} from './entities/components/pipes/pipe.component';
import {mainPageComponent} from './entities/components/mainPage/mainPage.component'

import { SidenavComponent } from './entities/components/sidenav/sidenav.component';

import { SharedModule } from './entities/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient} from '@angular/common/http';
//import { HTTPInterceptorService } from './entities/services/http-interceptor.service';
import { FormsModule } from '@angular/forms';
import {ApiService} from './entities/services/api.service'
import {mainService} from './entities/services/main.service'
import {AuthComponent} from './entities/components/auth/auth.component'
import {FactoryComponent} from './entities/components/factory/factory.component'
import {onepipeComponent} from './entities/components/pipes/onepipe/onepipe.component'
import {onefactoryComponent} from './entities/components/factory/onefactory/onefactory.component'


import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: 'Pipes', component: PipeComponent,
    //children: [{path: '1', component: oneappComponent}]
  },
  {
    path: '', component: mainPageComponent,
  },
  {
    path: 'Pipes/:id', component:onepipeComponent,
  },

  {
    path:'auth', component: AuthComponent,
  },

  {
    path:'Factorys', component: FactoryComponent,
  },

  {
    path:'Factorys/:id', component: onefactoryComponent,
  }
  
];


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HeaderComponent,
    PipeComponent,
    mainPageComponent,
    AuthComponent,
    FactoryComponent,
    onepipeComponent,
    onefactoryComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    //AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    HttpClient,
    mainService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }