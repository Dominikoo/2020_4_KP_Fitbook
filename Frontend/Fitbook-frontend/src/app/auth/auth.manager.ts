import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthManager {
    private token: String = '';
    private login: String = '';

    setToken(token){
        this.token = token;
    }

    getToken(){
        return this.token
    }

    setLogin(login){
        this.login = login
    }

    getLogin(){
        return this.login;
    }
}