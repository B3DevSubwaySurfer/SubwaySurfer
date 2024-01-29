import { Component, Input, OnInit } from '@angular/core';
import { BorneClasse } from "../../../classes/borne.classe";
import { Router } from '@angular/router';
import { AppService } from "../../../services/app.service";

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {
  @Input() stationData!: any;
  private gameCompletionCheckService: any;

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.stationData);
  }

  goToInkLevelGame(borne: BorneClasse) {
    this.router.navigate(['/ink-level-game'], { queryParams: { borne: JSON.stringify(borne) } });
  }



  gotToPaperLevelGame(borne: BorneClasse) {
    this.router.navigate(['/paper-level-game']);
    this.appService.resetPaperLevelForBorne(borne);
  }
}
