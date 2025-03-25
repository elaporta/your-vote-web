import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vote } from '../../../votes/interfaces/vote.interface';

@Component({
    selector: 'app-vote-view',
    templateUrl: './vote-view.component.html',
    styleUrls: ['./vote-view.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class VoteViewComponent {
    @Input() vote: Vote | null = null;
    @Input() show = false;
    @Output() close = new EventEmitter<void>();

    onClose() {
        this.close.emit();
    }
} 