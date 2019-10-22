import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RuventsService } from 'src/app/services/ruvents.service';
import { Ruvent } from 'src/app/models/ruvent';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NumberToTimePipe, NumberToTimeCodePipe } from 'src/app/pipes/numberToTime';

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
  startTimeFormat: string;
  endTimeFormat: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private ruventsService: RuventsService,
              private route: ActivatedRoute,
              private numberToTimeCodePipe: NumberToTimeCodePipe) { }

  ngOnInit() {
    this.getRuvent();
  }

  getRuvent() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ruventsService.getRuvent(id).subscribe(
      (data) => {
        this.ruvent = data;
        this.formatTime();
        console.log(this.startTimeFormat);
        console.log(this.endTimeFormat);
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
      startTime: [this.startTimeFormat, Validators.required],
      endTime: [this.endTimeFormat, Validators.required]
    });
  }

  formatTime() {
    this.startTimeFormat = this.numberToTimeCodePipe.transform(this.ruvent.startTimeHour, this.ruvent.startTimeMinute);
    this.endTimeFormat = this.numberToTimeCodePipe.transform(this.ruvent.endTimeHour, this.ruvent.endTimeMinute);
  }

}
