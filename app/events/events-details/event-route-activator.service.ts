import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EventService } from '../shared/events.service';

@Injectable()
export class EventRouteActivatorService implements CanActivate {

    constructor(private _events: EventService, private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot) {
        const eventExists = !!this._events.getEvent(+route.params['id']);

        if (!eventExists) {
            this._router.navigate(['/404']);
        }
        return eventExists;
    }
}