import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SessionListComponent } from './session-list.component';
import { UpvoteComponent } from './upvote.component';
import { CollapsibleWellComponent } from '../../shared/collapsible-well.component';
import { VoterService } from './voter.service';
import { DurationPipe } from '../../shared/duration.pipe';
import { AuthService } from '../../user/auth.service';
import { ISession } from '../shared/event.model';
import { Observable } from 'rxjs/Rx';

describe('SessionListComponent', () => {
    let fixture: ComponentFixture<SessionListComponent>;
    let component: SessionListComponent;
    let element: HTMLElement;
    let debugEl: DebugElement;

    beforeEach(async(() => {
        let mockAuthService = {
            isAuthenticated: () => {
                return true;
            },
            currentUser: {
                userName: 'jboone'
            }
        };
        let mockVoterService = {
            userHasVoted: () => {
                return true;
            }
        };

        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                SessionListComponent, 
                DurationPipe
                //UpvoteComponent,
                //CollapsibleWellComponent
                ],
            providers: [
                {provide: AuthService, useValue: mockAuthService},
                {provide: VoterService, useValue: mockVoterService}                
            ],
            //add NO_ERRORS_SCHEMA when doing shallow tests so Angular doesn't error out when it comes across html components it doesn't recognize.
            //becareful when using NO_ERRORS_SCHEMA as it can prevent other errors you may need such is if you forgot to import a module
            schemas: [NO_ERRORS_SCHEMA]
        }). compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
    });

    describe('initial display', () => {
        it('should have the correct session title', () => {
            component.sessions = [
                {id: 3, name: 'Session 1', presenter: 'Joe', duration: 1, level: 'beginner', abstract: 'abstract', voters: ['john', 'bob']}
            ];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 4;

            component.ngOnChanges();
            fixture.detectChanges();

            expect(element.querySelector('[well-title]').textContent).toContain('Session 1');
            expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1');
        });
    });
});