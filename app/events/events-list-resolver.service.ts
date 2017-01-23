import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { EventService } from './shared/events.service';

@Injectable()
export class EventListResolverService implements Resolve<any> {

    constructor(private _events: EventService) { }

    resolve() {
        return this._events.getEvents().map(events => events);
    }
}