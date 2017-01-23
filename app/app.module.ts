import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent, 
    CreateEventComponent,
    EventService, 
    EventRouteActivatorService, 
    EventListResolverService
  } from './events/index';

import { EventsAppComponent }   from './events-app.component';

import { NavbarComponent } from './nav/navbar.component';
import { Error404Component } from './errors/404.component';

import { ToastrService } from './shared/toastr.service';

import { AuthService } from './user/auth.service';


import {appRoutes} from './app.routes';

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(appRoutes), FormsModule, ReactiveFormsModule],
    exports: [],
    declarations: [EventsAppComponent, EventsListComponent, EventThumbnailComponent, NavbarComponent, EventDetailsComponent, CreateEventComponent, Error404Component],
    providers: [EventService, ToastrService, EventRouteActivatorService, {provide: 'canDecativateCreateEvent', useValue: checkDirtyState }, EventListResolverService, AuthService],
    bootstrap:[EventsAppComponent]
})
export class AppModule { }

function checkDirtyState(component: CreateEventComponent) {
    if (component.isDirty){
        return window.confirm('You have not saved this event, do you really want to cancel?')
    }
    return true;
}