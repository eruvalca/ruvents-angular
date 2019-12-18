import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { RuventToUser } from 'src/app/models/ruventToUser';
import { AttendanceService } from 'src/app/services/attendance.service';

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
  hasUserResponded = false;
  isUserAttending = false;
  attendingUsers: RuventToUser[];
  notAttendingUsers: RuventToUser[];
  showAttendees = false;

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

  toggleAttendees() {
    this.showAttendees = !this.showAttendees;
  }

  toggleAttending() {
    if (this.hasUserResponded) {
      if (this.isUserAttending) {
        const ruventToUserId = this.attendingUsers.find(x => x.userId === this.user.userId).ruventToUserId;
        this.deleteAttendance(ruventToUserId);
      } else {
        const ruventToUser: RuventToUser = new RuventToUser();
        ruventToUser.ruventToUserId = this.notAttendingUsers.find(x => x.userId === this.user.userId).ruventToUserId;
        ruventToUser.isAttending = true;
        ruventToUser.ruventId = this.ruventId;
        ruventToUser.userId = this.user.userId;
        this.updateAttendance(ruventToUser.ruventToUserId, ruventToUser);
      }
    } else {
      const ruventToUser: RuventToUser = new RuventToUser();
      ruventToUser.isAttending = true;
      ruventToUser.ruventId = this.ruventId;
      ruventToUser.userId = this.user.userId;
      this.createAttendance(ruventToUser);
    }
  }

  toggleNotAttending() {
    if (this.hasUserResponded) {
      if (this.isUserAttending) {
        const ruventToUser: RuventToUser = new RuventToUser();
        ruventToUser.ruventToUserId = this.attendingUsers.find(x => x.userId === this.user.userId).ruventToUserId;
        ruventToUser.isAttending = false;
        ruventToUser.ruventId = this.ruventId;
        ruventToUser.userId = this.user.userId;
        this.updateAttendance(ruventToUser.ruventToUserId, ruventToUser);
      } else {
        const ruventToUserId = this.notAttendingUsers.find(x => x.userId === this.user.userId).ruventToUserId;
        this.deleteAttendance(ruventToUserId);
      }
    } else {
      const ruventToUser: RuventToUser = new RuventToUser();
      ruventToUser.isAttending = false;
      ruventToUser.ruventId = this.ruventId;
      ruventToUser.userId = this.user.userId;
      this.createAttendance(ruventToUser);
    }
  }

  getRuventAttendance() {
    this.attendanceService.getRuventAttendance(this.ruventId).subscribe(
      (data) => {
        this.attendingUsers = data.filter(x => x.isAttending);
        this.notAttendingUsers = data.filter(x => !x.isAttending);

        const thisAttendingUser = this.attendingUsers.find(x => x.userId === this.user.userId);
        const thisNonAttendingUser = this.notAttendingUsers.find(x => x.userId === this.user.userId);

        if (typeof thisAttendingUser === 'undefined' && typeof thisNonAttendingUser === 'undefined') {
          this.hasUserResponded = false;
        } else {
          this.hasUserResponded = true;
          if (typeof thisAttendingUser !== 'undefined' && typeof thisNonAttendingUser === 'undefined') {
            this.isUserAttending = true;
          } else {
            this.isUserAttending = false;
          }
        }
      },
      (error) => alert(error)
    );
  }

  createAttendance(attendance: RuventToUser) {
    this.attendanceService.createAttendance(attendance).subscribe(
      (data) => this.getRuventAttendance(),
      (error) => alert(error)
    );
  }

  updateAttendance(id: number, attendance: RuventToUser) {
    this.attendanceService.updateAttendance(id, attendance).subscribe(
      (data) => this.getRuventAttendance(),
      (error) => alert(error)
    );
  }

  deleteAttendance(id: number) {
    this.attendanceService.deleteAttendance(id).subscribe(
      (data) => this.getRuventAttendance(),
      (error) => alert(error)
    );
  }

}
