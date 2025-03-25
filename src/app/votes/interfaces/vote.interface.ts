// Interfaces
import { Voter } from "../../voter/interfaces/voter.interface";
import { Candidate } from "../../candidates/interfaces/candidate.interface";

export interface SubmitVote {
    document: string;
    candidateVotedId: number;
}

export interface Vote {
    id: number;
    candidateId: number;
    candidateVotedId: number;
    date: string;
    voter: Voter;
    candidate: Candidate;
}