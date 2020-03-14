import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {timeout} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;

  constructor(private _authService: AuthService, private _router: Router, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.minLength(3), Validators.required]),
      password: new FormControl('', [Validators.minLength(4), Validators.required])
    });
  }

  submit() {
    this.isLoading = true;
    const {login, password} = this.loginForm.value;
    this._authService.login(login, password).pipe(timeout(1000)).subscribe(data => {
        this._authService.setAuthToken(data.token);
        this._router.navigate(['/']);
      }, err => {
        this._snackBar.open(err.error.message, null, {duration: 2000});
        this.isLoading = false;
      }
    );
  }
}
