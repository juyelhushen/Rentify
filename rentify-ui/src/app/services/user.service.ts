import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../env/envirenment';
import { AuthResponse, Login, Role, Signup, User } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private jwt: JwtHelperService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  signUp(userInfo: Signup): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      this.url + '/api/user/register',
      userInfo,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }
    );
  }

  login(data: Login): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.url + '/api/user/login', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  getUserById = (userid: number): Observable<User> => {
    return this.http.get<User>(this.url + '/api/user/' + userid);
  };

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }


  isLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      return token != null;
    }
    return false;
  }

  deleteToken() {
    localStorage.removeItem('token');
    location.reload();
  }

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return (localStorage.getItem('token') as string) || null;
    }
    return null; 
  }

  static getToken(): string | Promise<string | null> | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }

  isTokenValid() {
    const token = this.token;
    if (!token) {
      return false;
    }
    const jwtHelper = new JwtHelperService();
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }

  get currentUserEmail() {
    const token = this.token;
    let email = '';
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      email = decodedToken.username;
    }
    return email;
  }
  get currentUserId() {
    const token = this.token;
    let userId = null;
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      userId = decodedToken.userid;
    }
    return userId;
  }

  get userRoles(): Role {
    const token = this.token;
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      console.log(decodedToken.role);
      if (decodedToken.role === 'LANDLORD') {
        return Role.LANDLORD;
      }
    }
    return Role.TENANT;
  }
}
