import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ruvent } from 'src/app/models/ruvent';
import { RuventsService } from 'src/app/services/ruvents.service';
import * as moment from 'moment';

@Component({
  selector: 'app-ruvent-create',
  templateUrl: './ruvent-create.component.html',
  styleUrls: ['./ruvent-create.component.css']
})
export class RuventCreateComponent implements OnInit {
  ruventForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    address: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl()
  });

  ruvent: Ruvent = new Ruvent();

  constructor(private fb: FormBuilder,
              private router: Router,
              private ruventsService: RuventsService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.ruventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
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
    this.ruventsService.createRuvent(this.ruvent).subscribe(
      () => this.router.navigate(['/home']),
      (error) => alert(error)
    );
  }

}
