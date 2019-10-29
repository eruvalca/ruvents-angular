import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RuventsService } from 'src/app/services/ruvents.service';
import { Ruvent } from 'src/app/models/ruvent';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-ruvent-edit',
  templateUrl: './ruvent-edit.component.html',
  styleUrls: ['./ruvent-edit.component.css']
})
export class RuventEditComponent implements OnInit {
  ruventForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    address: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl()
  });

  ruvent: Ruvent;
  user: User;

  constructor(private fb: FormBuilder,
              private router: Router,
              private ruventsService: RuventsService,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.getUser();
    }
    this.getRuvent();
  }

  getRuvent() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ruventsService.getRuvent(id).subscribe(
      (data) => {
        this.ruvent = data;
        this.createForm();
      },
      (error) => alert(error)
    );
  }

  createForm() {
    this.ruventForm = this.fb.group({
      title: [this.ruvent.title, Validators.required],
      description: [this.ruvent.description, Validators.required],
      address: [this.ruvent.address, Validators.required],
      startDate: [moment(this.ruvent.startDate).format('YYYY-MM-DD') + 'T' + this.ruvent.startTime,
      Validators.required],
      endDate: [moment(this.ruvent.endDate).format('YYYY-MM-DD') + 'T' + this.ruvent.endTime,
      Validators.required]
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
    this.ruvent.modifyBy = this.user.username;
  }

  onSubmit() {
    this.formToModelBind();
    this.ruventsService.updateRuvent(this.ruvent.ruventId, this.ruvent).subscribe(
      () => this.router.navigate(['/detail/' + this.ruvent.ruventId]),
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
