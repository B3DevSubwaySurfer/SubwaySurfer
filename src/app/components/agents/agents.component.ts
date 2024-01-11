import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppService } from "../../../services/app.service";

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {
  @Input() selectedAgent: any;
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
    this.stations = this.appService.getAllStations();
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
  
      // Définir un délai aléatoire entre 1 et 5 secondes
      this.interventionTime = Math.floor(Math.random() * 5) + 1;
      this.isAgentAssigned = true;
  
      // Mettre en place un timer pour remettre l'agent à l'état disponible
      const intervalId = setInterval(() => {
        this.interventionTime--;
        if (this.interventionTime === 0) {
          clearInterval(intervalId);
          this.selectedAgent.status = 'Disponible';
          this.isAgentAssigned = false;
          this.selectedStation.agent = null; // Réinitialiser l'agent de la station
        }
      }, 1000);
    } else {
      this.errorMessage = "L'agent est déjà assigné à une autre station";
    }
  }
}