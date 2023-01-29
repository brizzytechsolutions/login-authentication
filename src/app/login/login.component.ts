import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private api: ApiService, private snackbar: MatSnackBar, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  ngOnInit(): void {
  }

  async login() {
    if (this.loginForm.invalid) false;

    let user = { ...this.loginForm.value };

    try {
      let res = await this.api.loginUser('/login', user);
      this.snackbar.open(res, 'Ok');
      this.router.navigate(['/home']);
    }
    catch (err: any) {
      this.snackbar.open(err, 'Ok');
    }
  }
}
