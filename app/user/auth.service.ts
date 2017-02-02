import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { IUser } from './user.model';


@Injectable()
export class AuthService {

    constructor(private http: Http) { }
 
    currentUser: IUser;

    loginUser(userName: string, password: string) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let loginInfo = {username: userName, password: password}

        let url = `/api/login`;

        return this.http.post(url, loginInfo, options).do(response => {
            if (response) {
                this.currentUser = <IUser>response.json().user;
            }
        }).catch(error => {
            return Observable.of(false);
        })
    }

    updateUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        let url = `/api/users/${this.currentUser.id}`;

        return this.http.put(url, this.currentUser, options);
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    logout() {

        this.currentUser = undefined;

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post('/api/logout', {}, options);
    }

    checkAuthenticationStatus() {
        return this.http.get('/api/currentIdentity').map((response:any) => {
            if (response._body) {
                return response.json();
            } else{
                return {};
            }
        }).do(currentUser => {
            if (!!currentUser.userName) {
                this.currentUser = currentUser;
            }
        }).subscribe();
    }

    private handleError(error: Response) {
      return Observable.throw(error.statusText);
    }
}