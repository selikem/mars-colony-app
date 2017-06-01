import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { JobsService } from '../../services/jobs.service';
import { slideInOutAnimation } from '../../animations/slideTransition';
import { ColonistService } from '../../services/colonist.service';
import { Colonist } from '../../models/colonist';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [JobsService, ColonistService],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})
export class RegisterComponent implements OnInit {

  public occupations: Job[] = [];
  public NO_OCCUPATION_SELECTED = '(none)';

  colonist: Colonist;
  registerForm: FormGroup;

  constructor(private jobService: JobsService,private colonistService: ColonistService) { 
    this.colonist = new Colonist('','', this.NO_OCCUPATION_SELECTED);

  }

  ngOnInit() {
    this.jobService.getData().subscribe((data)=> {
      this.occupations = data.jobs;
    });
    this.registerForm = new FormGroup( {
      name: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),
      age: new FormControl('', [Validators.required,]),
      job_id: new FormControl(this.NO_OCCUPATION_SELECTED, [])
    })
  }

  postColonist () {
    this.colonistService.postData(this.colonist).subscribe( newColonist => {
      window.localStorage.setItem('colonist_id', newColonist.colonist.id);
    });
  }

  get noOccupation() {
    return this.colonist.job_id === this.NO_OCCUPATION_SELECTED;
  }

}
