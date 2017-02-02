import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EventService } from './shared/index';

@Component({
    moduleId: module.id,
    templateUrl: 'create-event.component.html',
    styleUrls: ['create-event.component.css']
})
export class CreateEventComponent implements OnInit {
    constructor(private _router: Router, private _events: EventService) { }

    ngOnInit() { }

    isDirty: boolean= true;

    cancel() {
        this._router.navigate(['/events']);
    }

    saveEvent(formValues) {
        this._events.saveEvent(formValues).subscribe(event => {
            this.isDirty = false;
            this._router.navigate(['/events']);   
        }); 
    }
}