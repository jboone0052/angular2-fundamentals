import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'collapsible-well',
    templateUrl: 'collapsible-well.component.html'
})
export class CollapsibleWellComponent implements OnInit {
    @Input() title: string;
    visible: boolean = true;

    constructor() { }

    ngOnInit() { }

    toggleContent() {
        this.visible = !this.visible;
    }
}