import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { from } from 'rxjs';

import { getUserRole } from 'src/app/utils/util';

export interface ISignInCredentials {
  email: string;
  password: string;
}

export interface ICreateCredentials {
  email: string;
  password: string;
  displayName: string;
}

export interface IPasswordReset {
  code: string;
  newPassword: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private URL = 'http://localhost:3200/api';

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth,
    private router: Router
  ) {}

  // tslint:disable-next-line:typedef
  signInDom(credentials: ISignInCredentials) {
    //console.log(`${credentials.email} + ${credentials.password}`)
    return this.auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(({ user }) => {
        console.log(user);
        debugger;
        return user;
      });
  }

  signIn(credentials: ISignInCredentials) {
    return this.http.post<any>(this.URL + '/logear', credentials);
  }

  //signOut = () => from(this.auth.signOut());
  signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenUser');
    this.router.navigate(['/']);
  };

  // tslint:disable-next-line:typedef
  registers(credentials: ICreateCredentials) {
    return this.auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(async ({ user }) => {
        user.updateProfile({
          displayName: credentials.displayName,
        });
        this.auth.updateCurrentUser(user);
        return user;
      });
  }

  register(credentials: ICreateCredentials) {
    return this.http.post<any>(this.URL + '/registro', credentials);
  }

  // tslint:disable-next-line:typedef
  sendPasswordEmail(email) {
    return this.auth.sendPasswordResetEmail(email).then(() => {
      return true;
    });
  }

  // tslint:disable-next-line:typedef
  resetPassword(credentials: IPasswordReset) {
    return this.auth
      .confirmPasswordReset(credentials.code, credentials.newPassword)
      .then((data) => {
        return data;
      });
  }

  // tslint:disable-next-line:typedef
  async getUserAnte() {
    const u = await this.auth.currentUser;
    return { ...u, role: getUserRole() };
  }

  async getUser() {
    console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      return {
        token: localStorage.getItem('token'),
        role: localStorage.getItem('role'),
        displayName: localStorage.getItem('displayName'),
      };
    } else {
      return null;
    }
  }
}
