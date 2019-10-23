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
    startDate: new FormControl(),
    endDate: new FormControl()
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
      startDate: [moment(this.ruvent.startDate).format('YYYY-MM-DDTHH:mm'),
      Validators.required],
      endDate: [moment(this.ruvent.endDate).format('YYYY-MM-DDTHH:mm'),
      Validators.required]
    });
  }

  formToModelBind() {
    this.ruvent.title = this.ruventForm.get('title').value;
    this.ruvent.description = this.ruventForm.get('description').value;
    this.ruvent.address = this.ruventForm.get('address').value;
    this.ruvent.startDate = moment(this.ruventForm.get('startDate').value, 'YYYY-MM-DDThh:mm').format();
    this.ruvent.endDate = moment(this.ruventForm.get('endDate').value, 'YYYY-MM-DDThh:mm').format();
  }

  onSubmit() {
    this.formToModelBind();
    this.ruventsService.updateRuvent(this.ruvent.ruventId, this.ruvent).subscribe(
      () => this.router.navigate(['/detail/' + this.ruvent.ruventId]),
      (error) => alert(error)
    );
  }

  formatTime(date: string) {
    return moment(date).format('H:mm');
  }

}
