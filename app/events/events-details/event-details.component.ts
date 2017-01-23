import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/events.service';
import { ActivatedRoute } from '@angular/router';

import { IEvent } from '../shared/event.model';

@Component({
    moduleId: module.id,
    templateUrl: 'event-details.component.html',
    styleUrls: ['event-detail.component.css']
    
})
export class EventDetailsComponent implements OnInit {
    event: IEvent;
    constructor(private _events: EventService, private _route: ActivatedRoute) { }

    ngOnInit() { 
        this.event = this._events.getEvent(
            +this._route.snapshot.params['id']
        );
    }
}