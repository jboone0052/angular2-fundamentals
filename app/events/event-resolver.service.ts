import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { EventService } from './shared/events.service';

@Injectable()
export class EventResolverService implements Resolve<any> {

    constructor(private _events: EventService) { }

    resolve(route: ActivatedRouteSnapshot) {

        return this._events.getEvent(+route.params['id']);
    }
}