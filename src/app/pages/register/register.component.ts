import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { JobsService } from '../../services/jobs.service';
import { slideInOutAnimation } from '../../animations/slideTransition';
import { ColonistService } from '../../services/colonist.service';
import { Colonist } from '../../models/colonist';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

const cantBe = (value: string): ValidatorFn => {
  return (control: AbstractControl) => {
    return control.value === value ? { 'Can\'t be this value': value} : null;
  };
}

const age =  (tooYoung: number, tooOld: number): ValidatorFn => {
  return (control: AbstractControl) => {
    return control.value < 0, control.value < tooYoung || control.value > tooOld ? { 'You\'re not the right age': age} : null;
  };
}

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
  public colonist: Colonist;
  public registerForm: FormGroup;

  constructor(private jobService: JobsService,private colonistService: ColonistService, private router: Router) { 
    this.colonist = new Colonist('','', this.NO_OCCUPATION_SELECTED);

  }

  ngOnInit() {
    this.jobService.getData().subscribe((data)=> {
      this.occupations = data.jobs;
    });
    this.registerForm = new FormGroup( {
      name: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),
      age: new FormControl('', [Validators.required, age(0,100)]),
      job_id: new FormControl(this.NO_OCCUPATION_SELECTED, [cantBe(this.NO_OCCUPATION_SELECTED)])
    })
  }

  postColonist () {
    this.colonistService.postData(this.colonist).subscribe( newColonist => {
      localStorage.setItem('colonist_id', newColonist.colonist.id);
      console.log(newColonist);
      this.router.navigate(['/encounters']);
    });
  }

  get noOccupation() {
    return this.colonist.job_id === this.NO_OCCUPATION_SELECTED;
  }

  register (event) {
    event.preventDefault();
    if (this.registerForm.invalid) {
      const formWrapper = document.getElementById("mars-form-validation-wrapper");
      formWrapper.className = '';
      formWrapper.className += "invalid-form";
    } else {
      const name = this.registerForm.get('name').value;
      const age = this.registerForm.get('age').value;
      const job_id = this.registerForm.get('job_id').value;
      this.colonist = new Colonist(name , age, job_id);
      this.postColonist();
    }

  }



}
