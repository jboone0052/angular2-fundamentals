import { Component, OnInit } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
    moduleId: module.id,
    selector: 'events-app',
    templateUrl: 'events-app.component.html'
})
export class EventsAppComponent implements OnInit {
    constructor(private auth: AuthService) { }

    ngOnInit() { 
        this.auth.checkAuthenticationStatus();
    }
}