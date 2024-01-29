  import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BorneClasse } from "../../../classes/borne.classe";
import { AppService } from "../../../services/app.service";

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {
  @Input() stationData!: any;
  @Input() bornes: BorneClasse[] = [];

  constructor(private route: ActivatedRoute, private appService: AppService) { }

  ngOnInit(): void {
    console.log(this.stationData);
  }

  resetInkLevel(borne: BorneClasse) {
    this.appService.resetInkLevelForBorne(borne);
  }

  resetPaperLevel(borne: BorneClasse) {
    this.appService.resetPaperLevelForBorne(borne);
  }
}