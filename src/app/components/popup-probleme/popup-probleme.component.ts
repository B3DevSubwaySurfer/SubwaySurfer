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
    this.appService.getStations().then(stations => {
      const randomIndex = Math.floor(Math.random() * stations.length);
      this.randomStationName = stations[randomIndex].name;
  
      // Define a list of possible problems
      const problems = ['d\'inondations', 'd\'incendie', 'd\'electricités', 'fraudes'];
      const randomProblemIndex = Math.floor(Math.random() * problems.length);
      this.randomProblem = problems[randomProblemIndex]; // Select a random problem
    });
  }
}