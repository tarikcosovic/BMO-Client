import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/Services/auth-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public showSearchButton: boolean = true;
  public showAdminLogin: boolean = false;
  public isAdmin: boolean = false;

  @Output() hasAdminAuthenticated = new EventEmitter<boolean>();

  public constructor(private authService: AuthService) {}

  ngAfterViewInit() {
    this.addEventListenerToSearch();
    this.addEventListenerToAdminLogin();
  }

  toggleSearch(value: boolean) {
    this.showSearchButton = value;
  }

  toggleAdminLogin(value: boolean) {
    this.showAdminLogin = value;
  }

  addEventListenerToSearch() {
    var input = document.getElementById('search');

    input?.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        let currentEvent = event.target as HTMLInputElement;

        var elmnt = document.getElementById(currentEvent.value);
        elmnt?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });

        if (elmnt && elmnt.parentElement) {
          elmnt.parentElement.style.backgroundColor = 'lightgreen';
          elmnt.parentElement.style.outline = 'solid black 5px';
        }

        setTimeout(function () {
          if (elmnt && elmnt.parentElement) {
            elmnt.parentElement.style.backgroundColor = '#fbfaff';
            elmnt.parentElement.style.outline = 'none';
          }
        }, 5000);
      }
    });
  }

  addEventListenerToAdminLogin() {
    const input = document.getElementById('admin-login');

    input?.addEventListener('keypress', async (event) => {
      if (event.key === 'Enter') {
        let secretKey = (event.target as HTMLInputElement).value;
        //Do authentication
        this.isAdmin = await this.authService.AuthenticateUser(secretKey);

        if (this.isAdmin) this.hasAdminAuthenticated.emit(true);
        else {
          //validation message todo:
        }
      }
    });
  }
}
