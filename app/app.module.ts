import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent, 
    CreateEventComponent,
    EventService, 
    EventListResolverService,
    EventResolverService,
    CreateSessionComponent,
    SessionListComponent,
    UpvoteComponent,
    LocationValidator,
    VoterService
  } from './events/index';

import { EventsAppComponent }   from './events-app.component';

import { NavbarComponent } from './nav/navbar.component';
import { Error404Component } from './errors/404.component';

import { TOASTR_TOKEN, 
    Toastr, 
    JQ_TOKEN, 
    CollapsibleWellComponent, 
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective
   } from './shared/index';

import { AuthService } from './user/auth.service';

import {appRoutes} from './app.routes';

declare let toastr: Toastr;
declare let jQuery: Object;

@NgModule({
    imports: [
        BrowserModule,
        FormsModule, 
        ReactiveFormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)],
    exports: [],
    declarations: [
        EventsAppComponent, 
        EventsListComponent, 
        EventThumbnailComponent, 
        NavbarComponent, 
        EventDetailsComponent, 
        CreateEventComponent, 
        Error404Component, 
        CreateSessionComponent, 
        SessionListComponent,
        UpvoteComponent,
        CollapsibleWellComponent,
        SimpleModalComponent,
        ModalTriggerDirective,
        LocationValidator,
        DurationPipe],
    providers: [
        EventService, 
        EventResolverService, 
        EventListResolverService, 
        AuthService,
        VoterService,
        {provide: 'canDecativateCreateEvent', useValue: checkDirtyState },
        {provide: TOASTR_TOKEN, useValue: toastr},
        {provide: JQ_TOKEN, useValue: jQuery}],
    bootstrap:[EventsAppComponent]
})
export class AppModule { }

function checkDirtyState(component: CreateEventComponent) {
    if (component.isDirty){
        return window.confirm('You have not saved this event, do you really want to cancel?')
    }
    return true;
}