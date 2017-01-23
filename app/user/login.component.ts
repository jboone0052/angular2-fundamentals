import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(private _auth: AuthService, private _router: Router) { }

    ngOnInit() { }

    login(formValues) {
        this._auth.loginUser(formValues.userName, formValues.password);
        this._router.navigate(['events']);
    }

    cancel() {
        this._router.navigate(['events']);        
    }
}