import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenResponse } from '../models/token-response';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly http = inject(HttpClient);

    constructor() { }

    public isAuthenticated(): boolean {
        return false;
    }

    public logIn(username: string, password: string): Observable<TokenResponse> {
        return this.http.post<TokenResponse>('http://localhost:3000/auth/sign-in', { username, password });
        //return this.http.post<TokenResponse>('http://localhost:3000/auth/sign-in', { username: 'harry.weinfurth@example.com', password: 'test' });
    }
}
