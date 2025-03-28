import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

// Interfaces
import { Candidate } from '../interfaces/candidate.interface';

@Injectable({
    providedIn: 'root'
})
export class CandidateService {
    private readonly API_URL = environment.apiUrl + '/candidate';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Candidate[]> {
        return this.http.get<{data: Candidate[]}>(this.API_URL).pipe(
            map((response: {data: Candidate[]}) => response.data)
        );
    }

    getByVotes(): Observable<Candidate[]> {
        return this.http.get<{data: Candidate[]}>(this.API_URL + '/by/votes').pipe(
            map((response: {data: Candidate[]}) => response.data)
        );
    }

    create(voter: Candidate): Observable<any> {
        return this.http.post(this.API_URL, voter);
    }
}