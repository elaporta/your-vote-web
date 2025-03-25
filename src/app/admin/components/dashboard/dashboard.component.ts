import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// Services
import { VoteService } from '../../../votes/services/vote.service';
import { CandidateService } from '../../../candidates/services/candidate.service';

// Interfaces
import { Vote } from '../../../votes/interfaces/vote.interface';
import { Candidate } from '../../../candidates/interfaces/candidate.interface';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: true,
    imports: [CommonModule, RouterModule, /*NgChartsModule, ChartModule*/]
})
export class DashboardComponent implements OnInit {
    loadingVotes = signal(true);
    loadingCandidates = signal(true);

    votes = signal<Vote[]>([]);
    candidates = signal<Candidate[]>([]);

    currentCandidatePage = signal(1);
    currentVotePage = signal(1);
    itemsPerPage = 5;

    totalCandidatePages = computed(() => Math.ceil(this.candidates().length / this.itemsPerPage));
    totalVotePages = computed(() => Math.ceil(this.votes().length / this.itemsPerPage));

    displayedCandidates = computed(() => {
        const start = (this.currentCandidatePage() - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.candidates().slice(start, end);
    });

    displayedVotes = computed(() => {
        const start = (this.currentVotePage() - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.votes().slice(start, end);
    });

    constructor(
        public router: Router,
        private voteService: VoteService,
        private candidateService: CandidateService
    ) {}
    
    ngOnInit() {
        this.fetchVotes();
        this.fetchCandidates();
    }

    nextCandidatePage() {
        if (this.currentCandidatePage() < this.totalCandidatePages()) {
            this.currentCandidatePage.update(page => page + 1);
        }
    }

    previousCandidatePage() {
        if (this.currentCandidatePage() > 1) {
            this.currentCandidatePage.update(page => page - 1);
        }
    }

    nextVotePage() {
        if (this.currentVotePage() < this.totalVotePages()) {
            this.currentVotePage.update(page => page + 1);
        }
    }

    previousVotePage() {
        if (this.currentVotePage() > 1) {
            this.currentVotePage.update(page => page - 1);
        }
    }

    private fetchVotes() {
        this.loadingVotes.set(true);
        this.voteService.getAll().subscribe({
            next: (votes) => {
                this.votes.set(votes);
                this.loadingVotes.set(false);
            },
            error: (error) => {
                console.error('Error fetching votes:', error);
                this.loadingVotes.set(false);
            }
        });
    }

    private fetchCandidates() {
        this.loadingCandidates.set(true);
        this.candidateService.getByVotes().subscribe({
            next: (candidates) => {
                this.candidates.set(candidates);
                this.loadingCandidates.set(false);
            },
            error: (error) => {
                console.error('Error fetching candidates:', error);
                this.loadingCandidates.set(false);
            }
        });
    }
}