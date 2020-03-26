import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthManager {
    private token: String = '';

    setToken(token){
        this.token = token;
    }

    getToken(){
        return this.token
    }
}