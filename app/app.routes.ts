import { Routes } from '@angular/router';

import {EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent, 
    CreateEventComponent,
    EventService, 
    EventRouteActivatorService, 
    EventListResolverService,
    CreateSessionComponent
  } from './events/index';

import { Error404Component } from './errors/404.component';

export const appRoutes:Routes = [
    {path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDecativateCreateEvent']},    
    {path: 'events', component: EventsListComponent, resolve: {events: EventListResolverService} },
    {path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivatorService]},
    {path: 'events/session/new', component: CreateSessionComponent},    
    {path: '404', component: Error404Component},
    {path: '', redirectTo: '/events', pathMatch: 'full'},
    {path: 'user', loadChildren: 'app/user/user.module#UserModule'}

]