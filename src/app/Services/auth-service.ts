import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Role } from '../Common/types';
import { HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //any dummy endpoint that requires an admin access
  readonly endpoint: string = 'players/1';
  readonly httpService: HttpService;
  private currentRole: Role;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
    this.currentRole = localStorage.getItem('admin-key')
      ? Role.Admin
      : Role.User;
  }

  public async AuthenticateUser(key: string = ''): Promise<boolean> {
    return await firstValueFrom(
      this.httpService.GetDataAsync<any>(
        this.endpoint,
        new HttpHeaders().set('Authorization', key)
      )
    )
      .then(() => {
        this.httpService.SetAuthHeader(key);
        this.currentRole = Role.Admin;
        return true;
      })
      .catch((error) => {
        //Default to user role
        this.currentRole = Role.User;
        console.log('Error while authenticating admin: ' + error);
        return false;
      })
      .finally(() => {
        return false;
      });
  }

  public isAdmin(): boolean {
    return this.currentRole == Role.Admin ? true : false;
  }
}
