import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from 'src/app/Common/types';
import { AuthService } from 'src/app/Services/auth-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public showSearchButton: boolean = true;
  public showAdminLogin: boolean = false;
  public showGameDescription: boolean = false;
  public showOptions: boolean = false;
  public isAdmin: boolean = false;

  public hasAuthFailed: boolean = false;
  public isMocKDataEnabled: boolean = true;
  public isKeyCachingEnabled: boolean = false;

  @Output() hasAdminAuthenticated = new EventEmitter<boolean>();
  @Output() toggleMockData = new EventEmitter<boolean>();
  @Input() currentGame?: Game;

  public constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAdmin = localStorage.getItem('admin-key') ? true : false;
    this.isKeyCachingEnabled = this.isAdmin;
    this.hasAdminAuthenticated.emit(this.isAdmin);
  }

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

  toggleGameDescription(value: boolean) {
    this.showGameDescription = value;
  }

  toggleOptions(value: boolean) {
    this.showOptions = value;
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

        if (this.isAdmin) {
          this.hasAdminAuthenticated.emit(true);
          this.hasAuthFailed = false;
        } else {
          this.hasAuthFailed = true;
        }
      }
    });
  }

  public onToggleMockData(event: any) {
    this.isMocKDataEnabled = !this.isMocKDataEnabled;
    this.toggleMockData.emit(this.isMocKDataEnabled);
  }

  public onToggleKeyCaching(event: any) {
    this.isKeyCachingEnabled = !this.isKeyCachingEnabled;

    if (this.isKeyCachingEnabled)
      localStorage.setItem('admin-key', 'super-secret-admin-key');
    else if (!this.isKeyCachingEnabled) localStorage.removeItem('admin-key');
  }
}
