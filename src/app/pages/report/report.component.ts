import { Component, OnInit } from '@angular/core';
import { Alien } from '../../models/alien';
import { AliensService } from '../../services/aliens.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [AliensService]
})
export class ReportComponent implements OnInit {

  public aliens: Alien[] = [];

  constructor(private alienService: AliensService) { }

  ngOnInit() {
    this.alienService.getData().subscribe((data)=> {
      this.aliens = data.aliens;
    });
  }

}
