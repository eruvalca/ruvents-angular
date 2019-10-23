import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RuventsService } from 'src/app/services/ruvents.service';
import { Ruvent } from 'src/app/models/ruvent';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

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
    date: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl()
  });

  ruvent: Ruvent;

  constructor(private fb: FormBuilder,
              private router: Router,
              private ruventsService: RuventsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
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
      date: [moment(this.ruvent.date).format('YYYY-MM-DD'), Validators.required],
      startTime: [this.formatTime(this.ruvent.startTimeHour, this.ruvent.startTimeMinute),
        Validators.required],
      endTime: [this.formatTime(this.ruvent.endTimeHour, this.ruvent.endTimeMinute),
        Validators.required]
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
    this.ruventsService.updateRuvent(this.ruvent.ruventId, this.ruvent).subscribe(
      () => this.router.navigate(['/detail/' + this.ruvent.ruventId]),
      (error) => alert(error)
    );
  }

  formatTime(hour: number, minute: number) {
    let hourString: string;
    let minuteString: string;
    if (hour < 10) {
        hourString = '0' + hour.toString();
    } else {
        hourString = hour.toString();
    }
    if (minute < 10) {
        minuteString = '0' + minute.toString();
    } else {
        minuteString = minute.toString();
    }

    return hourString + ':' + minuteString;
  }

}
