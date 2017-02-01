import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { ISession, EventService } from '../events/shared/index';

@Component({
    moduleId: module.id,
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {

    searchTerm: string = "";
    foundSessions: ISession[];

    constructor(private _auth: AuthService, private _eventService: EventService) { }

    ngOnInit() { }

    searchSessions(searchTerm: string) {
        this._eventService.searchSessions(searchTerm).subscribe((sessions) => {
            this.foundSessions = sessions;
        })
    }
}