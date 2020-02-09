import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    phoneNumber: new FormControl()
  });

  user: User;

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.user = new User();
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      phoneNumber: [this.user.phoneNumber, Validators.required]
    });
  }

  login() {
    this.user = this.loginForm.getRawValue();
    this.user.phoneNumber = this.user.phoneNumber.toString().trim();
    this.authService.login(this.user).subscribe(
      data => {
        if (data === null) {
          alert('This user does not exist.');
        } else {
          localStorage.setItem('Token', data.token);
          this.router.navigate(['/home']);
        }
      },
      error => {
        console.log(error);
        // if (error.status === 401) {
        //   alert('Wrong password.');
        // } else {
        alert('An unknown error has ocurred. Please contact Emo.');
        // }
      }
    );
  }

}
