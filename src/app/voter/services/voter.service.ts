import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interfaces
import { Voter } from '../interfaces/voter.interface';

@Injectable({
    providedIn: 'root'
})
export class VoterService {
    private readonly API_URL = 'http://127.0.0.1:8000/voter';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Voter[]> {
        return this.http.get<{data: Voter[]}>(this.API_URL).pipe(
            map((response: {data: Voter[]}) => response.data)
        );
    }

    create(voter: Voter): Observable<any> {
        return this.http.post(this.API_URL, voter);
    }
}