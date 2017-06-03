import { Component, OnInit } from '@angular/core';
import { Encounter } from '../../models/encounter';
import { EncountersService } from '../../services/encounters.service';
import { slideInOutAnimation } from '../../animations/slideTransition';


@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.scss'],
  providers: [EncountersService],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }

})
export class EncountersComponent implements OnInit {

  public encounterList: Encounter[] = [];

  constructor(private encounterService: EncountersService) { }

  ngOnInit() {
    this.encounterService.getData().subscribe((data) => {
      this.encounterList = data.encounters;
      const sortedAndFiltered = this.encounterList.filter((item) => {
        const regExp = /\d\d\d\d-\d\d-\d\d\b/g;
        const encounterDate = new Date(item.date);
        const currentDate = new Date();
        if (encounterDate <= currentDate) return true;
        return false;
        }).sort((a, b) => {
          const date1 = new Date(a.date);
          const date2 = new Date(b.date);
          if (date1 > date2) return -1;
          if (date1 < date2) return 1;
          else 0;
        });
        this.encounterList = sortedAndFiltered;
    });
  }

}
