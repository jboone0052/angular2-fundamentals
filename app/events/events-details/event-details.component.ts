import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/events.service';
import { ActivatedRoute, Params } from '@angular/router';

import { IEvent, ISession } from '../shared/event.model';

@Component({
    moduleId: module.id,
    templateUrl: 'event-details.component.html',
    styleUrls: ['event-detail.component.css']
    
})
export class EventDetailsComponent implements OnInit {
    event: IEvent;
    addMode: boolean;
    filterBy: string = "all";
    sortBy: string = "votes";
    
    constructor(private _events: EventService, private _route: ActivatedRoute) { }

    ngOnInit() { 
        this._route.params.forEach((params: Params) => {
            this.event = this._events.getEvent(+params['id']);
            this.addMode = false;
        })
    }

    addSession() {
        this.addMode = true;
    }

    cancel() {
        this.addMode = false;
    }

    saveNewSession(session: ISession) {
        console.log("saveNewSession");
        const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
        session.id = nextId + 1;
        this.event.sessions.push(session);
        this._events.updateEvent(this.event);
        this.addMode = false;
    }
}