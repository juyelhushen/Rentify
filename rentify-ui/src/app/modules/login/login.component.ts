import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Login } from '../../models/model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: any = FormGroup;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.validateLoginForm();
  }

  validateLoginForm = () => {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  };

  doLogin = () => {
    const formData = this.loginForm.value;
    let loginInfo: Login = {
      email: formData.email,
      password: formData.password,
    };

    console.log(loginInfo);

    this.userService.login(formData).subscribe({
      next: (res: any) => {
        this.token = res.token;
        this.userService.saveToken(this.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login failed', err.toString());
      },
    });
  };
}