import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private api: ApiService, private snackbar: MatSnackBar, private router: Router) {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),
    })
  }

  ngOnInit(): void {
  }

  doesPasswordMatch(): boolean {
    return this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value;
  }

  async register() {
    if (this.registerForm.invalid) false;

    let user = { ...this.registerForm.value };
    delete user.confirmPassword;

    // Encode Password
    user.password = btoa(user.password);

    try {
      let res = await this.api.registerUser('/register', user);
      this.snackbar.open(res, 'Ok');
      this.router.navigate(['/login']);
    }
    catch (err: any) {
      this.snackbar.open(err, 'Ok');
    }
  }

  async login() {
    this.router.navigate(['/login']);
  }

}
