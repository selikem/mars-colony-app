import { Component, OnInit } from '@angular/core';
import { Encounter } from '../../models/encounter';
import { EncountersService } from '../../services/encounters.service';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.scss'],
  providers: [EncountersService]
})
export class EncountersComponent implements OnInit {

  public encounterList: Encounter[] = [];

  constructor(private encounterService: EncountersService) { }

  ngOnInit() {
    this.encounterService.getData().subscribe((data) => {
      this.encounterList = data.encounters;
      console.log(this.encounterList);
    });
  }

}
