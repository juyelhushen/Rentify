import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { Signup } from '../../../models/model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  signupform: any = FormGroup;
  token!: string;

  roles: string[] = ['TENANT', 'LANDLORD'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateSignupForm();
  }

  validateSignupForm = () => {
    this.signupform = this.fb.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required, Validators.minLength(10)]],
      role: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  };

  doSignup = () => {
    const data = this.signupform.value;
    let signupInfo: Signup = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phoneNumber: data.phoneNumber,
      role: data.role,
      password: data.password,
    };

    this.userService.signUp(signupInfo).subscribe({
      next: (res) => {
        this.token = res.token;
        this.userService.saveToken(this.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  };


}

