import { Component, Output, EventEmitter } from '@angular/core';
import { AppService } from "../../../services/app.service";
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-popup-probleme',
  templateUrl: './popup-probleme.component.html',
  styleUrls: ['./popup-probleme.component.css']
})
export class PopupProblemeComponent {
  @Output() closePopup = new EventEmitter();
  randomStationName: string = '';
  randomProblem: string = '';

  constructor(private appService: AppService, private notificationService: NotificationService) { } // Inject NotificationService here

  close() {
    this.closePopup.emit();
  }

  ngOnInit() {
    this.appService.getStations().then(stations => {
      const randomIndex = Math.floor(Math.random() * stations.length);
      this.randomStationName = stations[randomIndex].name;
  
      const problems = ['d\'inondations', 'd\'incendie', 'd\'electricités', 'fraudes'];
      const randomProblemIndex = Math.floor(Math.random() * problems.length);
      this.randomProblem = problems[randomProblemIndex];
  
      // Add the notification to the notification service
      const notification = `Il y a un problème ${this.randomProblem} à la station ${this.randomStationName}, veuillez assigner un agent.`;
      this.notificationService.addNotification(notification);
    });
  }
}