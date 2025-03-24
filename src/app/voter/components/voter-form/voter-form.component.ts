import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Services
import { VoterService } from '../../services/voter.service';
import { CandidateService } from '../../../candidates/services/candidate.service';

// Interfaces
import { Voter } from '../../interfaces/voter.interface';

// Validators
import { uruguayanDocumentValidator } from '../../../shared/validators/uruguayan-document.validator';

@Component({
    selector: 'app-voter-form',
    standalone: true,
    templateUrl: './voter-form.component.html',
    imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class VoterFormComponent {
    voterForm: FormGroup;
    loading = signal(false);
    error = signal('');
    success = signal(false);

    constructor(
        private fb: FormBuilder,
        private voterService: VoterService,
        private candidateService: CandidateService
    ) {
        this.voterForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
            lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
            document: ['', [Validators.required, uruguayanDocumentValidator()]],
            dob: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
            address: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
            phone: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
            gender: ['', [Validators.required, Validators.pattern(/^(male|female|other)$/)]],
            isCandidate: [false, [Validators.required]]
        });
    }

    onSubmit() {
        this.loading.set(true);
        this.error.set('');
        this.success.set(false);

        const voter: Voter = {
            name: this.voterForm.value.name,
            lastName: this.voterForm.value.lastName,
            document: this.voterForm.value.document,
            dob: this.voterForm.value.dob,
            address: this.voterForm.value.address,
            phone: this.voterForm.value.phone,
            gender: this.voterForm.value.gender
        };

        const isCandidate = this.voterForm.value.isCandidate;
        const service = isCandidate ? this.candidateService : this.voterService;

        service.create(voter).subscribe({
            next: () => {
                this.success.set(true);
                this.voterForm.reset();
            },
            error: (err) => {
                let errorMessage = 'Failed to create voter.';
                if(err.error?.message)  errorMessage = (typeof err.error?.message === 'string') ? err.error?.message : JSON.stringify(err.error?.message);
                this.error.set(errorMessage);
                this.loading.set(false);
            },
            complete: () => this.loading.set(false)
        });
    }
}