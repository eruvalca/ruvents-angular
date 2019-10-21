import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RuventsService } from 'src/app/services/ruvents.service';
import { Ruvent } from 'src/app/models/ruvent';

@Component({
  selector: 'app-ruvent-detail',
  templateUrl: './ruvent-detail.component.html',
  styleUrls: ['./ruvent-detail.component.css']
})
export class RuventDetailComponent implements OnInit {
  ruvent: Ruvent;

  constructor(private ruventsService: RuventsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRuvent();
  }

  getRuvent() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ruventsService.getRuvent(id).subscribe(
      (data) => this.ruvent = data,
      (error) => alert(error)
    );
  }

}
