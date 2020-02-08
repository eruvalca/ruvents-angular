import { Component, OnInit } from '@angular/core';
import { Ruvent } from 'src/app/models/ruvent';
import { RuventsService } from 'src/app/services/ruvents.service';
import * as moment from 'moment';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { RuventAttendanceVM } from 'src/app/models/ruventAttendanceVM';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faChevronCircleLeft = faChevronCircleLeft;
  faChevronCircleRight = faChevronCircleRight;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  ruvents: RuventAttendanceVM[];

  currentMonthDate: moment.Moment;
  prevMonthDate: moment.Moment;
  nextMonthDate: moment.Moment;

  constructor(private ruventsService: RuventsService,
              private authService: AuthService) { }

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.getRuvents(moment());
    }
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

  isLoggedIn() {
    return this.authService.loggedIn();
  }

}
