import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  registerUser(endpoint: string, user: any, options?: {}): any {

    // For assessment purpose I will store the user in the Session Storage
    return new Promise((resolve, reject) => {
      let users = [];

      if (sessionStorage.getItem('users')) {
        // Get all users
        users = JSON.parse(sessionStorage.getItem('users') || '[]');
      }

      // check If user exists
      if (users.filter((_user: any) => _user.email === user.email).length > 0) {
        reject("User Already Exists");
      } else {
        // add the new user to the list
        users.push(user);
        // Store data
        sessionStorage.setItem('users', JSON.stringify(users));

        resolve("User Added successfully");
      }
    });

    // We are using dummy server url, so this wont work
    // but this is basically how I would send a POST request to the server
    let url = `${this.baseUrl}${endpoint}`;
    return this.http.post(url, user);
  }

  loginUser(endpoint: string, user: any, options?: {}): any {
    return new Promise((resolve, reject) => {
      // This logic will be done in backend
      let users = [];
      // For assessment purpose I will get the user from the Session Storage
      if (sessionStorage.getItem('users')) {
        // Get all users
        users = JSON.parse(sessionStorage.getItem('users') || '[]');
      }

      let foundUser = users.filter((_user: any) => _user.email === user.email);

      // check If user exists
      if (foundUser.length > 0) {
        let currentUser = foundUser[0];
        currentUser.password = atob(currentUser.password);

        if (currentUser.password === user.password) {
          sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
          resolve("Success");
        } else {
          reject("Password doesn't match");
        }
      } else {
        reject("User Not Found");
      }
    });

    // We are using dummy server url, so this wont work
    let url = `${this.baseUrl}${endpoint}`;
    return this.http.post(url, user);
  }
}
