import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Vote } from '../interfaces/vote.interface';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private readonly API_URL = 'http://127.0.0.1:8000/vote';

  constructor(private http: HttpClient) {}

  submitVote(vote: Vote): Observable<any> {
    return this.http.post(this.API_URL, vote);
  }
}