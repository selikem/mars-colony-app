import { Component, OnInit } from '@angular/core';
import { Alien } from '../../models/alien';
import { AliensService } from '../../services/aliens.service';
import { slideInOutAnimation } from '../../animations/slideTransition';
import { ReportService } from '../../services/report.service';
import { Report } from '../../models/report';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

const cantBe = (value: string): ValidatorFn => {
  return (control: AbstractControl) => {
    return control.value === value ? { 'Can\'t be this value': value} : null;
  };
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [AliensService, ReportService],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})
export class ReportComponent implements OnInit {

  public aliens: Alien[] = [];
  public NO_ATYPE_SELECTED = '(none)';

  report: Report;
  reportForm: FormGroup;

  constructor(private alienService: AliensService, private reportService: ReportService) {
    this.report = new Report (this.NO_ATYPE_SELECTED, '', '', window.localStorage.colonist_id);
   }

  ngOnInit() {
    this.alienService.getData().subscribe((data)=> {
      this.aliens = data.aliens;
    });
    this.reportForm = new FormGroup( {
      alienType: new FormControl(this.NO_ATYPE_SELECTED, [Validators.required, cantBe(this.NO_ATYPE_SELECTED)]),
      actionTaken: new FormControl('', [Validators.required])
    })
  }

  postReport () {
    this.reportService.postData(this.report).subscribe( newReport => console.log(newReport) );
  }

  get noAtype() {
    return this.report.atype === this.NO_ATYPE_SELECTED;
  }

  submitReport(event) {
    event.preventDefault();
    const currentDate = new Date();
    let dateString = `${currentDate.getFullYear()} - ${currentDate.getMonth() + 1} - ${currentDate.getDate()} `;
    if (this.reportForm.invalid) {

    } else {
      const aType = this.reportForm.get('alienType').value;
      const action = this.reportForm.get('actionTaken').value;
      this.report = new Report(aType , dateString, action, window.localStorage.colonist_id);
      this.postReport();
    }
  }



}
