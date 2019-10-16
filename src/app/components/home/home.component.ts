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
  monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  currentMonthDate: moment.Moment;
  prevMonthDate: moment.Moment;
  prevMonthString: string;
  nextMonthDate: moment.Moment;
  nextMonthString: string;

  constructor(private ruventsService: RuventsService) { }

  ngOnInit() {
    this.getRuvents(moment().format('MM-DD-YYYY'));
  }

  getRuvents(date: string) {
    this.ruventsService.getRuvents(date).subscribe(
      (data) => {
        this.currentMonthDate = moment(date);
        this.prevMonthDate = moment(this.currentMonthDate).subtract(1, 'months');
        this.prevMonthString = moment(this.prevMonthDate).format('MM-DD-YYYY');
        this.nextMonthDate = moment(this.currentMonthDate).add(1, 'months');
        this.nextMonthString = moment(this.nextMonthDate).format('MM-DD-YYYY');
        this.ruvents = data;
      },
      (error) => alert(error)
    );
  }

}
