import { Component, Output, EventEmitter } from '@angular/core';
import { AppService } from "../../../services/app.service";

@Component({
  selector: 'app-popup-probleme',
  templateUrl: './popup-probleme.component.html',
  styleUrls: ['./popup-probleme.component.css']
})
export class PopupProblemeComponent {
  @Output() closePopup = new EventEmitter();
  randomStationName: string = '';
  randomProblem: string = ''; // Declare the property here

  constructor(private appService: AppService) { }

  close() {
    this.closePopup.emit();
  }

  ngOnInit() {
    const stations = this.appService.getAllStations();
    const stationNames = stations.map(station => station.name);
    const randomIndex = Math.floor(Math.random() * stationNames.length);
    this.randomStationName = stationNames[randomIndex];

    // Define a list of possible problems
    const problems = ['d\'inondations', 'd\'incendie', 'd\'electricités', 'fraudes'];
    const randomProblemIndex = Math.floor(Math.random() * problems.length);
    this.randomProblem = problems[randomProblemIndex]; // Select a random problem
  }
}