import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IEvent } from './shared/event.model';

@Component({
    moduleId: module.id,
    selector: 'event-thumbnail',
    templateUrl: 'event-thumbnail.component.html',
    styleUrls: ['event-thumbnail.component.css']
})
export class EventThumbnailComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    @Input() event: IEvent;

}