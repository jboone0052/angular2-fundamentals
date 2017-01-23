import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEvent } from './shared/event.model';

import { EventService } from './shared/events.service';
import { ToastrService } from '../shared/toastr.service';
@Component({
    moduleId: module.id,
    selector: 'events-list',
    templateUrl: 'events-list.component.html'
})
export class EventsListComponent implements OnInit {
    
    constructor(private _events: EventService, private _toastr: ToastrService, private _route: ActivatedRoute) {
        
     }

    ngOnInit() { 
        this.events = this._route.snapshot.data['events'];
    }

    events: IEvent;
        
}