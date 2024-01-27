import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppService } from "../../../services/app.service";

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {
  @Input() selectedAgent: any;
  @Output() agentAssigned = new EventEmitter<{ stationId: number, agent: any }>();
  @Output() closePopupEvent = new EventEmitter<void>();
  stations: any[] = [];
  selectedStation: any;
  isPopupVisible = true;
  errorMessage: string = '';
  interventionTime: number = 0;
  isAgentAssigned: boolean = false;

  constructor(private appService: AppService) { }

  closePopup() {
    this.closePopupEvent.emit();
  }

  ngOnInit(): void {
    this.appService.getStations().then(stations => {
      this.stations = stations;
    });
  }

  assignAgent() {
    if (this.selectedStation) {
      this.selectedStation.agent = this.selectedAgent;
    }
  }

  updateSelectedStation(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedStation = this.stations[selectElement.selectedIndex];
  }

  assignStation() {
    if (this.selectedAgent && this.selectedAgent.status === 'Disponible') {
      this.selectedStation.agent = this.selectedAgent;
      this.selectedAgent.status = 'Occupé';
      this.errorMessage = '';

      // Émettez l'événement ici, après avoir assigné l'agent à la station
      this.agentAssigned.emit(this.selectedStation);

      // Définir un délai aléatoire entre 1 et 5 minutes
      this.selectedAgent.interventionTime = Math.floor(Math.random() * 5 * 60) + 1;

      // Mettre en place un timer pour remettre l'agent à l'état disponible
      // seulement si l'agent n'a pas déjà un intervalle en cours
      if (!this.selectedAgent.intervalId) {
        this.selectedAgent.intervalId = setInterval(() => {
          this.selectedAgent.interventionTime--;
          if (this.selectedAgent.interventionTime === 0) {
            clearInterval(this.selectedAgent.intervalId);
            this.selectedAgent.status = 'Disponible';
            this.selectedStation.agent = null; // Réinitialiser l'agent de la station
            this.selectedAgent.intervalId = null; // Réinitialiser l'ID de l'intervalle de l'agent
          }
        }, 1000);
      }
    } else {
      this.errorMessage = "L'agent est déjà assigné à une autre station";
    }
  }
}