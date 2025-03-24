import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// Services
import { VoteService } from '../../../votes/services/vote.service';
import { CandidateService } from '../../../candidates/services/candidate.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: true,
    imports: [CommonModule, RouterModule, /*NgChartsModule, ChartModule*/]
})
export class DashboardComponent implements OnInit {
    loading = signal(true);

    constructor(
        public router: Router,
        private voteService: VoteService,
        private candidateService: CandidateService
    ) {}
    
    ngOnInit() {}
}