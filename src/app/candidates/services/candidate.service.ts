import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interfaces
import { Candidate } from '../interfaces/candidate.interface';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private readonly API_URL = 'http://127.0.0.1:8000/candidate';

  constructor(private http: HttpClient) {}

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<{data: Candidate[]}>(this.API_URL).pipe(
      map((response: {data: Candidate[]}) => response.data)
    );
  }
}