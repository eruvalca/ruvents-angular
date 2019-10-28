import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { RuventToUser } from 'src/app/models/ruventToUser';
import { RuventsService } from 'src/app/services/ruvents.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  @Input() ruventId: number;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  user: User;
  attendingUsers: RuventToUser[];
  notAttendingUsers: RuventToUser[];

  constructor(private authService: AuthService,
              private ruventsService: RuventsService) { }

  ngOnInit() {
    this.getUser();
    this.getRuventAttendance();
  }

  getUser() {
    this.authService.getUser().subscribe(
      (data) => this.user = data,
      (error) => alert(error)
    );
  }

  getRuventAttendance() {
    this.ruventsService.getRuventAttendance(this.ruventId).subscribe(
      (data) => {
        this.attendingUsers = data.filter(x => x.isAttending);
        this.notAttendingUsers = data.filter(x => !x.isAttending);
      },
      (error) => alert(error)
    );
  }

}
