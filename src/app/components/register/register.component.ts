import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    nickName: new FormControl()
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
    this.registerForm = this.fb.group({
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.minLength(6)],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      nickName: this.user.nickName
    });
  }

  register(): void {
    this.user = this.registerForm.getRawValue();
    this.user.username = this.user.username.trim();
    this.authService.register(this.user).subscribe(
      () => {
        alert('Registration Successful!\n\nPress "Ok" to login.');
        this.router.navigate(['/login']);
      },
      error => alert(error.error)
    );
  }

}
