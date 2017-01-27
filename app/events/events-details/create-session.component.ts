import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISession, restrictedWords } from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'create-session',
    templateUrl: 'create-session.component.html',
    styleUrls: ['create-session.component.css']
})
export class CreateSessionComponent implements OnInit {
    constructor(private _router: Router) { }
    newSessionForm: FormGroup;
    name: FormControl;
    presenter: FormControl;
    duration: FormControl;
    level: FormControl;
    abstract: FormControl;

    @Output() saveNewSession = new EventEmitter<ISession>();
    @Output() cancelAddSession = new EventEmitter();

    ngOnInit() { 
        this.name = new FormControl('', Validators.required);
        this.presenter = new FormControl('', Validators.required);
        this.duration = new FormControl('', Validators.required);
        this.level = new FormControl('', Validators.required);
        this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), restrictedWords(['foo', 'bar'])]);

        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract
        })
    } 
    saveSession(formValues) {
        let session: ISession = {
            id: undefined,
            name: formValues.name,
            duration: +formValues.duration,
            presenter: formValues.presenter,
            level: formValues.level,
            abstract: formValues.abstract,
            voters: []
        }
        console.log(session);
        this.saveNewSession.emit(session);
    }

    cancel() {
        this.cancelAddSession.emit();
    }
}