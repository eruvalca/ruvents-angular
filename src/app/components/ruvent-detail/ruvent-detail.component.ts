import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RuventsService } from 'src/app/services/ruvents.service';
import { Ruvent } from 'src/app/models/ruvent';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';
import { User } from 'src/app/models/user';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ruvent-detail',
  templateUrl: './ruvent-detail.component.html',
  styleUrls: ['./ruvent-detail.component.css']
})
export class RuventDetailComponent implements OnInit {
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  ruvent: Ruvent;
  user: User;

  constructor(private ruventsService: RuventsService,
              private route: ActivatedRoute,
              private router: Router,
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
      (data) => this.ruvent = data,
      (error) => alert(error)
    );
  }

  deleteRuvent() {
    if (confirm('Are you sure you want to delete this event?')) {
      this.ruventsService.deleteRuvent(this.ruvent.ruventId).subscribe(
        (data) => this.router.navigate(['/home']),
        (error) => alert(error)
      );
    }
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

}
