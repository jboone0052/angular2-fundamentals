import { Component, OnInit, Input } from '@angular/core';
import { ISession } from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'session-list',
    templateUrl: 'session-list.component.html'
})
export class SessionListComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    @Input() sessions:ISession[]
}