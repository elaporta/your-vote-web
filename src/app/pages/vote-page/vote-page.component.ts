import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

// Services
import { CandidateService } from '../../candidates/services/candidate.service';
import { VoteService } from '../../votes/services/vote.service';

// Interfaces
import { Candidate } from '../../candidates/interfaces/candidate.interface';

@Component({
    selector: 'app-vote-page',
    templateUrl: './vote-page.component.html',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export default class VotePageComponent implements OnInit {
    voteForm: FormGroup;
    candidates = signal<Candidate[]>([]);
    loading = signal(false);
    error = signal('');
    success = signal(false);
    
    constructor(
        private fb: FormBuilder,
        private candidateService: CandidateService,
        private voteService: VoteService
    ) {
        this.voteForm = this.fb.group({
            document: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
            candidateVotedId: ['', Validators.required]
        });
    }
    
    ngOnInit() {
        this.loadCandidates();
    }
    
    private loadCandidates() {
        this.candidateService.getCandidates().subscribe({
            next: (candidates) => this.candidates.set(candidates),
            error: (err) => this.error.set('Failed to load candidates. Please try again later.')
        });
    }
    
    onSubmit() {
        if(this.voteForm.valid) {
            this.loading.set(true);
            this.error.set('');
            this.success.set(false);
            
            const vote = {
                document: this.voteForm.get('document')?.value,
                candidateVotedId: parseInt(this.voteForm.get('candidateVotedId')?.value, 10)
            };
            
            this.voteService.submitVote(vote).subscribe({
                next: () => {
                    this.success.set(true);
                    this.voteForm.reset();
                },
                error: (err) => {
                    let errorMessage = 'Failed to submit vote. Please try again.';
                    if(err.error?.message) errorMessage = (typeof err.error?.message === 'string') ? err.error?.message : JSON.stringify(err.error?.message);
                    this.error.set(errorMessage);
                    this.loading.set(false);
                },
                complete: () => {
                    this.loading.set(false);
                }
            });
        }
    }
}