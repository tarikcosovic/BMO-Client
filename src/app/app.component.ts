import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isAdmin: boolean = false;
  constructor() {}

  hasAdminAuthenticated(event: boolean) {
    this.isAdmin = event;
  }
}
