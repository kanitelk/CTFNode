import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/AuthService/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      login: new FormControl('', [Validators.minLength(3), Validators.required]),
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.minLength(4), Validators.required])
    });
  }

  submit() {
    this.isLoading = true;
    const {login, email, password} = this.registerForm.value;
    this._authService.register(login, email, password).subscribe(data => {
        this._authService.setAuthToken(data.token);
        this._router.navigate(['/tasks']);
      }, err => {
        this._snackBar.open(err.error.message, null, {duration: 2000});
        this.isLoading = false;
      }
    );
  }
}
