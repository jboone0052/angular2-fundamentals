import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ISession } from '../shared/index';
import { AuthService } from '../../user/auth.service';
import { VoterService } from './voter.service';

@Component({
    moduleId: module.id,
    selector: 'session-list',
    templateUrl: 'session-list.component.html'
})
export class SessionListComponent implements OnInit, OnChanges {
    constructor(private _auth: AuthService, private _vote: VoterService) { }

    ngOnInit() { }

    @Input() sessions:ISession[];
    @Input() filterBy: string;
    @Input() sortBy: string;
    @Input() eventId: number;

    visibleSessions: ISession[] = [];

    ngOnChanges() {
        if (this.sessions){
            this.filterSessions(this.filterBy);
            this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc);
        }   
    }

    filterSessions(filter) {
        console.log(filter);
        if (filter === 'all') {
            this.visibleSessions = this.sessions.slice(0);
        } else {
            this.visibleSessions = this.sessions.filter(session => {
                return session.level.toLocaleLowerCase() === filter;
            });
        }
    }

    toggleVote(session: ISession) {
        if (this.userHasVoted(session)) {
            this._vote.deleteVoter(this.eventId, session, this._auth.currentUser.userName);
        } else {
            this._vote.addVoter(this.eventId, session, this._auth.currentUser.userName);
        }

        if (this.sortBy === 'votes') {
            this.visibleSessions.sort(sortByVotesDesc);
        }
    }

    userHasVoted(session: ISession) {
        return this._vote.userHasVoted(session, this._auth.currentUser.userName);
    }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
    if (s1.name > s2.name) return 1;
    else if (s1.name === s2.name) return 0;
    else return -1;
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
     return s2.voters.length - s1.voters.length;
}