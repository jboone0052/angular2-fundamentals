import { SessionListComponent } from './session-list.component';
import { VoterService } from './voter.service';
import { AuthService } from '../../user/auth.service';
import { ISession } from '../shared/event.model';
import { Observable } from 'rxjs/Rx';

describe('SessionListComponent', () => {
    let component: SessionListComponent;
    let mockAuthService, mockVoterService, mockHttp;

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['post', 'put', 'delete']);
        mockAuthService = new AuthService(mockHttp);
        mockVoterService = new VoterService(mockHttp);
        mockAuthService.currentUser = {
            userName: 'jboone'
        };
        component = new SessionListComponent(mockAuthService, mockVoterService);
    });

    describe('ngOnChanges', () => {

        it('should filter sessions correctly', () => {
            component.sessions = <ISession[]>[
                {name: 'session 1', level: 'intermediate'},
                {name: 'session 2', level: 'beginner'},
                {name: 'session 3', level: 'intermediate'},
                {name: 'session 4', level: 'advanced'},
                {name: 'session 5', level: 'intermediate'},
            ];
            component.filterBy = 'intermediate';
            component.sortBy = 'name';
            component.eventId = 3;

            component.ngOnChanges();

            expect(component.visibleSessions.length).toBe(3);

        });

        it('should sort sessions correctly', () => {
            component.sessions = <ISession[]>[
                {name: 'session 3', level: 'intermediate'},
                {name: 'session 2', level: 'beginner'},
                {name: 'session 1', level: 'intermediate'},
                {name: 'session 5', level: 'advanced'},
                {name: 'session 4', level: 'intermediate'},
            ];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 3;

            component.ngOnChanges();

            expect(component.visibleSessions[0].name).toBe('session 1');
            expect(component.visibleSessions[4].name).toBe('session 5');
            

        });

        
    });

    describe('userHasVoted', () => {
        it('should return true when user has voted', () => {
            component.sessions = <ISession[]>[
                {name: 'session 3', level: 'intermediate', voters: ['jboone', 'mikes', 'john']}
            ];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 3;

            expect(component.userHasVoted(component.sessions[0])).toBe(true);
        });

        it('should return false when user has not voted', () => {
            component.sessions = <ISession[]>[
                {name: 'session 3', level: 'intermediate', voters: ['mikes', 'john']}
            ];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 3;

            expect(component.userHasVoted(component.sessions[0])).toBe(false);
        });
    });

    describe('toggleVote', () => {
        it('should delete vote if user has voted', () => {
            mockHttp.delete.and.returnValue(Observable.of(false));
            component.sessions = <ISession[]>[
                {name: 'session 3', level: 'intermediate', voters: ['jboone', 'mikes', 'john']}
            ];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 3;

            component.toggleVote(component.sessions[0]);

            expect(component.sessions[0].voters.length).toBe(2);
        });

        it('should add vote if user hasn\'t voted', () => {
            mockHttp.post.and.returnValue(Observable.of(false));
            
            component.sessions = <ISession[]>[
                {name: 'session 3', level: 'intermediate', voters: ['mikes', 'john']}
            ];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 3;

            component.toggleVote(component.sessions[0]);

            expect(component.sessions[0].voters.length).toBe(3);
        });
        
    });
});