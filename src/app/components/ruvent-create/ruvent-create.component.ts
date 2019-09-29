import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ruvent } from 'src/app/models/ruvent';
import { RuventsService } from 'src/app/services/ruvents.service';

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
    date: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl()
  });

  ruvent: Ruvent = new Ruvent();

  constructor(private fb: FormBuilder,
              private router: Router,
              private ruventsService: RuventsService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.ruventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  formToModelBind() {
    this.ruvent.title = this.ruventForm.get('title').value;
    this.ruvent.description = this.ruventForm.get('description').value;
    this.ruvent.address = this.ruventForm.get('address').value;
    this.ruvent.date = new Date(this.ruventForm.get('date').value);

    const startTime = this.ruventForm.get('startTime').value.split(':');
    this.ruvent.startTimeHour = Number(startTime[0]);
    this.ruvent.startTimeMinute = Number(startTime[1]);

    const endTime = this.ruventForm.get('endTime').value.split(':');
    this.ruvent.endTimeHour = Number(endTime[0]);
    this.ruvent.endTimeMinute = Number(endTime[1]);
  }

  onSubmit() {
    this.formToModelBind();
    this.ruventsService.createRuvent(this.ruvent).subscribe(
      () => this.router.navigate(['/home']),
      (error) => alert(error)
    );
  }

}
