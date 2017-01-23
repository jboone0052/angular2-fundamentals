import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';

@Component({
    moduleId: module.id,
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {
    constructor(private _auth: AuthService) { }

    ngOnInit() { }
}