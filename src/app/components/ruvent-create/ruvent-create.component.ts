import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ruvent } from 'src/app/models/ruvent';
import { RuventsService } from 'src/app/services/ruvents.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-ruvent-create',
  templateUrl: './ruvent-create.component.html',
  styleUrls: ['./ruvent-create.component.css']
})
export class RuventCreateComponent implements OnInit {
  ruventForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    address: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl()
  });

  ruvent: Ruvent = new Ruvent();
  user: User;

  constructor(private fb: FormBuilder,
              private router: Router,
              private ruventsService: RuventsService,
              private authService: AuthService) { }

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.getUser();
    }
    this.createForm();
  }

  createForm() {
    this.ruventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  formToModelBind() {
    this.ruvent.title = this.ruventForm.get('title').value;
    this.ruvent.description = this.ruventForm.get('description').value;
    this.ruvent.address = this.ruventForm.get('address').value;
    const startDate = this.ruventForm.get('startDate').value.split('T');
    this.ruvent.startDate = startDate[0];
    this.ruvent.startTime = startDate[1];
    const endDate = this.ruventForm.get('endDate').value.split('T');
    this.ruvent.endDate = endDate[0];
    this.ruvent.endTime = endDate[1];
    this.ruvent.createdBy = this.user.username;
  }

  onSubmit() {
    this.formToModelBind();
    this.ruventsService.createRuvent(this.ruvent).subscribe(
      () => this.router.navigate(['/home']),
      (error) => alert(error)
    );
  }

  isLoggedIn() {
    return this.authService.loggedIn();
  }

  getUser() {
    this.authService.getUser().subscribe(
      (data) => this.user = data,
      (error) => alert(error)
    );
  }

}
