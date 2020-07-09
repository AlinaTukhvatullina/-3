import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Main';
  
  public sidenav!: MatDrawer;  

  public setSidenav(sidenav: MatDrawer) {
    this.sidenav = sidenav;
  }
}

