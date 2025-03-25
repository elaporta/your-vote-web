import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

// Interfaces
import { Vote, SubmitVote } from '../interfaces/vote.interface';

@Injectable({
    providedIn: 'root'
})
export class VoteService {
    private readonly API_URL = 'http://127.0.0.1:8000/vote';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Vote[]> {
        return this.http.get<{data: Vote[]}>(this.API_URL).pipe(
            map((response: {data: Vote[]}) => response.data)
        );
    }

    create(vote: SubmitVote): Observable<any> {
        return this.http.post(this.API_URL, vote);
    }
}