import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [JobsService]
})
export class RegisterComponent implements OnInit {

  public occupations: Job[] = [];

  constructor(private jobService: JobsService) { }

  ngOnInit() {
    this.jobService.getData().subscribe((data)=> {
      this.occupations = data.jobs;
    });
  }

}
