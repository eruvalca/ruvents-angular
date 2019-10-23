import { Component, OnInit } from '@angular/core';
import { Ruvent } from 'src/app/models/ruvent';
import { RuventsService } from 'src/app/services/ruvents.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ruvents: Ruvent[];

  currentMonthDate: moment.Moment;
  prevMonthDate: moment.Moment;
  nextMonthDate: moment.Moment;

  constructor(private ruventsService: RuventsService) { }

  ngOnInit() {
    this.getRuvents(moment());
  }

  getRuvents(date: moment.Moment) {
    this.ruventsService.getRuvents(Number(date.format('M')), Number(date.format('YYYY'))).subscribe(
      (data) => {
        this.currentMonthDate = date;
        this.prevMonthDate = moment(this.currentMonthDate).subtract(1, 'months');
        this.nextMonthDate = moment(this.currentMonthDate).add(1, 'months');
        this.ruvents = data;
      },
      (error) => alert(error)
    );
  }

}
