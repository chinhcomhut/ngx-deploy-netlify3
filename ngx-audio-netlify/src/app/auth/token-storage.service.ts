import { Injectable } from '@angular/core';
const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AVATAR_KEY = 'AuthAvatarname';
const AUTHORITIES_KEY = 'AuthAuthorities'
const ID_KEY = 'AuthUserId'
const NAME_KEY = 'Name';
const EMAIL_KEY = 'Email';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }
  signOut() {
    window.sessionStorage.clear();
  }
  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public getUserId(): string {
    return sessionStorage.getItem(ID_KEY)
  }
  public saveUserId(id: string) {
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.setItem(ID_KEY, id);
  }
  public getName(): string {
    return sessionStorage.getItem(NAME_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }
  public getEmail(): string {
    return sessionStorage.getItem(EMAIL_KEY);
  }
  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }
  public saveEmail(email: string) {
    window.sessionStorage.removeItem(EMAIL_KEY);
    window.sessionStorage.setItem(EMAIL_KEY, email);
  }
  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }
  public saveAvatar(avatar: string) {
    window.sessionStorage.removeItem(AVATAR_KEY);
    window.sessionStorage.setItem(AVATAR_KEY, avatar);
  }

  public getAvatar() {
    return sessionStorage.getItem(AVATAR_KEY);
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach (authority => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }
}


