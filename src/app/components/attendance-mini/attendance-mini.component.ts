import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { RuventToUser } from 'src/app/models/ruventToUser';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-attendance-mini',
  templateUrl: './attendance-mini.component.html',
  styleUrls: ['./attendance-mini.component.css']
})
export class AttendanceMiniComponent implements OnInit {
  @Input() ruventId: number;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  user: User;
  attendingUsers: RuventToUser[];
  notAttendingUsers: RuventToUser[];

  constructor(private authService: AuthService,
              private attendanceService: AttendanceService) { }

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.getUser();
    }
    this.getRuventAttendance();
  }

  getUser() {
    this.authService.getUser().subscribe(
      (data) => this.user = data,
      (error) => alert(error)
    );
  }

  isLoggedIn() {
    return this.authService.loggedIn();
  }

  getRuventAttendance() {
    this.attendanceService.getRuventAttendance(this.ruventId).subscribe(
      (data) => {
        this.attendingUsers = data.filter(x => x.isAttending);
        this.notAttendingUsers = data.filter(x => !x.isAttending);
      },
      (error) => alert(error)
    );
  }

}
